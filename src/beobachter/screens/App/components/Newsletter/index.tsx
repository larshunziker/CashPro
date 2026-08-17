import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRCTrackingSource } from '../../../../../shared/helpers/getRCTrackingSource';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import pianoStateSelector from '../../../../../shared/selectors/pianoStateSelector';
import LoadingSpinner from '../LoadingSpinner';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { AUTH0_LOGIN_CASE_GENERAL } from '../../../../../common/components/Auth0Provider/constants';
import {
  NEWSLETTER_LOGIN_IFRAME,
  NEWSLETTER_LOGOUT_IFRAME,
} from '../../constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const newsletterLoggedIframe = (email: string, hash: string) => {
  return (
    <iframe
      title={'Newsletter'}
      src={`${NEWSLETTER_LOGIN_IFRAME}?email=${email}&hash=${hash}`}
      className={styles.Iframe}
      width={'100%'}
      loading="eager"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      scrolling="no"
    ></iframe>
  );
};

const newsletterLogoutIframe = () => {
  return (
    <iframe
      title={'Newsletter'}
      src={NEWSLETTER_LOGOUT_IFRAME}
      className={styles.Iframe}
      width={'100%'}
      loading="eager"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      scrolling="no"
      id="logoutIframe"
    ></iframe>
  );
};

export const Newsletter = () => {
  const pageMetadata = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => pianoStateSelector(state).pageMetadata,
  );
  const source = getRCTrackingSource('direct', pageMetadata);

  const { email, isAuthenticated, initialAuthRequest } = useSelector(
    (state: Record<string, any>) => authStateSelector(state),
  );

  const [iframeHeight, setIframeHeight] = useState('');

  useEffect(() => {
    const parseEventData = (event: MessageEvent) => {
      try {
        return typeof event.data === 'string'
          ? JSON.parse(event.data)
          : event.data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse event data:', error, event.data);
        return null;
      }
    };

    //listen on postMessage event to set the height of the iframe
    const handlePostMessage = (event: MessageEvent) => {
      const data = parseEventData(event);
      if (!data) return;

      if (data.type === 'iframeHeight' && data.height) {
        setIframeHeight(`${data.height}px`);
      }
    };

    //listen on postMessage event to scroll to the top of the iframe
    const handleScrollToTop = (event: MessageEvent) => {
      const data = parseEventData(event);
      if (!data) return;

      if (data.type === 'iframeScrollToTop') {
        const iframeElement = document.getElementById('logoutIframe');
        if (!iframeElement) return;

        const iframeRect = iframeElement.getBoundingClientRect();
        const finalScrollTop = window.scrollY + iframeRect.top - 120;

        window.scrollTo({
          top: finalScrollTop,
          behavior: 'smooth',
        });
      }
    };

    //listen on postMessage event to login
    const handleLoginPostMessage = (event: MessageEvent) => {
      if (event.data.type === 'iframeLoginButton') {
        Auth0.login(AUTH0_LOGIN_CASE_GENERAL, source);
      }
    };

    window.addEventListener('message', handlePostMessage);
    window.addEventListener('message', handleScrollToTop);
    window.addEventListener('message', handleLoginPostMessage);

    return () => {
      window.removeEventListener('message', handlePostMessage);
      window.removeEventListener('message', handleScrollToTop);
      window.removeEventListener('message', handleLoginPostMessage);
    };
  }, [source]);

  return (
    (!initialAuthRequest && (
      <div className={grid.Container}>
        <LoadingSpinner />
      </div>
    )) ||
    (isAuthenticated && email && (
      <div className={styles.IframeContainer} style={{ height: iframeHeight }}>
        {newsletterLoggedIframe(email, Auth0.getSailthruMd5())}
      </div>
    )) || (
      <div className={styles.IframeContainer} style={{ height: iframeHeight }}>
        {newsletterLogoutIframe()}
      </div>
    )
  );
};
