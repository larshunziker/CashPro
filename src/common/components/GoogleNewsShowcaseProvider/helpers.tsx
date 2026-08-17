import { setPianoAccesGranted } from '../../../shared/actions/piano';
import { Auth0 } from '../Auth0Provider';
import { UserState } from './typings';

export const handleLoginPromise = (userState: UserState) =>
  new Promise((resolve) => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global?.GaaMetering?.getLoginPromise?.().then(async () => {
      const authorizationUrl = await Promise.resolve(
        Auth0?.getLoginUrl?.('general'),
      );

      // Redirect to a login page for existing users to login.
      if (authorizationUrl) {
        global?.location?.assign?.(authorizationUrl);
      }

      resolve(userState);
    });
  });

export const handleRegisterUserPromise = (userState: UserState) =>
  new Promise((resolve) => {
    resolve(userState);
  });

export const handleUnlockArticle = (dispatch: Function) => {
  dispatch(setPianoAccesGranted(true));
};

export const handleShowPaywall = (dispatch: Function) => {
  dispatch(setPianoAccesGranted(false));
};

export const publisherEntitlementPromise = (userState: UserState) =>
  new Promise((resolve) => {
    resolve(userState);
  });

export const handleSimulateShowcase = () => {
  // comment in if you want to see the debug loga from Google with the #swg.debug=1 hash
  const url = `${global?.location?.href}#swg.debug=1`;
  // const url = `${global.location.href}`;
  const enrichedUrl = `https://play.google.com/newsstand/api/v3/articleaccess?testurl=${url}`;
  const encodedURL = encodeURIComponent(enrichedUrl);
  const redirectURL = `https://www.google.com/url?sa=j&url=${encodedURL}`;
  global.location.href = redirectURL;
};

export const initGoogleNewsShowcase = async (
  dispatch: Function,
  isAuthenticated: boolean,
  hasSubscriptions: boolean,
  registrationTimestamp: number | null,
  userId: string | null,
  subscriptionTimestamp: number | null,
  initialAuthRequest: boolean,
) => {
  let userState: UserState = { granted: false };

  // gerenate userState depending on user's authentication and subscription status
  if (isAuthenticated) {
    userState = {
      id: userId,
      registrationTimestamp,
      granted: hasSubscriptions,
    };

    if (hasSubscriptions) {
      userState = {
        ...userState,
        subscriptionTimestamp,
        grantReason: 'SUBSCRIBER',
      };
    }
  }

  if (Object.keys(userState).length && initialAuthRequest) {
    const authorizationUrl = await Auth0.getLoginUrl('google_login');

    const origin = global?.location?.hostname;

    //@ts-ignore
    global?.GaaMetering?.init({
      authorizationUrl: authorizationUrl,
      userState: userState,
      allowedReferrers: [origin],
      handleLoginPromise: handleLoginPromise(userState),
      registerUserPromise: handleRegisterUserPromise(userState),
      publisherEntitlementPromise: publisherEntitlementPromise(userState),
      unlockArticle: () => handleUnlockArticle(dispatch),
      showPaywall: () => handleShowPaywall(dispatch),
      shouldInitializeSwG: false,
    });
  }
};
