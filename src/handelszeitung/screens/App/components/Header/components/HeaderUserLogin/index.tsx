import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRCTrackingSource } from '../../../../../../../shared/helpers/getRCTrackingSource';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import selectLocationState from '../../../../../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import { HOME } from '../../../../../../shared/actions/route';
import IconUser from '../../../SVGIcon/components/User';
import IconUserActive from '../../../SVGIcon/components/UserActive';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { AUTH0_LOGIN_CASE_GENERAL } from '../../../../../../../common/components/Auth0Provider/constants';
import { TYPE_NAVIGATION_MENU_USER } from '../../../Navigation/constants';
import styles from './styles.legacy.css';

const HeaderUserLogin = (): ReactElement => {
  const { isSSR } = useSSRContext();

  const isAuthenticated = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).isAuthenticated,
  );
  const pageMetadata = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => pianoStateSelector(state).pageMetadata,
  );
  const routeVertical = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => selectLocationState(state).vertical,
  );

  const dispatch = useDispatch();
  const toggleNavigation = (type: string) => {
    dispatch(setNavigationVisible(type));
  };

  if (routeVertical === HOME) {
    pageMetadata.section = 'HOME';
  }
  const source = getRCTrackingSource('direct', pageMetadata);

  return (
    <li className={styles.NavItem}>
      {(!isSSR &&
        (isAuthenticated ? (
          <button
            data-testid="header-user-logout"
            className={styles.UserButton}
            onClick={() => toggleNavigation(TYPE_NAVIGATION_MENU_USER)}
          >
            <IconUserActive />
          </button>
        ) : (
          <button
            data-testid="header-user-login"
            className={styles.UserButton}
            onClick={() => Auth0.login(AUTH0_LOGIN_CASE_GENERAL, source)}
            role="link"
            aria-label="login"
          >
            <IconUser />
          </button>
        ))) || (
        <div className={styles.UserButton}>
          <IconUser />
        </div>
      )}
    </li>
  );
};

export default HeaderUserLogin;
