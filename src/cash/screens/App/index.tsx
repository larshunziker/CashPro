/**
 * @TODO
 *
 * 1. Remove all event listener setup stuff from an app/entry/client and app/entry/server
 *    and re-add those as HoC's.
 */
// sonar-disable
// import-sort-ignore
// eslint import/order : off
import './assets/styles/fonts.font';
import './assets/styles/reset.legacy.css'; // include it before our own components, so it doesn't override their styles.
import './assets/styles/global.legacy.css';
import '@piano.legacy.css';

import React, {
  ComponentType,
  Fragment,
  Suspense,
  lazy,
  memo,
  useContext,
} from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { UIDReset } from 'react-uid';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import FullquotePageBNP from 'src/cash/screens/App/screens/FullqutePageBNP';
import { adsSetIsAdSuppressed } from '../../../shared/helpers/ads';
import {
  DEVICE_TYPE_IOS_MOBILE_TABLET,
  getMobileOperatingSystem,
  isPWApp,
} from '../../../shared/helpers/utils';
import { checkDisallowParameters } from '../../../shared/helpers/withHelmet';
import {
  htmlAttributes,
  metaData,
  metaLinks,
} from '../../shared/helpers/metaData';
import locationStateSelector from '../../shared/selectors/locationStateSelector';
import { isStockFullquoteShorthandPath } from '../../shared/helpers/fullquote';
import withPianoTrackingData from '../../../shared/decorators/withPianoTrackingData';
import withRaschRouter from '../../shared/decorators/withRaschRouter';
import StrictMode from '../../../common/components/StrictMode';
import ViewGridLayout from '../../../common/components/ViewGridLayout';
import Logout from '../../../common/screens/Logout';
import TestFragment from './../../../shared/tests/components/TestFragment';
import AppNexus from './components/AppNexus';
import Footer from './components/Footer';
import HeaderAdZone from './components/HeaderAdZone';
import HeaderArea from './components/HeaderArea';
import Helmet from './components/Helmet';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import Pull2Refresh from './components/Pull2Refresh';
import Router from './components/Router';
import AlertsProfile from './screens/AlertsProfile';
import AlertsUnsubscribe from './screens/AlertsUnsubscribe';
import BookmarksProfile from './screens/BookmarksProfile';
import Dictionary from './screens/Dictionary';
import FullquotePage from './screens/FullquotePage';
import ChartIntegration from './screens/FullquotePage/components/ChartIntegration';
import Login from './screens/Login';
import MyCash from './screens/MyCash';
import Offline from './screens/Offline';
import QuoteListPage from './screens/QuoteListPage';
import Search from './screens/Search';
import StatusPage from './screens/StatusPage';
import TradingIdeas from './screens/TradingIdeas';
import UserProfile from './screens/UserProfile';
import WidgetPage from './screens/WidgetPage';
import Authors from './screens/Authors';
import {
  ContentTypeUnion,
  RaschRouter,
  WithRaschRouter,
} from '../../../shared/@types/gql';
import { useSSRContext } from '../../../common/components/SSRContext';
import { useWidgetPage } from '../../shared/hooks/useWidgetPage';
import TechnicalProblemsBox from './components/TechnicalProblemsBox';
import {
  ADVERTISING_TYPE_LONGFORM,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_TYPE_MARKETING,
  PAGE_TYPE_MARKETING_DEFAULT_HEADER,
  PAGE_TYPE_SPONSOR,
} from '../../../shared/constants/content';
import {
  PIANO_CONTAINER_ANIMATED,
  PIANO_CONTAINER_ANIMATED_WRAPPER,
  PIANO_CONTAINER_LOCKED,
  PIANO_CONTAINER_METERING,
  PIANO_CONTAINER_METERING_PADDED,
  PIANO_CONTAINER_SLIDE_DOWN_ANIMATED,
} from '../../../shared/constants/piano';
import {
  ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
  ROBOTS_META_NOINDEX_FOLLOW,
  ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
} from '../../../shared/constants/structuredData';
import { BOTTOM_AD_1 } from './components/AppNexus/constants';
import { PROTECTED_ROUTE_PROPS } from './components/ProtectedRoute/constants';
import {
  CONFIRM_ALERT_ID,
  MAIN_CONTENT_ID,
  MODAL_ROOT_ID,
  ROUTE_451,
  ROUTE_ALERTS,
  ROUTE_BOOKMARKS,
  ROUTE_CRYPTO_CURRENCIES_FULLQUOTE_PAGE,
  ROUTE_DERIVATIVES_FULLQUOTE_PAGE,
  ROUTE_DERIVATIVES_FULLQUOTE_PAGE_SIMULATOR,
  ROUTE_DICTIONARY,
  ROUTE_DICTIONARY_LIST,
  ROUTE_DIVERSE_FULLQUOTE_PAGE,
  ROUTE_EMAIL_ALERTS,
  ROUTE_FONDS_FULLQUOTE_PAGE,
  ROUTE_INDICES_FULLQUOTE_PAGE,
  ROUTE_INTEREST_FULLQUOTE_PAGE,
  ROUTE_LOGOUT,
  ROUTE_LOGIN,
  ROUTE_NEW_EMISSIONS_FULLQUOTE_PAGE,
  ROUTE_OBLIGATIONS_FULLQUOTE_PAGE,
  ROUTE_PORTFOLIO,
  ROUTE_PORTFOLIO_CASH_ITEMS,
  ROUTE_PORTFOLIO_CUSTOM_VIEW,
  ROUTE_PORTFOLIO_INSTRUMENT,
  ROUTE_PORTFOLIO_TRANSACTION,
  ROUTE_PROFILE,
  ROUTE_QUOTELIST_PAGE,
  ROUTE_RAW_MATERIALS_FULLQUOTE_PAGE,
  ROUTE_SEARCH,
  ROUTE_SEARCH_SUB_CATEGORY,
  ROUTE_STOCK_FULLQUOTE_PAGE,
  ROUTE_STOCK_FULLQUOTE_PAGE_SHORT,
  ROUTE_TRADING_IDEAS,
  ROUTE_UNSUBSCRIBE_EMAIL_ALERTS,
  ROUTE_WATCHLIST,
  ROUTE_WATCHLIST_CUSTOM_VIEW,
  ROUTE_WIKIFOLIO_FULLQUOTE_PAGE,
  SuppressAdsContext,
  ROUTE_PORTFOLIOS,
  ROUTE_PORTFOLIOS_ORDER,
  ROUTE_ABO_SERVICES,
  ROUTE_AUTHORS,
  ROUTE_DERIVATIVES_BNP_FULLQUOTE_PAGE,
} from './constants';
import {
  MY_CASH_ALERTS,
  MY_CASH_PORTFOLIO,
  MY_CASH_PORTFOLIOS,
  MY_CASH_PORTFOLIOS_ORDER,
  MY_CASH_PORTFOLIO_CASH_ITEMS,
  MY_CASH_PORTFOLIO_CUSTOM_VIEW,
  MY_CASH_PORTFOLIO_INSTRUMENT,
  MY_CASH_PORTFOLIO_TRANSACTIONS,
  MY_CASH_WATCHLIST,
  MY_CASH_WATCHLIST_CUSTOM_VIEW,
} from './screens/MyCash/constants';
import styles from './styles.legacy.css';
import { AppProps } from './typings';

