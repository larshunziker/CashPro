import React, { ReactElement } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { setNavigationVisible } from '../../../../../../shared/actions/navigation';
import Link from '../../../../../../../common/components/Link';
import ButtonWithLoading from '../../../ButtonWithLoading';
import Icon from '../../../Icon';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { MenuHeaderLogo } from '../NavigationUserMenu/components/NavigationUserMenuModal';
import {
  EBANKING_LOGIN_LINK,
  ROUTE_CONTACT,
  ROUTE_EBANKING_VIDEO_TUTORIALS,
  ROUTE_FAQ,
} from '../../../../constants';
import styles from './styles.legacy.css';

const appCloseMenuMessage = 'Menü schliessen';

const handleLogIn = (location: RaschRouterLocation) => {
  Auth0.login('general', '', location.state?.prevLocation || '/');
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'isHybridApp' implicitly has an 'any' type. */
const NavigationLoginMenu = ({ isHybridApp }): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation() as RaschRouterLocation;

  const closeNavigation = (): void => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'NavigationMenuType'. */
    dispatch(setNavigationVisible(null));
  };

  return (
    <div className={styles.Wrapper}>
      {!isHybridApp && (
        <div className={styles.MenuHeaderContent}>
          <MenuHeaderLogo closeNavigation={closeNavigation} />
          <button
            onClick={closeNavigation}
            className={styles.CloseButton}
            aria-label={appCloseMenuMessage}
          >
            <Icon type="IconXMark" addClass={styles.CloseIcon} />
          </button>
        </div>
      )}
      <div className={classNames(styles.MenuBodyWrapper, styles.Center)}>
        <div>
          <div className={styles.LoginBox}>
            <div className={styles.Title}>cash - banking by bank zweiplus</div>
            <div
              className={classNames(styles.ButtonWrapper, styles.BankingButton)}
            >
              <Link path={EBANKING_LOGIN_LINK}>
                <ButtonWithLoading
                  aria-label="E-Banking Login"
                  variant="primary"
                  size="big"
                  mobileFullWidth
                  highAttention
                >
                  E-Banking Login
                </ButtonWithLoading>
              </Link>
            </div>
            <div>Sie haben Fragen? Wir helfen gerne.</div>
            <div>
              <ul className={styles.List}>
                <li>
                  <Link onClick={closeNavigation} path={ROUTE_FAQ}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeNavigation}
                    path={ROUTE_EBANKING_VIDEO_TUTORIALS}
                  >
                    Online-Banking Erklärvideos
                  </Link>
                </li>
                <li>
                  <Link onClick={closeNavigation} path={ROUTE_CONTACT}>
                    Beratung und Kontakt
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeNavigation}
                    path="/online-trading?promo_name=depot_button&promo_position=login_overlay"
                  >
                    Depot eröffnen
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeNavigation}
                    path="anlegen/services/ebanking#sicherheit"
                  >
                    Sicherheit im E-Banking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.LoginBox}>
            <div className={styles.Title}>cash Benutzer-Login</div>
            <div className={styles.ButtonWrapper}>
              <ButtonWithLoading
                aria-label="Login / Registrieren"
                variant="primary"
                size="big"
                mobileFullWidth
                onClick={() => handleLogIn(location)}
              >
                <Icon type="IconUser" addClass={styles.IconUser} />
                Login / Registrieren
              </ButtonWithLoading>
            </div>
            <div className={styles.LoginText}>
              Vorteile Ihrer kostenfreien Registrierung:
              <ul className={styles.List}>
                <li>Virtuelles Portfolio & Watchlist</li>
                <li>Kurs-Alerts via E-Mail </li>
                <li>Aktienanalyse von theScreener.com</li>
                <li>Realtime Kurse an der SIX Structured Products Exchange</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isHybridApp: locationStateSelector(state).isHybridApp,
});

export default connect(mapStateToProps)(NavigationLoginMenu);
