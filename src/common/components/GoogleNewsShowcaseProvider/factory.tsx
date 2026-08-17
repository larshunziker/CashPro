import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSimulateShowcase, initGoogleNewsShowcase } from './helpers';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { GoogleNewsShowcaseFactoryProps } from './typings';

const googleNewsShowcaseProviderFactory = ({
  Helmet,
}: GoogleNewsShowcaseFactoryProps) => {
  const GoogleNewsShowcaseProvider = () => {
    const dispatch = useDispatch();
    const screenReady = useSelector(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      (state) => locationStateSelector(state).screenReady,
    );
    const isAuthenticated = useSelector<ReduxState, boolean>(
      (state) => authStateSelector(state).isAuthenticated,
    );

    const hasSubscriptions = useSelector<ReduxState, boolean>(
      ({ auth }) => auth.hasSubscriptions || false,
    );

    const registrationTimestamp = useSelector<ReduxState, number | null>(
      ({ auth }) => auth.registrationTimestamp || null,
    );

    const subscriptionTimestamp = useSelector<ReduxState, number | null>(
      ({ auth }) => auth.subscriptionTimestamp || null,
    );

    const userId = useSelector<ReduxState, string | null>(
      ({ auth }) => auth.userId || null,
    );

    const initialAuthRequest = useSelector<ReduxState, boolean>(
      ({ auth }) => auth.initialAuthRequest,
    );

    // Check if User comes directly from Google Show Case
    // TODO: further check if it's a valid Google News Showcase URL with the gaa params
    // description here: https://developers.google.com/news/subscribe/extended-access/reference/google-article-access-parameters#validating-the-gaa_sig-parameter
    const url =
      (global?.location?.href && new URL(global?.location?.href)) || null;
    const hasGAAParam = url && url.searchParams.get('gaa_sig') !== null;
    const isFromGoogleNewsShowCase = hasGAAParam;

    useEffect(() => {
      const isRaschDebugActive =
        document.cookie && document.cookie.indexOf('RASCHDEBUG') > -1;
      // helpful event listener for testing
      // (simulates visit from showcase and ads the needed gaa params to the url)
      if (isRaschDebugActive) {
        window.addEventListener(
          'simulate-showcase',
          handleSimulateShowcase,
          true,
        );
      }

      if (screenReady && isFromGoogleNewsShowCase) {
        setTimeout(() => {
          initGoogleNewsShowcase(
            dispatch,
            isAuthenticated,
            hasSubscriptions,
            registrationTimestamp,
            userId,
            subscriptionTimestamp,
            initialAuthRequest,
          );
        }, 200);
      }

      return () => {
        window.removeEventListener(
          'simulate-showcase',
          handleSimulateShowcase,
          true,
        );
      };
    }, [
      isFromGoogleNewsShowCase,
      isAuthenticated,
      hasSubscriptions,
      registrationTimestamp,
      userId,
      subscriptionTimestamp,
      initialAuthRequest,
      screenReady,
      dispatch,
    ]);

    return (
      <Helmet
        script={[
          {
            src: 'https://news.google.com/swg/js/v1/swg.js',
            async: true,
            'subscriptions-control': 'manual',
          },
          {
            src: 'https://news.google.com/swg/js/v1/swg-gaa.js',
            async: true,
          },
          {
            src: 'https://accounts.google.com/gsi/client',
            async: true,
            defer: true,
          },
        ]}
      />
    );
  };
  return GoogleNewsShowcaseProvider;
};

export default googleNewsShowcaseProviderFactory;
