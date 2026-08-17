/**
 * @file   NavigationUserMenu factory
 */

import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import raf from 'raf';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import navigationStateSelector from '../../../shared/selectors/navigationStateSelector';
import { Auth0 } from '../Auth0Provider';
import {
  NavigationUserMenuFactoryOptions,
  NavigationUserMenuProps,
  UserCockpitMenuItem,
} from './typings';

export type NavigationUserMenuPropsInner = NavigationUserMenuProps & {
  navigationVisible: string;
  authState: AuthState;
  isHybridApp: boolean;
};

const NavigationUserMenuFactory = ({
  Icon,
  MenuHeaderLogo,
  MenuItem,
  MenuListHeader,
  closeNavigation: appCloseNavigation,
  links,
  styles,
  appWelcomeMessage = 'Guten Tag',
  appLogoutMessage = 'Abmelden',
  appCloseMenuMessage = 'Menü schliessen',
  closeOnOutsideClick = false,
}: NavigationUserMenuFactoryOptions) => {
  const NavigationUserMenu = (props: NavigationUserMenuPropsInner) => {
    const {
      authState,
      navigationVisible,
      isHybridApp,
    }: NavigationUserMenuPropsInner = props;

    const wrapperRef = useRef<HTMLDivElement>(null);

    const closeNavigation =
      typeof appCloseNavigation === 'function' && appCloseNavigation(props);

    const closeMenuHandler = useCallback(
      (event: KeyboardEvent): void => {
        if (!navigationVisible) {
          return;
        }

        if (event?.keyCode === 27) {
          /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
          closeNavigation();
        }
      },
      [closeNavigation, navigationVisible],
    );

    const handleOutsideClick = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
      (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
          closeNavigation();
        }
      },
      [closeNavigation],
    );

    useEffect(() => {
      window.addEventListener('keydown', closeMenuHandler);

      return () => {
        window.removeEventListener('keydown', closeMenuHandler);
      };
    }, [closeMenuHandler]);

    useEffect(() => {
      if (!closeOnOutsideClick || (closeOnOutsideClick && !navigationVisible)) {
        return;
      }

      raf(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => {
          window.removeEventListener('click', handleOutsideClick);
        };
      });
    }, [handleOutsideClick, navigationVisible]);

    if (!links || !links.length) {
      return null;
    }

    const handleLogout = (): void => {
      /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
      closeNavigation();
      Auth0.logout();
    };

    return (
      <div className={styles.Wrapper} ref={wrapperRef}>
        <div className={styles.MenuHeader}>
          <div className={styles.Container}>
            <div className={styles.MenuHeaderContent}>
              {MenuHeaderLogo && (
                /* @ts-ignore TODO: TS2322 ->  Type 'false | (() => void)' is not assignable to type '() => void'. */
                <MenuHeaderLogo closeNavigation={closeNavigation} />
              )}
              <button
                /* @ts-ignore TODO: TS2322 ->  Type 'false | (() => void)' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'. */
                onClick={closeNavigation}
                className={styles.CloseButton}
                aria-label={appCloseMenuMessage}
              >
                <Icon type="IconXMark" addClass={styles.CloseIcon} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.MenuBodyWrapper}>
          <div className={styles.UserInformationWrapper}>
            <div className={styles.Container}>
              <div className={styles.UserName}>
                <p>{appWelcomeMessage}, </p>
                <p>
                  {(authState.givenName &&
                    authState.familyName &&
                    `${authState.givenName} ${authState.familyName}`) ||
                    authState.email ||
                    ''}
                </p>
              </div>
              <div className={styles.UserCredentials}>
                {authState.email}
                <br />
                {authState.username}
              </div>
            </div>
          </div>
          <div className={styles.MenuWrapper}>
            <div className={styles.Container}>
              {MenuListHeader && <MenuListHeader />}
              <ul className={styles.MenuListWrapper}>
                {links.map(
                  ({
                    name,
                    link,
                    iconType,
                    trackingClass,
                    isHiddenOnHybridApp,
                    onClick,
                  }: UserCockpitMenuItem): ReactElement => {
                    if (
                      name === 'Profil bearbeiten' &&
                      isHybridApp &&
                      link !== '#'
                    ) {
                      const url = link.startsWith('http')
                        ? new URL(link)
                        : new URL(link, global.locationOrigin);
                      url.searchParams.set('headless', 'false');
                      url.searchParams.set('origin', 'app');
                      link = url.toString();
                    }
                    return (
                      <li
                        className={classNames(
                          {
                            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                            [styles.MenuItemHiddenOnApp]:
                              isHiddenOnHybridApp && isHybridApp,
                          },
                          styles.MenuItem,
                        )}
                        key={`user-menu-item-${name}`}
                      >
                        <MenuItem
                          link={link}
                          iconType={iconType}
                          name={name}
                          onClick={() => {
                            onClick && onClick();
                            /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
                            closeNavigation();
                          }}
                          trackingClass={trackingClass}
                        />
                      </li>
                    );
                  },
                )}
                <li className={styles.MenuItem} key={`user-menu-item-logout`}>
                  <MenuItem
                    type="IconLogout"
                    name={appLogoutMessage}
                    iconType="IconLogout"
                    trackingClass="link-usercockpit-logout"
                    onClick={handleLogout}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const mapStateToProps = (state: ReduxState) => ({
    navigationVisible: navigationStateSelector(state).visibleNavigation,
    authState: authStateSelector(state),
    isHybridApp: locationStateSelector(state)?.isHybridApp || false,
  });

  return connect(mapStateToProps)(NavigationUserMenu);
};

export default NavigationUserMenuFactory;
