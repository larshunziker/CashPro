import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getRCTrackingSource } from '../../../../../shared/helpers/getRCTrackingSource';
import pianoStateSelector from '../../../../../shared/selectors/pianoStateSelector';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import { setScreenReady } from '../../../../shared/actions/route';
import useRaschRouterLocation from '../../../../../shared/hooks/useRaschRouterLocation';
import AppNexus from '../../components/AppNexus';
import ButtonWithLoading from '../../components/ButtonWithLoading';
import Helmet from '../../components/Helmet';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../shared/constants/structuredData';
import { TOP_AD_1 } from '../../components/AppNexus/constants';
import styles from './styles.legacy.css';
import { LoginCase } from '../../../../../common/components/Auth0Provider/typings';

const Login = () => {
  const dispatch = useDispatch();
  const location = useRaschRouterLocation();
  const pageProps = location.state?.loginPageProps;
  const { isSSR } = useSSRContext();
  const pageMetadata = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => pianoStateSelector(state).pageMetadata,
  );
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  useEffect(() => {
    dispatch(setScreenReady(true, { pathname: location.pathname }));
  }, [dispatch, location.pathname]);

  const redirectToLoginScreen = useCallback(() => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'RegistrationCase | undefined'. */
    const source = getRCTrackingSource(null, pageMetadata);
    const loginCase: LoginCase = 'general';
    Auth0.login(loginCase, source, location.state?.prevLocation || '/');
  }, [pageMetadata, location.state?.prevLocation]);

  if (isSSR) {
    return null;
  }

  if (!pageProps) {
    redirectToLoginScreen();
  }

  return (
    <>
      <Helmet
        meta={[
          {
            name: 'robots',
            content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
          },
        ]}
      ></Helmet>
      {(!isHybridApp && (
        <div className="ad-wrapper ad-wrapper-mobile header-apn-zone">
          <AppNexus slot={TOP_AD_1} deviceType="mobile" />
        </div>
      )) ||
        null}
      <div
        className={classNames(styles.Wrapper, {
          [styles.IsHybridApp]: isHybridApp,
        })}
      >
        {!isHybridApp && (
          <h2 className={styles.Heading}>
            {pageProps?.title || 'Login/Registrieren'}
          </h2>
        )}
        <div className={styles.InnerWrapper}>
          {pageProps?.image && (
            <div className={styles.ImageWrapper}>
              <img src={pageProps.image} alt={JSON.stringify(pageProps)} />
            </div>
          )}
          <div>
            <p className={styles.SubHeading}>
              {pageProps.loginTitle ||
                'Jetzt kostenlos registrieren und sofort profitieren.'}
            </p>

            <p className={styles.Description}>
              {pageProps?.description ||
                'Bitte melden Sie sich an, um diese Funktion zu nutzen.'}
            </p>

            <div className={styles.ButtonsWrapper}>
              <ButtonWithLoading onClick={redirectToLoginScreen}>
                Login
              </ButtonWithLoading>
              <ButtonWithLoading
                onClick={redirectToLoginScreen}
                variant="secondary"
              >
                Registrieren
              </ButtonWithLoading>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
