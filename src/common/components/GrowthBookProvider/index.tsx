import React, { ReactNode, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GrowthBook } from '@growthbook/growthbook';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import { growthBookUtils } from '../../../shared/helpers/growthBookUtils';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import pianoStateSelector from '../../../shared/selectors/pianoStateSelector';

type GrowthBookProviderWrapperProps = {
  children: ReactNode;
  growthbook: GrowthBook;
};

const GrowthBookProviderWrapper = ({
  children,
  growthbook,
}: GrowthBookProviderWrapperProps) => {
  const hasSubscriptions = useSelector(
    (state) =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      authStateSelector(state).hasSubscriptions ||
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      pianoStateSelector(state).isAccessGranted,
  );

  const isAuthenticated = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).isAuthenticated,
  );

  const navigate = useNavigate();
  const handler = useCallback(
    (url: string) => {
      const origin = window.location.protocol + '//' + window.location.host;
      if (url.startsWith(origin)) {
        const relativeUrl = url.replace(origin, '');
        navigate(relativeUrl, { replace: true });
        return;
      }
      window.location.replace(url);
    },
    [navigate],
  );
  useEffect(() => {
    growthBookUtils.setNavigateHandler(handler);
  }, [handler]);

  growthbook?.updateAttributes({
    loggedIn: isAuthenticated,
    userStatus: hasSubscriptions
      ? 'subscribed'
      : isAuthenticated
        ? 'notSubscribed'
        : 'anonymous',
  });
  return (
    /*@ts-ignore*/
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
};

export default GrowthBookProviderWrapper;