const Styleguide = lazy(
  () => import(/* webpackChunkName: "Styleguide" */ './screens/Styleguide'),
);
const StyleguideParagraphs = lazy(
  () =>
    import(
      /* webpackChunkName: "StyleguideParagraphs" */ './screens/Styleguide/screens/Paragraphs'
    ),
);
const StyleguideButton = lazy(
  () =>
    import(
      /* webpackChunkName: "StyleguideButton" */ './screens/Styleguide/screens/Buttons'
    ),
);
const StyleguideTypography = lazy(
  () =>
    import(
      /* webpackChunkName: "StyleguideTypography" */ './screens/Styleguide/screens/Typography'
    ),
);
const StyleguideColors = lazy(
  () =>
    import(
      /* webpackChunkName: "StyleguideColors" */ './screens/Styleguide/screens/Colors'
    ),
);

type AppPropsInner = AppProps &
  WithRaschRouter &
  Pick<LocationState, 'isHybridApp'>;
type RouteObject = ContentTypeUnion & {
  channel?: Channel;
  subtypeValue?: string;
};

const App: ComponentType<AppPropsInner> = ({
  data,
  lastLocation,
  page,
  loading,
  error,
  isHybridApp,
}) => {
  const { isWidgetPage } = useWidgetPage();
  let { isAdSuppressed } = useContext(SuppressAdsContext);
  isAdSuppressed = isWidgetPage || isAdSuppressed;
  const online = global.navigator?.onLine;

  const { isSSR } = useSSRContext();

  if (!__TESTING__ && data && Object.keys(data).length === 0 && !error) {
    return <Loading />;
  }

  /* @ts-ignore TODO: TS2322 ->  Type '(NodeInterface & { __typename? */
  const routeByPath: RaschRouter = data?.environment?.routeByPath || null;
  /* @ts-ignore TODO: TS2322 ->  Type 'Partial<ContentTypeUnion> | undefined' is not assignable to type 'RouteObject'. */
  const routeObject: RouteObject = routeByPath?.object;
  const viafouraSubdomain = __DOT_ENV__ === 'master' ? 'www' : __DOT_ENV__;
  const viafouraURL =
    `https://${viafouraSubdomain}.cash.ch` + routeObject?.preferredUri;
  const isMarketingPageReducedHeader =
    routeObject?.subtypeValue === PAGE_TYPE_MARKETING;

  const isMarketingPageDefaultHeader =
    routeObject?.subtypeValue === PAGE_TYPE_MARKETING_DEFAULT_HEADER ||
    routeObject?.subtypeValue === ADVERTISING_TYPE_LONGFORM;

  const isMarketingPage =
    isMarketingPageReducedHeader || isMarketingPageDefaultHeader;

  const chartPattern = /.*?\/chart$/;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInteractiveChartPage = chartPattern.test(lastLocation.pathname);

  const isFirstPage = page === 1;

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'RaschRouterLocation | undefined' is not assignable to parameter of type 'RaschRouterLocation'. */
  const hasDisallowParametersInUrl = checkDisallowParameters(lastLocation);

  // @ts-ignore
  const isRobotsIndexingEnabled = routeObject?.isRobotsIndexingEnabled;

  const correctRobotsMetaTags =
    (!isFirstPage && ROBOTS_META_NOINDEX_FOLLOW) ||
    (((isMarketingPage && !isRobotsIndexingEnabled) ||
      hasDisallowParametersInUrl ||
      isHybridApp ||
      isInteractiveChartPage) &&
      ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE) ||
    ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE;

  let htmlAttributesCopy = { ...htmlAttributes };

  const fullquotePages = [
    { url: ROUTE_STOCK_FULLQUOTE_PAGE, pageType: 'fullquoteStock' },
    { url: ROUTE_INDICES_FULLQUOTE_PAGE, pageType: 'fullquoteIndices' },
    { url: ROUTE_INTEREST_FULLQUOTE_PAGE, pageType: 'fullquoteInterest' },
    {
      url: ROUTE_RAW_MATERIALS_FULLQUOTE_PAGE,
      pageType: 'fullquoteRawMaterials',
    },
    { url: ROUTE_DERIVATIVES_FULLQUOTE_PAGE, pageType: 'fullquoteDerivative' },
    {
      url: ROUTE_DERIVATIVES_FULLQUOTE_PAGE_SIMULATOR,
      pageType: 'fullquoteDerivateSimulator',
    },
    { url: ROUTE_OBLIGATIONS_FULLQUOTE_PAGE, pageType: 'fullquoteObligations' },
    { url: ROUTE_FONDS_FULLQUOTE_PAGE, pageType: 'fullquoteFonds' },
    {
      url: ROUTE_DIVERSE_FULLQUOTE_PAGE,
      pageType: 'fullquoteDiverse',
    },
    {
      url: ROUTE_CRYPTO_CURRENCIES_FULLQUOTE_PAGE,
      pageType: 'fullquoteCryptoCurrencies',
    },
    { url: ROUTE_WIKIFOLIO_FULLQUOTE_PAGE, pageType: 'fullquoteWikifolio' },
    {
      url: ROUTE_NEW_EMISSIONS_FULLQUOTE_PAGE,
      pageType: 'fullquoteNewEmissions',
    },
  ];

  // for cms preview we need to add smooth scroll behavior
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (global?.__GRAPHQL_HOST__?.includes('preview')) {
    htmlAttributesCopy = {
      ...htmlAttributesCopy,
      style: 'scroll-behavior: smooth',
    };
  }

  const hasQuoteListError =
    (data?.quoteList?.quoteList?.edges?.length || 0) === 0;

  return (
    <TestFragment data-testid="app-wrapper">
      {online && <Loading />}
      <UIDReset>
        <div id={MODAL_ROOT_ID} />
        <div id={CONFIRM_ALERT_ID} />
        <div
          className={classNames('app', {
            [styles.App]: !isWidgetPage,
            [styles.AppMarketingPage]: isMarketingPage,
          })}
        >
          <Helmet
            htmlAttributes={htmlAttributesCopy}
            titleTemplate={'%s'}
            meta={[
              {
                name: 'base',
                /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                content: global.locationOrigin,
              },
              {
                name: 'robots',
                content: correctRobotsMetaTags,
              },
              {
                name: 'vf:url',
                content: viafouraURL,
              },
              {
                name: 'vf:container_id',
                content: routeObject?.id || '',
              },
              ...metaData,
            ]}
            link={[...metaLinks]}
          >
            {!isWidgetPage && __VIAFOURA_DATE__ && (
              <script
                src="https://cdn.viafoura.net/entry/index.js"
                type="text/javascript"
                async
                defer
              ></script>
            )}
          </Helmet>
          {/* This wrapping div below is needed so AppNexus doesn't modify Pull2Refresh content. */}
          <div>
            {getMobileOperatingSystem() === DEVICE_TYPE_IOS_MOBILE_TABLET &&
              isPWApp && <Pull2Refresh />}
          </div>
          <div
            className={classNames({
              [styles.Hide]: isWidgetPage,
            })}
          >
            <HeaderArea
              contentType={routeObject?.__typename}
              channel={routeObject?.channel || null}
              subtypeValue={routeObject?.subtypeValue || null}
            />
          </div>
          {/* TODO: currently only scoped to quote list, add global scope to enable this also in case of errors for any other page */}
          {hasQuoteListError && lastLocation?.pathname?.includes('/kurse') && (
            <TechnicalProblemsBox
              title={'Technische Störung'}
              description={error?.message}
            />
          )}
          {(!isWidgetPage || !hasQuoteListError) && ( // in case of an error on a quote list page, we don't want to show the ad zone.
            <HeaderAdZone isAdSuppressed={isAdSuppressed} />
          )}
          <main id={MAIN_CONTENT_ID} className={styles.MainWrapper}>
            {!isSSR && !online ? (
              <TestFragment data-testid="offline-wrapper">
                <Offline />
              </TestFragment>
            ) : (
              /* @ts-ignore TODO: TS2322 ->  Type 'RaschRouterLocation | undefined' is not assignable to type 'string | Partial<Location> | undefined'. */
              <Routes location={lastLocation}>
                <Route
                  path="/widget/*"
                  /* @ts-ignore TODO: TS2786 ->  'WidgetPage' cannot be used as a JSX component. */
                  element={<WidgetPage location={lastLocation} />}
                />
                <Route
                  path="/styleguide"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Styleguide location={lastLocation} />
                    </Suspense>
                  }
                />
                <Route
                  path="/styleguide/typography/*"
                  element={
                    <Suspense fallback={<Loading />}>
                      <StyleguideTypography location={lastLocation} />
                    </Suspense>
                  }
                />
                <Route
                  path="/styleguide/paragraphs/*"
                  element={
                    <Suspense fallback={<Loading />}>
                      <StyleguideParagraphs location={lastLocation} />
                    </Suspense>
                  }
                />
                <Route
                  path="/styleguide/colors/*"
                  element={
                    <Suspense fallback={<Loading />}>
                      <StyleguideColors location={lastLocation} />
                    </Suspense>
                  }
                />
                <Route
                  path="/styleguide/buttons/*"
                  element={
                    <Suspense fallback={<Loading />}>
                      <StyleguideButton location={lastLocation} />
                    </Suspense>
                  }
                />
                <Route
                  path={ROUTE_451}
                  element={<StatusPage statusCode={451} />}
                />
                <Route
                  path={`/${ROUTE_STOCK_FULLQUOTE_PAGE_SHORT}`}
                  element={
                    isStockFullquoteShorthandPath(lastLocation?.pathname) ? (
                      <FullquotePage
                        data={data}
                        error={error}
                        page={{
                          url: ROUTE_STOCK_FULLQUOTE_PAGE_SHORT,
                          pageType: 'fullquoteStock',
                        }}
                        pageType="fullquoteStock"
                        location={lastLocation}
                      />
                    ) : (
                      // The short stock route also matches CMS pages like /aktien/wikifolio.
                      // Keep those pages on the default router.
                      <Router
                        data={data}
                        error={error}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                      />
                    )
                  }
                />
                {fullquotePages.map((page) => {
                  return (
                    <Fragment key={page.url}>
                      <Route
                        path={`/${page.url}`}
                        element={
                          <FullquotePage
                            data={data}
                            error={error}
                            page={page}
                            pageType={page.pageType}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${page.url}/chart`}
                        element={
                          <ChartIntegration
                            data={data}
                            location={lastLocation}
                          />
                        }
                      />
                    </Fragment>
                  );
                })}
                <Route
                  path={`/${ROUTE_DERIVATIVES_BNP_FULLQUOTE_PAGE}`}
                  element={
                    <FullquotePageBNP
                      isHybridApp={false}
                      loading={loading}
                      data={data}
                      error={error}
                      page={page}
                      location={lastLocation}
                    />
                  }
                />
                <Route
                  path={`/${ROUTE_QUOTELIST_PAGE}`}
                  element={
                    <QuoteListPage
                      data={data}
                      error={error}
                      page={page}
                      loading={loading}
                      location={lastLocation}
                    />
                  }
                />
                <Route
                  path={`/${ROUTE_SEARCH}`}
                  element={
                    <Search data={data} page={page} location={lastLocation} />
                  }
                />
                <Route
                  path={`/${ROUTE_SEARCH_SUB_CATEGORY}`}
                  element={
                    <Search data={data} page={page} location={lastLocation} />
                  }
                />
                <Route
                  path={ROUTE_DICTIONARY}
                  element={
                    <Dictionary
                      data={data}
                      error={error}
                      location={lastLocation}
                    />
                  }
                />
                <Route
                  path={ROUTE_DICTIONARY_LIST}
                  element={
                    <Dictionary
                      data={data}
                      error={error}
                      location={lastLocation}
                    />
                  }
                />
                <Route
                  path={`${ROUTE_DICTIONARY_LIST}/:char`}
                  element={
                    <Dictionary
                      data={data}
                      error={error}
                      location={lastLocation}
                    />
                  }
                />
                <Route path={ROUTE_LOGOUT} element={<Logout />} />
                <Route
                  path={ROUTE_BOOKMARKS}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.bookmarks}
                    >
                      <BookmarksProfile page={page} location={lastLocation} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_TRADING_IDEAS}
                  element={
                    <TradingIdeas
                      data={data}
                      error={error}
                      location={lastLocation}
                    />
                  }
                />
                <Route
                  path={`/${ROUTE_ALERTS}`}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.alerts}
                    >
                      <MyCash
                        component={MY_CASH_ALERTS}
                        page={page}
                        location={lastLocation}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`/${ROUTE_EMAIL_ALERTS}`}
                  element={<AlertsProfile location={lastLocation} />}
                />
                <Route
                  path={`/${ROUTE_UNSUBSCRIBE_EMAIL_ALERTS}`}
                  element={<AlertsUnsubscribe></AlertsUnsubscribe>}
                />
                <Route
                  path={`/${ROUTE_UNSUBSCRIBE_EMAIL_ALERTS}/:oneSignalExternalId`}
                  element={<AlertsUnsubscribe></AlertsUnsubscribe>}
                />
                <Route
                  path={`/${ROUTE_PORTFOLIOS}`}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.portfolio}
                    >
                      <MyCash
                        component={MY_CASH_PORTFOLIOS}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                        data={data}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`/${ROUTE_PORTFOLIOS_ORDER}`}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.portfolio}
                    >
                      <MyCash
                        component={MY_CASH_PORTFOLIOS_ORDER}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                        data={data}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`/${ROUTE_PORTFOLIO}`}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.portfolio}
                    >
                      <MyCash
                        component={MY_CASH_PORTFOLIO}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                        data={data}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`/${ROUTE_PORTFOLIO}/:portfolioKey`}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.portfolio}
                    >
                      <MyCash
                        component={MY_CASH_PORTFOLIO}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                        data={data}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_PORTFOLIO_TRANSACTION}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.portfolio}
                    >
                      <MyCash
                        component={MY_CASH_PORTFOLIO_TRANSACTIONS}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                        data={data}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_PORTFOLIO_INSTRUMENT}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.portfolio}
                    >
                      <MyCash
                        component={MY_CASH_PORTFOLIO_INSTRUMENT}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                        data={data}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_PORTFOLIO_CUSTOM_VIEW}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.customView}
                    >
                      <MyCash
                        component={MY_CASH_PORTFOLIO_CUSTOM_VIEW}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_PORTFOLIO_CASH_ITEMS}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.portfolio}
                    >
                      <MyCash
                        component={MY_CASH_PORTFOLIO_CASH_ITEMS}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`/${ROUTE_WATCHLIST}`}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.watchlist}
                    >
                      <MyCash
                        component={MY_CASH_WATCHLIST}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                        data={data}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`/${ROUTE_WATCHLIST}/:watchlistKey`}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.watchlist}
                    >
                      <MyCash
                        component={MY_CASH_WATCHLIST}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                        data={data}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTE_WATCHLIST_CUSTOM_VIEW}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.customView}
                    >
                      <MyCash
                        component={MY_CASH_WATCHLIST_CUSTOM_VIEW}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route path={`/login`} element={<Login />} />
                <Route
                  path={ROUTE_PROFILE}
                  element={<UserProfile location={lastLocation} />}
                />

                <Route
                  path={ROUTE_AUTHORS}
                  element={<Authors data={data} loading={loading} />}
                />
                <Route
                  path={ROUTE_ABO_SERVICES}
                  element={
                    <ProtectedRoute
                      location={lastLocation}
                      loginPageProps={PROTECTED_ROUTE_PROPS.account}
                    >
                      <Router
                        data={data}
                        error={error}
                        page={page}
                        location={lastLocation}
                        loading={loading}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Router
                      data={data}
                      error={error}
                      page={page}
                      location={lastLocation}
                      loading={loading}
                    />
                  }
                />
              </Routes>
            )}
          </main>
          {!isAdSuppressed && (
            <>
              <div
                className={classNames(
                  styles.BottomAdContainer,
                  'ad-wrapper ad-wrapper-tabletDesktop ad-overview',
                )}
              >
                <AppNexus
                  slot={BOTTOM_AD_1}
                  deviceType="tabletDesktop"
                  isMultiPlacement
                />
              </div>
              <div className="ad-wrapper ad-wrapper-mobile ad-overview">
                <AppNexus
                  slot={BOTTOM_AD_1}
                  deviceType="mobile"
                  isMultiPlacement
                />
              </div>
            </>
          )}
          {!isHybridApp && (
            <div
              className={classNames({
                [styles.Hide]: isWidgetPage,
              })}
            >
              <Footer
                // @ts-ignore
                isMarketingPage={isMarketingPage}
              />
            </div>
          )}
          <div id="piano-wrapper" className={styles.PianoWrapper}>
            <div
              id={PIANO_CONTAINER_METERING}
              className={styles.PianoMetering}
            />
            <div id={PIANO_CONTAINER_LOCKED} className={styles.PianoLocked} />
            <div
              id={PIANO_CONTAINER_METERING_PADDED}
              className={styles.PianoMeteringPadded}
            />
            <div
              id={PIANO_CONTAINER_SLIDE_DOWN_ANIMATED}
              className={styles.PianoSlideDownAnimated}
            ></div>
          </div>
          <div
            id={PIANO_CONTAINER_ANIMATED_WRAPPER}
            className={styles.PianoAnimatedWrapper}
          >
            <div
              id={PIANO_CONTAINER_ANIMATED}
              className={styles.PianoAnimated}
            ></div>
          </div>
        </div>
        {__VIAFOURA_DATE__ && (
          <div className="viafoura">
            <vf-tray-trigger floating={true} />
          </div>
        )}
      </UIDReset>
      <ViewGridLayout />
    </TestFragment>
  );
};

// eslint-disable-next-line
const withUpdatePolicy = shouldUpdate<any>(
  (props: AppPropsInner, nextProps: AppPropsInner) => {
    // update page on location change to a static page.
    if (
      nextProps.loading &&
      nextProps.data?.isStatic &&
      props.data?.isStatic !== nextProps.data?.isStatic
    ) {
      return true;
    }

    // update page on location change from static to a static page.
    if (
      !nextProps.loading &&
      props.loading === nextProps.loading &&
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      props.lastLocation.href !== nextProps.lastLocation.href &&
      props.data?.isStatic &&
      nextProps.data?.isStatic &&
      !nextProps?.error
    ) {
      return true;
    }

    // change location from a static page
    if (
      !nextProps.loading &&
      props.loading === nextProps.loading &&
      !nextProps.data?.isStatic &&
      props.data?.isStatic !== nextProps.data?.isStatic
    ) {
      return true;
    }

    // default location change
    if (!nextProps.loading && props.loading !== nextProps.loading) {
      return true;
    }

    // always update on page change
    if (nextProps.page !== props.page) {
      return true;
    }

    // history back/forward location change
    if (
      !nextProps.loading &&
      props.loading === nextProps.loading &&
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      props.lastLocation.href !== nextProps.lastLocation.href &&
      !nextProps.data?.isStatic &&
      !nextProps.error
    ) {
      return true;
    }

    // update on refetch
    if (
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      props.lastLocation.href === nextProps.lastLocation.href &&
      !nextProps.loading &&
      !props.refetchLoading &&
      props.loading === nextProps.loading &&
      props.refetchLoading === nextProps.refetchLoading
    ) {
      return true;
    }

    return false;
  },
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const AppFinal = (props) => {
  const routeByPath: RaschRouter =
    props?.data?.environment?.routeByPath || null;
  /* @ts-ignore TODO: TS2322 ->  Type 'Partial<ContentTypeUnion> | undefined' is not assignable to type 'RouteObject'. */
  const routeObject: RouteObject = routeByPath?.object;
  const isMarketingPage =
    routeObject?.subtypeValue === PAGE_TYPE_MARKETING ||
    routeObject?.subtypeValue === PAGE_TYPE_MARKETING_DEFAULT_HEADER ||
    routeObject?.subtypeValue === ADVERTISING_TYPE_LONGFORM;
  const isSponsorPage = routeObject?.__typename === PAGE_TYPE_SPONSOR;
  const isLoginPage =
    !!props?.lastLocation?.pathname?.startsWith(`/${ROUTE_LOGIN}`) || false;
  const isProfilePage =
    !!props?.lastLocation?.pathname?.startsWith(`/${ROUTE_PROFILE}`) || false;
  const isAdSuppressed =
    // @ts-ignore
    routeObject?.suppressAds ||
    // @ts-ignore
    routeObject?.channel?.suppressAds ||
    routeObject?.__typename === NATIVE_ADVERTISING_CONTENT_TYPE ||
    isMarketingPage ||
    isSponsorPage ||
    isLoginPage ||
    isProfilePage;

  adsSetIsAdSuppressed(isAdSuppressed);

  return (
    <StrictMode>
      <SuppressAdsContext.Provider value={{ isAdSuppressed }}>
        <App {...props} />
      </SuppressAdsContext.Provider>
    </StrictMode>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isHybridApp: locationStateSelector(state).isHybridApp,
});

export default compose<any, any>(
  connect(mapStateToProps),
  withRaschRouter,
  withUpdatePolicy,
  withPianoTrackingData,
)(memo(AppFinal));
