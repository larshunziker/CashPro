import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import raf from 'raf';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import AppNexus from '../AppNexus';
import LoadingSpinner from '../LoadingSpinner';
import { useStableNavigate } from '../../../../../shared/hooks/useStableNavigateContext';
import { TOP_AD_1 } from '../AppNexus/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const blackListParams = [
  'login_case',
  'ext_tracking_consent',
  'gacid',
  'ga_sid',
  'ga_value',
];

/* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
const removeBlackListedParams = (url) => {
  const [path, search] = url.split('?');
  const searchParams = new URLSearchParams(search);
  blackListParams.forEach((param) => {
    searchParams.delete(param);
  });

  const cleanedSearch = searchParams.toString();
  return cleanedSearch ? `${path}?${cleanedSearch}` : path;
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'loginPageProps' implicitly has an 'any' type. */
const redirectToLogin = ({ navigate, location, loginPageProps }) => {
  const cleanedPrevLocation = removeBlackListedParams(location.href);
  raf(() => {
    navigate('/login', {
      ...location,
      replace: true,
      redirect: true,
      key: 'login',
      pathname: '/login',
      href: '/login',
      state: {
        key: 'login',
        prevLocation: cleanedPrevLocation,
        loginPageProps,
      },
    });
  });
  return null;
};
/* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'loginPageProps' implicitly has an 'any' type. */
const ProtectedRoute = ({ location, children, loginPageProps }) => {
  const navigate = useStableNavigate();
  const isAuthenticated = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).isAuthenticated,
  );
  const initialAuthRequest = useSelector(
    /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
    (state) => authStateSelector(state).initialAuthRequest,
  );

  const redirectToLoginCallback = useCallback(() => {
    redirectToLogin({
      navigate,
      location,
      loginPageProps,
    });
  }, [location, loginPageProps, navigate]);

  if (isAuthenticated) {
    return children ? children : <Outlet />;
  } else if (!isAuthenticated && initialAuthRequest) {
    redirectToLoginCallback();
  }

  return (
    <>
      {(isAuthenticated && children) || (
        <>
          <div className="ad-wrapper ad-wrapper-mobile header-apn-zone">
            <AppNexus slot={TOP_AD_1} deviceType="mobile" />
          </div>
          <div className={grid.Container}>
            <div className={styles.Wrapper}>
              <LoadingSpinner />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
