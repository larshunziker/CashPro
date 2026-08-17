import { Component } from 'react';
import { connect } from 'react-redux';
import { EMAIL_ALERT_ANCHOR_ID } from '../AlertList/factory';
import {
  getServiceUrl,
  isLocalRunningAppConnectedToProdService,
  isPrInstance,
} from '../../../shared/helpers/serviceUrl';
import storageAvailable from '../../../shared/helpers/storage';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { getCookieByName, log } from '../../../shared/helpers/utils';
import { setAuthData } from '../../../shared/actions/auth';
import { setPianoUserMetadata } from '../../../shared/actions/piano';
import { auth0Config } from './config';
import { AD_FREE_SUBSCRIPTION_KEY } from '../../../shared/constants/ads';
import { COMMENTS_ANCHOR_ID } from '../../../shared/constants/comments';
import {
  AUTH0_APP_METADATA,
  AUTH0_LOCAL_STORAGE_ACCESS_TOKEN,
  AUTH0_LOCAL_STORAGE_ID_TOKEN,
  AUTH0_LOCAL_STORAGE_NONCE,
  AUTH0_LOCAL_STORAGE_STATE,
  AUTH0_USER_ID,
  AUTH0_USER_METADATA,
  RC_EMAIL,
  RC_SUB,
  USER_INFO_REFRESH_INTERVAL,
} from './constants';
import { AuthorizeOptions, LoginCase } from './typings';

type Auth0PropsInner = {
  setPianoUserMetadata: any;
  setAuthData: any;
};

/**
 * Ensure that all old localStorage items are removed.
 * In an older implementation of the Auth0Provider we stored critical data e.g. access tokens in LS
 * We need to make sure this data is removed on every device.
 */
