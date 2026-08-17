import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import classNames from 'classnames';
import { getRCTrackingSource } from '../../../../../../../shared/helpers/getRCTrackingSource';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import {
  DEVICE_TYPE_ANDROID,
  getMobileOperatingSystem,
} from '../../../../../../../shared/helpers/utils';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import scrollStateSelector from '../../../../../../../shared/selectors/scrollStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import {
  HOME,
  MARKETING_PAGE,
  SEARCH,
} from '../../../../../../shared/actions/route';
import Link from '../../../../../../../common/components/Link';
import LinkLegacy from '../../../../../../../common/components/LinkLegacy';
import TopPromoBanner from '../../../TopPromoBanner';
import Navigation from '../../../Navigation';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import SVGIcon from '../../../SVGIcon';
import SearchForm from '../../../Search/components/SearchForm';
import NewSearchForm from '../../../SearchForm';
import UtilityHeaderBar from '../../../UtilityBar/components/UtilityHeaderBar';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { AUTH0_LOGIN_CASE_GENERAL } from '../../../../../../../common/components/Auth0Provider/constants';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_GUIDE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  SUBSCRIPTION_RENEWAL_THRESHOLD_DAYS,
} from '../../../../../../../shared/constants/content';
import {
  SVG_ICONS_TYPE_ARROW_BACK,
  SVG_ICONS_TYPE_BOOK,
  SVG_ICONS_TYPE_MENU,
  SVG_ICONS_TYPE_SEARCH,
  SVG_ICONS_TYPE_USER,
  SVG_ICONS_TYPE_USER_ACTIVE,
} from '../../../../../../../shared/constants/svgIcons';
import { ROUTE_NEWSLETTER } from '../../../../constants';
import {
  UTILITYBAR_CONFIG_EXPLAINING_ARTICLE,
  UTILITYBAR_OVERLAY_CONFIG_EXPLAINING_ARTICLE,
} from '../../../../screens/././ExplainingArticles/constants';
import {
  UTILITYBAR_CONFIG_ARTICLE,
  UTILITYBAR_CONFIG_ARTICLE_GUIDE,
  UTILITYBAR_CONFIG_ARTICLE_NATIVE_ADVERTISING,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../../../screens/Article/constants';
import { NavigationMenuType } from '../../../Navigation/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/beobachter/scre */
import { GET_NAVIGATION } from './queries.preload';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
// @ts-ignore
import logo from 'graphics/logo.svg';
import { HeaderInnerComponent, HeaderInnerProps } from './typings';

export type HeaderInnerPropsInner = HeaderInnerProps & {
  contentType: string;
  routePathname: string;
  routeVertical: string;
  visibleNavigation: null | string;
  authState: AuthState;
  setNavigationVisible: (visibleNavigation: string) => void;
  pageMetadata: PianoPageMetadata;
  headerArticleData: ArticleData;
  headerContentType: string;
  isInArticle?: boolean;
  navigationPrimaryMenu: Menu;
  scrollDirection: string;
};

const HeaderInner: HeaderInnerComponent = ({
  setNavigationVisible,
  routeVertical,
  contentType,
  isCollapsed,
  hasStickiness = true,
  authState,
  routePathname,
  pageMetadata,
  headerArticleData,
  headerContentType,
  isInArticle,
  navigationPrimaryMenu,
  scrollDirection,
}: HeaderInnerPropsInner) => {
  const params = useParams();
  const [focusSearchOnMount, setFocusSearchOnMount] = useState(false);

  isCollapsed = isCollapsed && scrollDirection === 'down';

  const isSocialBarVisible = [
    ARTICLE_CONTENT_TYPE,
    NATIVE_ADVERTISING_CONTENT_TYPE,
    EXPLAINING_ARTICLE_CONTENT_TYPE,
  ].includes(contentType);
  const isSocialbarInHeader =
    (isCollapsed || !hasStickiness) && isSocialBarVisible;

  let enabledUtilities = UTILITYBAR_CONFIG_ARTICLE;
  let enabledOverlayUtilities = UTILITYBAR_OVERLAY_CONFIG_ARTICLE;

  if (headerContentType === EXPLAINING_ARTICLE_CONTENT_TYPE) {
    enabledUtilities = UTILITYBAR_CONFIG_EXPLAINING_ARTICLE;
    enabledOverlayUtilities = UTILITYBAR_OVERLAY_CONFIG_EXPLAINING_ARTICLE;
  }

  if (headerArticleData.subtypeValue === ARTICLE_TYPE_GUIDE) {
    enabledUtilities = UTILITYBAR_CONFIG_ARTICLE_GUIDE;
  }

  if (headerContentType === NATIVE_ADVERTISING_CONTENT_TYPE) {
    enabledUtilities = UTILITYBAR_CONFIG_ARTICLE_NATIVE_ADVERTISING;
  }

  const { isSSR } = useSSRContext();

  const isPWABackButtonShown =
    (!isSSR &&
      !__TESTING__ &&
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"standalone"' can't be used to index type 'Navigator'. */
      (global?.navigator?.['standalone'] ||
        window.matchMedia('(display-mode: standalone)').matches) &&
      getMobileOperatingSystem() !== DEVICE_TYPE_ANDROID &&
      window.location.pathname !== '/') ||
    false;

  const navigateBack = () => {
    if (__CLIENT__) {
      if (global?.history?.state) {
        global.history.back();
      } else {
        window.location.href = '/';
      }
    }
  };

  const isMarketingPageReducedHeader = routeVertical === MARKETING_PAGE;
  const isSearchPage = routeVertical === SEARCH;

  if (routeVertical === HOME) {
    pageMetadata.section = 'HOME';
  }

  const source = getRCTrackingSource('direct', pageMetadata);

  const navigationVerticalLinks = navigationPrimaryMenu?.links?.edges?.map(
    (edge: MenuTreeItemEdge) => {
      return edge?.node?.link?.path;
    },
  );

  const subscriptionsEndDate = authState.subscriptionsEndDates?.length
    ? new Date(
        Math.max(
          ...authState.subscriptionsEndDates.map((date) =>
            new Date(date).getTime(),
          ),
        ),
      )
    : null;

  const isSubscriptionEndsSoon = subscriptionsEndDate
    ? (subscriptionsEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24) <=
      SUBSCRIPTION_RENEWAL_THRESHOLD_DAYS
    : true;

  return (
    <>
      <TopPromoBanner />
      <div
        className={classNames(
          styles.TabsWrapper,
          grid.HideForPrint,
          styles.ScrollWrapper,
          {
            [styles.Hidden]: isMarketingPageReducedHeader,
            [styles.MoveUpTabs]: isCollapsed,
          },
        )}
      >
        <div className={classNames(grid.Container, styles.ScrollContainer)}>
          <div className={styles.Tabs}>
            {navigationPrimaryMenu?.links?.edges?.map(
              (edge: MenuTreeItemEdge, edgeIndex: number) => {
                const link = edge?.node?.link;
                const isActive =
                  (edgeIndex === 0 &&
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    navigationVerticalLinks.slice(1).every(
                      (verticalLink) =>
                        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
                        !routePathname.startsWith(verticalLink),
                    )) ||
                  (edgeIndex !== 0 &&
                    routePathname.startsWith(
                      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
                      navigationVerticalLinks[edgeIndex],
                    ));

                return (
                  link && (
                    <Link
                      className={classNames(styles.TabLink, {
                        [styles.TabLinkActive]: isActive,
                        [styles.TabMagazine]:
                          edge?.node?.link?.label === 'Magazin',
                        [styles.TabAdvisory]:
                          edge?.node?.link?.label === 'Beratung' ||
                          edge?.node?.link?.label === 'Rechtsberatung',
                        [styles.TabCommunity]:
                          edge?.node?.link?.label === 'Engagement',
                        [styles.TabEdition]:
                          edge?.node?.link?.label === 'Buchverlag',
                      })}
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                      path={link.path}
                      key={edgeIndex}
                    >
                      {link.label}
                    </Link>
                  )
                );
              },
            )}
          </div>
        </div>
      </div>
      <div
        className={classNames('header-inner', {
          [grid.GridCentered]: isMarketingPageReducedHeader,
        })}
      >
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div
              className={classNames(grid.ColXs24, styles.InnerWrapper, {
                [styles.Collapsed]:
                  isCollapsed && !isMarketingPageReducedHeader,
                [styles.MarketingPage]: isMarketingPageReducedHeader,
              })}
            >
              <div className={styles.BackButtonLogoWrapper}>
                {/* Back Button */}
                {isPWABackButtonShown && !isMarketingPageReducedHeader && (
                  <button
                    className={classNames(styles.Action, styles.BackAction)}
                    onClick={() => navigateBack()}
                    aria-label="Zurück"
                  >
                    <SVGIcon type={SVG_ICONS_TYPE_ARROW_BACK} />
                  </button>
                )}
                <div className={styles.Col}>
                  {!isPWABackButtonShown && (
                    <div className={styles.BrandAndVerticalWrapper}>
                      <button
                        onClick={() => {
                          setNavigationVisible(NavigationMenuType.DEFAULT);
                          setFocusSearchOnMount(false);
                          tealiumTrackEvent({
                            type: 'link',
                            payload: { event_name: 'menu_open' },
                          });
                        }}
                        className={classNames(styles.MenuButton, {
                          [styles.Hidden]: isMarketingPageReducedHeader,
                          [styles.HidingAnimation]: !isCollapsed,
                          [styles.Collapsed]: isCollapsed,
                        })}
                        data-testid="menu-button"
                      >
                        <SVGIcon
                          type={SVG_ICONS_TYPE_MENU}
                          className={styles.SVGWrapper}
                        />
                      </button>

                      <RefetchGqlDataLink
                        path="/"
                        className={styles.BrandWrapper}
                        aria-label="Zur Startseite"
                      >
                        <img
                          className={classNames(styles.Logo, {
                            [styles.Collapsed]:
                              isCollapsed && !isMarketingPageReducedHeader,
                          })}
                          src={logo}
                          alt={'Beobachter'}
                          width={219}
                          height={48}
                        />
                      </RefetchGqlDataLink>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={classNames(
                  styles.ButtonsActions,
                  grid.HideForPrint,
                  {
                    [styles.Collapsed]: isCollapsed,
                  },
                )}
              >
                <div
                  className={classNames(styles.Actions, {
                    [styles.Hidden]: isMarketingPageReducedHeader,
                    [styles.MoveUp]: isSocialbarInHeader,
                  })}
                >
                  {!isSearchPage && (
                    <>
                      <div className={styles.SearchWrapper}>
                        <NewSearchForm
                          initialQuery={params && params.query}
                          placeholder="Suche"
                        />
                      </div>
                      <button
                        className={classNames(
                          grid.HiddenSmUp,
                          styles.Action,
                          styles.SearchAction,
                        )}
                        onClick={() => {
                          setNavigationVisible(NavigationMenuType.DEFAULT);
                          setFocusSearchOnMount(true);
                        }}
                      >
                        <SVGIcon
                          type={SVG_ICONS_TYPE_SEARCH}
                          className={styles.ActionIcon}
                        />
                      </button>
                    </>
                  )}

                  {/* Membership link */}
                  <LinkLegacy
                    /* @ts-ignore */
                    id="abonnieren"
                    link={{
                      path: 'abonnieren?promo_name=abobutton&promo_position=header',
                    }}
                    className={classNames(
                      styles.Action,
                      styles.MembershipAction,
                      grid.HiddenLgDown,
                      { [styles.VisibilityHidden]: !isSubscriptionEndsSoon },
                    )}
                    aria-label="Abonnieren"
                  >
                    Abonnieren
                  </LinkLegacy>

                  {/* Newsletter menu */}
                  <Link
                    className={classNames(
                      styles.Action,
                      styles.NewsletterAction,
                      grid.HiddenXlDown,
                    )}
                    path={ROUTE_NEWSLETTER}
                  >
                    <>
                      <SVGIcon
                        type={SVG_ICONS_TYPE_BOOK}
                        className={styles.ActionIcon}
                      />
                      Bücher
                    </>
                  </Link>
                  {/* User menu */}
                  {authState.isAuthenticated ? (
                    <button
                      key={`user-menu-button-${Math.random()}`}
                      className={classNames(styles.Action, styles.LoginAction, {
                        [styles.Collapsed]: isCollapsed,
                      })}
                      onClick={(): void =>
                        setNavigationVisible(NavigationMenuType.USER)
                      }
                      data-testid="headerinner-openusernavigation-button"
                      aria-label="Benutzermenü öffnen"
                    >
                      <SVGIcon
                        type={SVG_ICONS_TYPE_USER_ACTIVE}
                        className={styles.ActionIcon}
                      />
                      <span
                        className={classNames(
                          grid.HiddenSmDown,
                          styles.LoginLabel,
                        )}
                      >
                        {authState.givenName &&
                          authState.familyName &&
                          `${authState.givenName} ${authState.familyName}`}
                      </span>
                    </button>
                  ) : (
                    <button
                      key={`user-login-button-${Math.random()}`}
                      id="header-login-action"
                      className={classNames(styles.Action, styles.LoginAction, {
                        [styles.Collapsed]: isCollapsed,
                      })}
                      onClick={() =>
                        Auth0.login(AUTH0_LOGIN_CASE_GENERAL, source)
                      }
                      data-testid="headerinner-login-button"
                      aria-label="login"
                    >
                      <SVGIcon
                        type={SVG_ICONS_TYPE_USER}
                        className={styles.ActionIcon}
                      />
                      <span className={grid.HiddenSmDown}>Anmelden</span>
                    </button>
                  )}
                </div>

                {!__TESTING__ && (
                  <UtilityHeaderBar
                    /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
                    isScrolledToCollapse={isCollapsed}
                    articleData={headerArticleData}
                    isSocialBarVisible={isSocialBarVisible}
                    enabledUtilities={enabledUtilities}
                    enabledOverlayUtilities={enabledOverlayUtilities}
                    showTitle={false}
                    isTopBar
                    hideIconLabel
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Navigation
          isScrolledToCollapse={isCollapsed}
          isInArticle={!!isInArticle}
          setFocusSearchOnMount={setFocusSearchOnMount}
          navigationPrimaryMenu={navigationPrimaryMenu}
        >
          {/* Mobile search form */}
          <div className={styles.SearchFormHeaderWrapper}>
            <SearchForm
              initialQuery={params && params.query}
              placeholder="Beobachter durchsuchen"
              addClass={styles.SearchForm}
              searchButtonClass={styles.SearchButtonClass}
              focusOnMount={focusSearchOnMount}
            />
          </div>
        </Navigation>
      </div>
    </>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  routeVertical: locationStateSelector(state).vertical,
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
  authState: authStateSelector(state),
  contentType: headerStateSelector(state).contentType,
  pageMetadata: pianoStateSelector(state).pageMetadata,
  headerArticleData: headerStateSelector(state).articleData,
  headerContentType: headerStateSelector(state).contentType,
  scrollDirection: scrollStateSelector(state).direction,
});

const mapDispatchToProps = {
  setNavigationVisible,
};

const withData = withProps(GET_NAVIGATION);

const withStoreConnection = connect(mapStateToProps, mapDispatchToProps);

export default compose<any, any>(
  withStoreConnection,
  withData,
)(memo(HeaderInner));
