import React, { ComponentType, useEffect } from 'react';
import { Auth0 } from '../../components/Auth0Provider';
import styles from './styles.legacy.css';
import { LogoutProps } from './typings';

const Logout: ComponentType<LogoutProps> = () => {
  useEffect(() => {
    const isLogoutAvailable = __APP_NAME__ !== 'gaultmillau';

    if (isLogoutAvailable) {
      const queryParams: Record<string, any> = {};
      if (window.location.search) {
        window.location.search
          .substr(1)
          .split('&')
          .forEach((item) => {
            const s = item.split('=');
            queryParams[s[0]] = s[1];
          });
      }

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

      const url = `${Auth0.getAuthServiceUrl()}/endsession?client_id=${__AUTH0_CLIENT_ID__}&returnTo=${__AUTH_SERVICE_URL__}/logout?redirectUri=${composeRedirectUri(
        queryParams.return_url || '/',
      )}`;
      window.location.assign(`${url}`);
    } else {
      window.location.href = '/';
    }
  });

  return (
    <div className={styles.Container}>
      <div className={styles.LoadingAnimationWrapper}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Logout;
