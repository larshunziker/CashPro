import React, { ReactElement, memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import { MARKETING_PAGE } from '../../../../../../shared/actions/route';
import Button from '../../../ButtonWithLoading';
import Icon from '../../../Icon';
import Logo from '../../../Logo';
import Navigation from '../../../Navigation';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import SVGIcon from '../../../SVGIcon';
import SearchForm from '../../../SearchForm';
import BankingButton from '../BankingButton';
import IconButton from '../IconButton';
import {
  addWebAppEventListener,
  removeWebAppEventListener,
} from '../../../../../../../common/components/HybridAppProvider';
import { NavigationMenuType } from '../../../../../../../cash/shared/constants/enums';
import {
  SVG_ICONS_TYPE_SEARCH,
  SVG_ICONS_TYPE_USER,
  SVG_ICONS_TYPE_USER_ACTIVE,
} from '../../../../../../../shared/constants/svgIcons';
import { TRACKING_CLASS_SITE_HEADER } from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { HeaderInnerProps } from './typings';

const HeaderInner = ({}: HeaderInnerProps): ReactElement => {
  const [isSearchformVisible, setIsSearchformVisible] = useState(false);
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: ReduxState) => state.search.searchQuery,
  );
  const isAuthenticated = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.isAuthenticated,
  );
  const visibleNavigation = useSelector<ReduxState, NavigationMenuType>(
    ({ navigation }) => navigation.visibleNavigation as NavigationMenuType,
  );
  const routeVertical = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).vertical,
  );
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const pathname = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions.pathname,
  );

  const isSearchPage = pathname.startsWith('/suche/');

  const toggleNavigation = (type: NavigationMenuType) => {
    if (type === NavigationMenuType.DEFAULT && visibleNavigation) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
      dispatch(setNavigationVisible(null));
    } else {
      dispatch(setNavigationVisible(type));
    }
  };
  const isSearchformVisibleRef = useRef(isSearchformVisible);
  const toggleSearchForm = () => {
    isSearchformVisibleRef.current = !isSearchformVisibleRef.current;
    setIsSearchformVisible(isSearchformVisibleRef.current);
  };

  useEffect(() => {
    addWebAppEventListener('handle-search-click', toggleSearchForm);

    return () => {
      removeWebAppEventListener('handle-search-click', toggleSearchForm);
    };
  }, []);

  useEffect(() => {
    // on search pages we want to show the user the search form
    if (isSearchPage) {
      setIsSearchformVisible(true);
    } else {
      setIsSearchformVisible(false);
    }
  }, [isSearchPage]);

  const isMarketingPageReducedHeader = routeVertical === MARKETING_PAGE;

  return (
    <>
      {!isHybridApp && (
        <div
          className={classNames(TRACKING_CLASS_SITE_HEADER, styles.Wrapper, {
            [grid.GridCentered]: isMarketingPageReducedHeader,
          })}
          id="header-inner-wrapper"
          data-testid="header-container"
        >
          <div
            className={classNames(
              grid.Container,
              styles.Header,
              styles.Hidden,
              {
                [styles.MarketingPage]: isMarketingPageReducedHeader,
              },
            )}
          >
            <RefetchGqlDataLink
              title="Startseite"
              ariaLabel="Startseite"
              path="/"
              className={styles.HeaderLogo}
            >
              <Logo />
            </RefetchGqlDataLink>
          </div>

          <nav
            className={classNames(grid.Container, styles.Header, {
              [styles.Hidden]: isMarketingPageReducedHeader,
            })}
          >
            <RefetchGqlDataLink
              title="Startseite"
              ariaLabel="Startseite"
              path="/"
              className={styles.HeaderLogo}
            >
              <Logo />
            </RefetchGqlDataLink>

            <div
              className={classNames(grid.HiddenSmDown, styles.SearchContainer)}
            >
              <div className={styles.SearchWrapper}>
                <SearchForm
                  minQueryLength={2}
                  initialQuery={searchQuery}
                  focusOnMount={false}
                  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
                  menuCloseHandler={() => dispatch(setNavigationVisible(null))}
                />
              </div>
            </div>
            <BankingButton />
            <IconButton
              aria-label="Suchen"
              addClass={styles.Button}
              type={SVG_ICONS_TYPE_SEARCH}
              onClick={() => toggleSearchForm()}
            >
              Suche
            </IconButton>
            {isAuthenticated ? (
              <>
                <IconButton
                  aria-label="Usercockpit öffnen"
                  type={SVG_ICONS_TYPE_USER_ACTIVE}
                  onClick={() => toggleNavigation(NavigationMenuType.USER)}
                  addClass={classNames(styles.Button, 'hide-on-print')}
                >
                  Profil
                </IconButton>
                <div
                  className={classNames(
                    grid.HiddenSmDown,
                    styles.LoginButton,
                    'hide-on-print',
                  )}
                >
                  <Button
                    aria-label="Usercockpit öffnen"
                    variant="secondary"
                    size="small"
                    onClick={() => toggleNavigation(NavigationMenuType.USER)}
                  >
                    <span className={styles.ButtonWithIcon}>
                      <SVGIcon
                        type={SVG_ICONS_TYPE_USER_ACTIVE}
                        className={styles.Icon}
                      />
                      Profil
                    </span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="Usercockpit öffnen"
                  type={SVG_ICONS_TYPE_USER}
                  onClick={() => toggleNavigation(NavigationMenuType.LOGIN)}
                  addClass={classNames('hide-on-print', styles.Button)}
                >
                  Login
                </IconButton>
                <div
                  className={classNames(
                    grid.HiddenSmDown,
                    styles.LoginButton,
                    'hide-on-print',
                  )}
                >
                  <Button
                    aria-label="Usercockpit öffnen"
                    variant="secondary"
                    size="small"
                    onClick={() => toggleNavigation(NavigationMenuType.LOGIN)}
                  >
                    <span className={styles.ButtonWithIcon}>
                      <SVGIcon
                        type={SVG_ICONS_TYPE_USER}
                        className={styles.Icon}
                      />
                      Login
                    </span>
                  </Button>
                </div>
              </>
            )}
            <button
              className={classNames(
                'track-menu',
                grid.HiddenMdUp,
                styles.Button,
                styles.MenuButton,
              )}
              aria-label={
                visibleNavigation === NavigationMenuType.DEFAULT
                  ? 'Menu schließen'
                  : 'Menu öffnen'
              }
              data-track-action={
                visibleNavigation === NavigationMenuType.DEFAULT
                  ? 'close'
                  : 'open'
              }
              data-track-element="menu"
              onClick={() => toggleNavigation(NavigationMenuType.DEFAULT)}
            >
              <span className={styles.MenuIconContainer}>
                <span
                  className={classNames(styles.MenuIcon, {
                    [styles.MenuIconOpen]:
                      visibleNavigation === NavigationMenuType.DEFAULT,
                  })}
                />
              </span>
              <span className={grid.HiddenSmUp}>Menu</span>
            </button>
          </nav>
          <div className={classNames(grid.HiddenMdDown, grid.Container)}>
            <Navigation />
          </div>
        </div>
      )}
      {isSearchformVisible && (
        <div
          className={classNames(
            grid.HiddenSmUp,
            styles.MobileSearchFormWrapper,
          )}
        >
          <div
            className={classNames(styles.CloseIconWrapper, {
              [styles.IsHybridApp]: isHybridApp,
            })}
            data-testid="searchform-factory-reset-button"
            onClick={toggleSearchForm}
            onKeyUp={toggleSearchForm}
            tabIndex={0}
            role="button"
          >
            <Icon
              addClass={styles.CloseIcon}
              type={(isHybridApp && 'IconXMark') || 'IconArrowLeft'}
            />
          </div>
          <div
            className={classNames(styles.SearchWrapper, {
              [styles.IsHybridApp]: isHybridApp,
            })}
          >
            <SearchForm
              minQueryLength={2}
              initialQuery={searchQuery}
              focusOnMount={true}
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
              menuCloseHandler={() => dispatch(setNavigationVisible(null))}
            />
          </div>
        </div>
      )}
      <div className={styles.UtilityOverlayWrapper}>
        <div id="utility-bar-overlay" />
      </div>
    </>
  );
};

export default memo(HeaderInner);
