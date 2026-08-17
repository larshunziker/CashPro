/**
 * @file   authorize screen
 * @desc   this is a standalone file which is used on the authorize/index.html
 *         file and handles forwarding to the Ringier connect login providing
 *         marketeers an easier access to login.
 *         file is used for all publications.
 */

// prettier-ignore
// eslint-disable-next-line
'use strict';

import { auth0Config } from '../../components/Auth0Provider/config';

// set color
const containerEl = document.getElementsByClassName('container');
if (containerEl && containerEl[0]) {
  containerEl[0].classList.add(__APP_NAME__);
}

const isAuthorizationAvailable = __APP_NAME__ !== 'gaultmillau';

if (isAuthorizationAvailable) {
  const queryParams = new URLSearchParams(window.location.search);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'redirectUrl' implicitly has an 'any' type. */
  const composeRedirectUri = (redirectUrl) => {
    if (
      redirectUrl.indexOf('http://') === 0 ||
      redirectUrl.indexOf('https://') === 0
    ) {
      return redirectUrl;
    }

    return window.location.origin + redirectUrl;
  };

  const getConsent = () => {
    const expectedConsent = ['C0001', 'C0002', 'C0003', 'C0005'];
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    const activeGroups = __CLIENT__ && global.OnetrustActiveGroups;

    return expectedConsent.every((consent) => activeGroups?.includes(consent));
  };

  const getLang = () => {
    return 'de';
  };

  const forwardToRingierConnect = async () => {
    const loginCase = queryParams.get('login_case') || 'general';

    const appStateAsString = JSON.stringify({
      redirectUri: composeRedirectUri(queryParams.get('return_url') || '/'),
      loginCase: loginCase,
      issuer: 'ONELOG',
    });

    const loginOptions = {
      redirect_uri: `${auth0Config.redirect_uri}`.replace('master.', 'www.'),
      appState: appStateAsString,
      login_case: loginCase,
      lang: queryParams.get('lang') || getLang(),
      source: queryParams.get('source') || '',
      ext_tracking_consent:
        queryParams.get('ext_tracking_consent') || getConsent().toString(),
      email_force: queryParams.get('email_force') || '',
      email_hint: queryParams.get('email_hint') || '',
    };

    const authorizeUrl = `${__AUTH_SERVICE_URL__}/authorize`;
    let redirectUri = __AUTH_SERVICE_URL__;
    if (redirectUri.startsWith('/')) {
      redirectUri = global.location.origin + redirectUri;
    }

    const auth0QueryParams = new URLSearchParams({
      client_id: __AUTH0_CLIENT_ID__,
      response_type: auth0Config.response_type,
      redirect_uri: `${redirectUri}/login/`.replace('master.', 'www.'),
      scope: auth0Config.scope,
      audience: auth0Config.audience,
      state: loginOptions.appState,
      login_case: loginOptions.login_case,
      lang: loginOptions.lang,
      ext_tracking_consent: loginOptions.ext_tracking_consent,
    });

    loginOptions.source &&
      auth0QueryParams.append('source', loginOptions.source);
    loginOptions.email_force &&
      auth0QueryParams.append('email_force', loginOptions.email_force);
    loginOptions.email_hint &&
      auth0QueryParams.append('email_hint', loginOptions.email_hint);

    window.location.assign(`${authorizeUrl}?${auth0QueryParams.toString()}`);
  };

  forwardToRingierConnect();
} else {
  window.location.href = '/';
}