export const removeLocalStorageData = () => {
  if (storageAvailable('localStorage')) {
    localStorage.removeItem(AUTH0_LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(AUTH0_LOCAL_STORAGE_ID_TOKEN);
    localStorage.removeItem(AUTH0_LOCAL_STORAGE_NONCE);
    localStorage.removeItem(AUTH0_LOCAL_STORAGE_STATE);
    localStorage.removeItem(AUTH0_USER_ID);
    log(
      'AUTH0',
      `removed:
      ${AUTH0_LOCAL_STORAGE_ACCESS_TOKEN},
      ${AUTH0_LOCAL_STORAGE_ID_TOKEN},
      ${AUTH0_LOCAL_STORAGE_NONCE},
      ${AUTH0_LOCAL_STORAGE_STATE},
      ${AUTH0_USER_ID}
      items from localStorage
      `,
      'green',
    );
  }
};

export class Auth0 extends Component<Auth0PropsInner> {
  user: any;
  static _hasUsername = false;
  static _isAuthenticated = false;
  static _userId = '';
  static _email = '';
  static tokenRenewalTimeout: NodeJS.Timeout;
  static _externalSubscription: Record<string, any>[] = [];
  static _id_token = '';
  static _sailthru_md5 = '';
  // Absolute timestamp (ms) at which the current identity token should be
  // considered stale. Derived from the userinfo response (`refresh_in`/`exp`)
  // when the renewal is scheduled, so validity checks reuse the same source of
  // truth instead of decoding the JWT.
  static _tokenExpiresAt = 0;

  /**
   * Resolves once the initial authentication attempt (userinfo fetch) has
   * settled, regardless of outcome. Used as a fallback for auth-dependent
   * requests that fire before the provider has mounted, so they are not sent
   * during the pre-auth window with an empty identity token.
   */
  static _authReadySettled = false;
  static _authReadyResolve: () => void = () => {};
  static _authReady: Promise<void> = new Promise((resolve) => {
    Auth0._authReadyResolve = resolve;
  });

  // Reference to the mounted provider so renewals can be triggered on demand
  // (e.g. from the Apollo link or on tab reactivation).
  static _instance: Auth0 | null = null;
  // Dedupes concurrent renewals so multiple auth-dependent requests trigger at
  // most one in-flight userinfo call.
  static _loginInFlight: Promise<void> | null = null;

  static markAuthReady() {
    if (!Auth0._authReadySettled) {
      Auth0._authReadySettled = true;
      Auth0._authReadyResolve();
    }
  }

  static authReady(): Promise<void> {
    return Auth0._authReady;
  }

  /**
   * True when a non-expired identity token is available. Expiry comes from the
   * userinfo response (`refresh_in`/`exp`, see `_handleLogin`). The skew buffer
   * MUST stay below the renewal delay floor (5s) so a freshly renewed token is
   * immediately valid; otherwise on-demand renewals could loop.
   */
  static hasValidToken(): boolean {
    if (!Auth0._id_token) {
      return false;
    }
    const skewMs = 2_000;
    return Date.now() < Auth0._tokenExpiresAt - skewMs;
  }

  /**
   * Triggers a token renewal (deduped). Falls back to the initial auth-ready
   * promise if the provider has not mounted yet, so callers never hang.
   */
  static renewToken(): Promise<void> {
    if (Auth0._loginInFlight) {
      return Auth0._loginInFlight;
    }
    if (!Auth0._instance) {
      return Auth0.authReady();
    }
    const inFlight = Auth0._instance
      ._handleLogin()
      .catch(() => {})
      .finally(() => {
        if (Auth0._loginInFlight === inFlight) {
          Auth0._loginInFlight = null;
        }
      });
    Auth0._loginInFlight = inFlight;
    return inFlight;
  }

  /**
   * Ensures a non-expired token is available before an auth-dependent request
   * is sent. Resolves immediately when the current token is still valid,
   * otherwise renews on demand. This closes the window where a tab reactivated
   * after a long background period would send an already-expired token.
   */
  static ensureFreshToken(): Promise<void> {
    if (Auth0.hasValidToken()) {
      return Promise.resolve();
    }
    // Before the initial auth attempt settles we don't yet know if there is a
    // session; wait for it (covers logged-in users whose token has not been
    // fetched yet on page load).
    if (!Auth0._authReadySettled) {
      return Auth0.authReady();
    }
    // After the initial attempt, only renew for authenticated users. Logged-out
    // users have no token by design; avoid pointless userinfo requests.
    if (!Auth0._isAuthenticated) {
      return Promise.resolve();
    }
    return Auth0.renewToken();
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
  static onInvite: (data) => void;

  /**
   * RIAD definitions can be found here: https://jira.ringieraxelspringer.ch/browse/RDP-1676
   *
   * case 1: user is not logged in but he was once logged in with a userid so we provide the userid from the localstorage
   *  value=1
   * case 2: user is logged in with auth0 so we provide the userid (sub) from auth0
   *  value=2
   * case 3: user is not logged in and he was never logged
   *  value=0
   *
   * same function is copied and used also in init-thirdparty files
   */
  getOlid = () => {
    const inactiveUserSub =
      storageAvailable('localStorage') && global.localStorage.getItem(RC_SUB);

    if (
      this.user?.sub ||
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global?.__INITIAL_ADS_CONFIG__?.config?.[AD_FREE_SUBSCRIPTION_KEY] ===
        false
    ) {
      return '2';
    }

    if (inactiveUserSub) {
      return '1';
    }
    return '0';
  };
  async componentDidMount() {
    try {
      log(
        'AUTH0',
        `componentDidMount auth0Config ${JSON.stringify(auth0Config, null, 2)}`,
        'green',
      );
      Auth0._instance = this;
      Auth0.onInvite = this._handleInvitedUser;
      // Route the initial login through renewToken so it is tracked/deduped.
      await Auth0.renewToken();
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.olid = this.getOlid();
    } catch (error) {
      log(
        'AUTH0',
        `componentDidMount auth0Config/instance ${JSON.stringify(
          error,
          null,
          2,
        )}`,
        'red',
      );
    } finally {
      // Unblock auth-dependent requests once the first login attempt settled.
      Auth0.markAuthReady();
    }
  }

  static getAuthServiceUrl = () =>
    getServiceUrl(__AUTH_SERVICE_URL__).replace('master.', 'www.');

  static async invite(email: string, loginCase: string) {
    log('AUTH0', 'invite', 'green');
    const appState: any = {};

    if (
      isPrInstance() ||
      isLocalRunningAppConnectedToProdService(__AUTH_SERVICE_URL__)
    ) {
      appState.isCookieCrossSiteAccessAllowed = true;
    }
    const appStateAsString = JSON.stringify(appState);
    const searchParams = new URLSearchParams({
      email,
      state: appStateAsString,
      login_case: loginCase,
    });
    const invitationStatus = await fetch(
      `${Auth0.getAuthServiceUrl()}/invite?${searchParams}`,
      {
        credentials: 'include',
      },
    );

    if (!invitationStatus) {
      return null;
    }

    return invitationStatus.json();
  }

  static async login(
    loginCase: LoginCase = 'general',
    source?: string,
    redirectPath = '',
    emailHint?: string,
    shouldReturnURL = false,
  ) {
    if (__SERVER__) {
      return;
    }
    log('AUTH0', 'login', 'green');
    let redirectUri =
      redirectPath || window.location.pathname + window.location.search;
    const hash = window.location.hash;

    // append existing hash to redirect to clicked e-mail alert
    if (hash.indexOf(EMAIL_ALERT_ANCHOR_ID)) {
      redirectUri = `${redirectUri}${hash}`;
    }

    if (loginCase === 'commenting') {
      // remove existing anchor to avoid duplicate anchors
      const anchorPosition = redirectUri.indexOf('#');
      if (anchorPosition >= 0) {
        redirectUri = redirectUri.substring(0, anchorPosition);
      }
      redirectUri = `${redirectUri}#${COMMENTS_ANCHOR_ID}`;
    }

    const appState: any = {
      redirectUri: window.location.origin + redirectUri,
      loginCase: loginCase,
      issuer: 'ONELOG',
    };

    if (
      isPrInstance() ||
      isLocalRunningAppConnectedToProdService(__AUTH_SERVICE_URL__)
    ) {
      appState.isCookieCrossSiteAccessAllowed = true;
    }

    const appStateAsString = JSON.stringify(appState);

    const getConsent = () => {
      const expectedConsent = ['C0001', 'C0002', 'C0003', 'C0005'];
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      const activeGroups = __CLIENT__ && global.OnetrustActiveGroups;

      return expectedConsent.every((consent) =>
        activeGroups?.includes(consent),
      );
    };

    const loginOptions: AuthorizeOptions = {
      appState: appStateAsString,
      login_case: loginCase,
      source: source || '',
      ext_tracking_consent: getConsent(),
    };

    const gaClientId = getCookieByName('_ga');
    const gaSidValue = getCookieByName(`_ga_${__GA_SID__}`);

    const authorizeUrl = `${__AUTH_SERVICE_URL__}/authorize`;

    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ email_hint? */
    const searchParams = new URLSearchParams({
      client_id: __AUTH0_CLIENT_ID__,
      response_type: auth0Config.response_type,
      redirect_uri: `${Auth0.getAuthServiceUrl()}/login/`,
      scope: auth0Config.scope,
      audience: auth0Config.audience,
      state: loginOptions.appState,
      login_case: loginOptions.login_case,
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      ext_tracking_consent: loginOptions.ext_tracking_consent.toString(),
      ...((emailHint || Auth0._email) && {
        email_hint: emailHint || Auth0._email,
      }),
      google_login:
        (loginOptions.login_case === 'google_login' && 'true') || 'false',
    });

    if (loginOptions.source) {
      searchParams.append('source', loginOptions.source);
    }

    if (gaClientId) {
      searchParams.append('gacid', gaClientId);
    }

    if (gaSidValue) {
      searchParams.append('ga4_sid', __GA_SID__);
      searchParams.append('ga4_value', gaSidValue);
    }

    log('AUTH0.getLoginUrl', `return ${authorizeUrl}?${searchParams}`, 'green');

    if (__AUTH_LOGIN_OFFLINE_ENABLED__) {
      const fallbackUrl = '/login-offline';
      window.open(fallbackUrl, '_blank') || window.location.assign(fallbackUrl);
      return;
    }

    if (shouldReturnURL) {
      return `${authorizeUrl}?${searchParams}`;
    } else {
      window.location.assign(`${authorizeUrl}?${searchParams}`);
    }
  }

  static async getLoginUrl(
    loginCase: LoginCase = 'general',
    source?: string,
    redirectPath = '',
    emailHint?: string,
  ) {
    return this.login(loginCase, source, redirectPath, emailHint, true);
  }

  static logout() {
    if (!__CLIENT__) {
      return;
    }

    clearTimeout(Auth0.tokenRenewalTimeout);
    Auth0._hasUsername = false;
    Auth0._isAuthenticated = false;
    removeLocalStorageData();

    // Properly encode all query parameters for logout URL
    const clientId = encodeURIComponent(__AUTH0_CLIENT_ID__);
    const redirectUri = encodeURIComponent(window.location.href);
    const returnTo = encodeURIComponent(
      `${Auth0.getAuthServiceUrl()}/logout?redirectUri=${redirectUri}`,
    );
    const url = `${Auth0.getAuthServiceUrl()}/endsession?client_id=${clientId}&returnTo=${returnTo}`;
    window.location.assign(`${url}`);
  }

  static hasUsername() {
    return Auth0._hasUsername;
  }

  static isAuthenticated() {
    return Auth0._isAuthenticated;
  }

  static getUserId() {
    return Auth0._userId;
  }

  static getSailthruMd5() {
    return Auth0._sailthru_md5;
  }

  static getExternalSubscription() {
    return Auth0._externalSubscription;
  }

  static setExternalSubscription(externalSubscription: Record<string, any>[]) {
    Auth0._externalSubscription =
      externalSubscription || Auth0._externalSubscription;
  }

  static getIdToken() {
    return Auth0._id_token || '';
  }

  _sendTealiumEvent = (cms_user_subscriptions = '') => {
    // Registration status is intentionally fixed to full after lean registration removal.
    const userRegistrationStatus = 'full';

    const userIdPayload = {
      event_name: 'set_user_id',
      event_category: 'user_id',
      event_action: 'set user_id',
      event_label: this.user.sub,
      event_non_interaction: '1',
      cms_user_id: this.user.sub,
      cms_user_subscriptions,
      registration_status: userRegistrationStatus,
    };

    tealiumTrackEvent({
      type: 'link',
      payload: userIdPayload,
    });
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
  _handleInvitedUser = (data) => {
    this.user = data;
    this.props.setPianoUserMetadata({
      idToken: data.id_token,
      initialAuthRequest: true,
    });
    this.props.setAuthData({
      email: this.user.email,
      isAuthenticated: !!this.user.email,
      initialAuthRequest: true,
    });
    Auth0._isAuthenticated = true;
    Auth0._email = this.user.email;
    this._sendTealiumEvent();
  };

  _handleLogin = async () => {
    log('AUTH0', '_handleLogin start', 'green');

    try {
      const response = await fetch(
        `${Auth0.getAuthServiceUrl()}/userinfo?origin=client`,
        {
          credentials: 'include',
        },
      );

      const data = await response.json();

      // always update rc:email in localstorage
      if (data?.email_encoded) {
        localStorage.setItem(
          RC_EMAIL,
          JSON.stringify({ oneId: data.email_encoded, source: 'onelog' }),
        );
      }

      if (!data || !data.sub) {
        log('AUTH0', '_handleLogin failed', 'red');
        this._handleLogout();
        if (__VIAFOURA_DATE__) {
          // Make vfQ available or use existing one if already loaded
          global.vfQ = global.vfQ || [];
          global.vfQ.push(async () => {
            // viafoura is loaded and window.vf is available
            await global.vf.session.logout();
          });
        }
        return;
      }
      if (data.identityToken) {
        Auth0._id_token = data.identityToken;
      }
      if (data.sailthru_md5) {
        Auth0._sailthru_md5 = data.sailthru_md5;
      }
      if (data.sub) {
        this.user = data;
        log(
          'AUTH0',
          `_handleLogin user data: ${JSON.stringify(this.user, null, 2)}`,
          'green',
        );

        const externalSubscription = this._getExternalSubscription();

        const metadataSubscriptions = this._getMetadataValue(
          AUTH0_APP_METADATA,
          'subscriptions',
        );
        let subscriptions = [];
        let legalAdviceSubscriptions = [];
        let subscriptionsEndDates = [];

        if (Array.isArray(metadataSubscriptions)) {
          subscriptions = metadataSubscriptions.filter(
            (subscription) => !subscription.magazinId.startsWith('GU'),
          );
          legalAdviceSubscriptions = metadataSubscriptions.filter(
            (subscription) => subscription.magazinId.startsWith('GU'),
          );

          subscriptionsEndDates = metadataSubscriptions.map(
            (subscription) => subscription.subscriptionEndDate,
          );
        }

        const subscriptionGids =
          (Array.isArray(subscriptions) &&
            subscriptions.length > 0 &&
            /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
            (subscriptions as Record<string, any>).map((item) => item.gid)) ||
          [];

        this.props.setPianoUserMetadata({
          idToken: data.identityToken,
          externalSubscription: externalSubscription,
          subscriptions: subscriptionGids,
          initialAuthRequest: true,
        });
        Auth0.setExternalSubscription(externalSubscription);

        const hasSubscriptions =
          Array.isArray(subscriptions) && subscriptions.length > 0;

        const hasLegalAdviceSubscriptions = legalAdviceSubscriptions.length > 0;
        const givenName = this._getMetadataValue(
          AUTH0_USER_METADATA,
          'given_name',
        ) as string;
        const familyName = this._getMetadataValue(
          AUTH0_USER_METADATA,
          'family_name',
        );
        this.props.setAuthData({
          username: this._getMetadataValue(AUTH0_USER_METADATA, 'username'),
          givenName,
          familyName,
          email: this.user.email,
          userId: this.user.sub,
          isAuthenticated: !!this.user.email,
          hasSubscriptions,
          registrationTimestamp: this.user.reg_at,
          subscriptionTimestamp:
            (hasSubscriptions &&
              (subscriptions as Record<string, any>)[0]?.startDate) ||
            null,
          initialAuthRequest: true,
          subscriptions: (hasSubscriptions && subscriptionGids) || null,
          gpNumber: this._getMetadataValue(AUTH0_USER_METADATA, 'gpNumber'),
          address: this._getMetadataValue(AUTH0_USER_METADATA, 'address'),
          birthday: this._getMetadataValue(AUTH0_USER_METADATA, 'birthday'),
          mobileNumber: this._getMetadataValue(
            AUTH0_USER_METADATA,
            'mobileNumber',
          ),
          realtime: this._getMetadataValue(AUTH0_APP_METADATA, 'realtime'),
          hasLegalAdviceAccess: hasLegalAdviceSubscriptions,
          legalAdviceSubscriptions:
            (hasLegalAdviceSubscriptions &&
              (legalAdviceSubscriptions as Record<string, any>).map(
                /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
                (item) => item.magazinId,
              )) ||
            null,
          subscriptionsEndDates: subscriptionsEndDates,
          isChatbotAllowed:
            this._getMetadataValue(AUTH0_APP_METADATA, 'chatbot') || false,
          isAbotAllowed:
            this._getMetadataValue(AUTH0_APP_METADATA, 'abot') || false,
        });

        // #adFree Hide Ad slots if user is logged in (client-side logic for the use case: right after login)
        if (this._getMetadataValue(AUTH0_APP_METADATA, 'adFree')) {
          document.body.insertAdjacentHTML(
            'beforeend',
            '<style>.ad-wrapper{display:none !important}</style>',
          );
        }

        Auth0._hasUsername =
          (this._getMetadataValue(AUTH0_USER_METADATA, 'username') && true) ||
          false;
        Auth0._isAuthenticated = true;

        let cms_user_subscriptions = '';

        if (Array.isArray(subscriptions) && subscriptions.length > 0) {
          subscriptions.forEach((subscription) => {
            if (
              subscription.magazinId &&
              subscription.gid &&
              subscription.source &&
              subscription.source !== 'FALLBACK'
            ) {
              cms_user_subscriptions += `${subscription.magazinId}:${subscription.gid}:${subscription.source};`;
            }
          });
        }

        if (Auth0._userId === '') {
          this._sendTealiumEvent(cms_user_subscriptions);
        }

        Auth0._userId = this.user.sub;
        Auth0._email = this.user.email;

        // Do not remove RC_SUB from localstorage on loggout, it is used by the riad we provide the last usersub so they can identify user also when he is not logged in
        localStorage.setItem(RC_SUB, this.user.sub);
        clearTimeout(Auth0.tokenRenewalTimeout);

        let delay = USER_INFO_REFRESH_INTERVAL;

        if (typeof data.refresh_in === 'number' && data.refresh_in > 0) {
          // Legacy userinfo response: renew based on refresh_in (ms).
          delay = Math.max(data.refresh_in, 5_000);
        } else if (typeof data.exp === 'number' && data.exp > 0) {
          // New userinfo response has no refresh_in; derive the renewal from the
          // token expiry instead (exp is in seconds, hence the * 1000).
          delay = Math.max(data.exp * 1000 - Date.now(), 5_000);
        }

        // Keep the token-validity check in sync with the renewal schedule: the
        // token is considered valid until the next scheduled renewal.
        Auth0._tokenExpiresAt = Date.now() + delay;
        this._scheduleRenewal(delay);

        if (
          __VIAFOURA_DATE__ &&
          data.identityToken &&
          givenName + familyName !== ''
        ) {
          // Make vfQ available or use existing one if already loaded
          global.vfQ = global.vfQ || [];
          global.vfQ.push(async () => {
            await global.vf.session.login.openIdConnect(data.identityToken);
          });
        }
      }
    } catch (error) {
      this._handleLogout();
      log('AUTH0', `_handleLogin ${JSON.stringify(error, null, 2)}`, 'red');
    }
  };

  _handleLogout(): void {
    Auth0._hasUsername = false;
    Auth0._isAuthenticated = false;
    Auth0._userId = '';
    Auth0._email = '';
    Auth0._id_token = '';
    Auth0._sailthru_md5 = '';
    Auth0._tokenExpiresAt = 0;
    localStorage.removeItem(AUTH0_USER_ID);

    this.props.setPianoUserMetadata({
      initialAuthRequest: true,
    });
    this.props.setAuthData({
      username: null,
      givenName: null,
      familyName: null,
      email: null,
      isAuthenticated: false,
      registrationTimestamp: null,
      subscriberTimestamp: null,
      hasSubscriptions: false,
      initialAuthRequest: true,
      subscriptions: null,
      hasLegalAdviceAccess: false,
      legalAdviceSubscriptions: null,
      subscriptionsEndDates: null,
    });
  }

  _scheduleRenewal(delay = 300000) {
    Auth0.tokenRenewalTimeout = setTimeout(() => {
      log('AUTH0', '_scheduleRenewal ran', 'orange');
      Auth0.renewToken();
    }, delay);
  }

  _getMetadataValue(
    metadataType: string,
    key?: string,
  ): { [key: string]: string } | string {
    if (this.user) {
      if (this.user[`https://www.ringieraxelspringer.ch/${metadataType}`]) {
        const metadata: { [key: string]: string } =
          this.user[`https://www.ringieraxelspringer.ch/${metadataType}`];

        if (key && metadata && metadata[key]) {
          return metadata[key];
        } else if (metadata && !key) {
          return metadata;
        }
      }
    }
    return '';
  }

  _getExternalSubscription(): Record<string, any>[] {
    const subscriptions: any = this._getMetadataValue(
      AUTH0_APP_METADATA,
      'subscriptions',
    );

    if (Array.isArray(subscriptions)) {
      const externalSubs: any = subscriptions.filter((subscription) => {
        const isPianoSource = subscription.source === 'PIANO';
        const isMetadataSource = subscription.source === 'METADATA';

        /* @ts-ignore TODO: TS7034 ->  Variable 'pianoAdFreeResources' implicitly has type 'any[]' in some locations where its type cannot be determined. */
        let pianoAdFreeResources = [];

        if (__PIANO_AD_FREE_RESOURCES__) {
          pianoAdFreeResources = __PIANO_AD_FREE_RESOURCES__.split(' ');
        }

        return (
          (!isMetadataSource && !isPianoSource) ||
          /* @ts-ignore TODO: TS7005 ->  Variable 'pianoAdFreeResources' implicitly has an 'any[]' type. */
          (isPianoSource && pianoAdFreeResources.includes(subscription.rid))
        );
      });

      return externalSubs || [];
    }
    return [];
  }

  render() {
    if (!global?.olid) {
      global.olid = this.getOlid();
    }
    return null;
  }
}

// Safety net: never let auth-dependent requests wait indefinitely if the
// provider fails to mount for any reason.
if (__CLIENT__) {
  setTimeout(() => Auth0.markAuthReady(), 8000);
}

const mapDispatchToProps = {
  setPianoUserMetadata,
  setAuthData,
};

export default connect(null, mapDispatchToProps)(Auth0);
