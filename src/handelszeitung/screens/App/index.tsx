/**
 * @TODO
 *
 * 1. Remove all event listener setup stuff from app/entry/client and app/entry/server
 *    and re-add those as HoCs.
 */
// sonar-disable
// import-sort-ignore
// eslint import/order : off
import './assets/styles/fonts.font';
import './assets/styles/reset.legacy.css'; // include it before our own components so it doesn't override their styles
import '@piano.legacy.css';
import React, { ComponentType, memo, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { UIDReset } from 'react-uid';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import { Routes, Route } from 'react-router-dom';
import classNames from 'classnames';
import { checkDisallowParameters } from '../../../shared/helpers/withHelmet';
import {
  DEVICE_TYPE_IOS_MOBILE_TABLET,
  getMobileOperatingSystem,
  isPWApp,
} from '../../../shared/helpers/utils';
import {
  htmlAttributes,
  metaData,
  metaLinks,
  rssLinkPrimary,
  rssLinkSecondary,
} from './../../shared/helpers/metaData';
import withPianoTrackingData from '../../../shared/decorators/withPianoTrackingData';
import withRaschRouter from '../../shared/decorators/withRaschRouter';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import StrictMode from '../../../common/components/StrictMode';
import Logout from '../../../common/screens/Logout';
import TestFragment from './../../../shared/tests/components/TestFragment';
import Footer from './components/Footer';
import HeaderAdZone from './components/HeaderAdZone';
import HeaderArea from './components/HeaderArea';
import Navigation from './components/Navigation';
import Helmet from './components/Helmet';
import Loading from './components/Loading';
import Pull2Refresh from './components/Pull2Refresh';
import Router from './components/Router';
import SearchOverlay from './components/SearchOverlay';
import Account from './screens/Account';
import Authors from './screens/Authors';
import AlertsProfile from './screens/AlertsProfile';
import AlertsUnsubscribe from './screens/AlertsUnsubscribe';
import BookmarksProfile from './screens/BookmarksProfile';
import UserProfile from './screens/UserProfile';
import EventsCalendar from './screens/EventsCalendar';
import FinanceDictionary from './screens/FinanceDictionary';
import Keywords from './screens/Keywords';
import Offline from './screens/Offline';
import Search from './screens/Search';
import Sponsors from './screens/Sponsor/components/Sponsors';
import StatusPage from './screens/StatusPage';
import Videos from './screens/Videos';
import Latest from './screens/Latest';
import ViewGridLayout from '../../../common/components/ViewGridLayout';
import { useSSRContext } from '../../../common/components/SSRContext';
import { adsSetIsAdSuppressed } from '../../../shared/helpers/ads';
import {
  ContentTypeUnion,
  RaschRouter,
  WithRaschRouter,
} from '../../../shared/@types/gql';
import GoogleNewsShowcaseProvider from './components/GoogleNewsShowcaseProvider';
import {
  ADVERTISING_TYPE_LONGFORM,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_TYPE_MARKETING,
  PAGE_TYPE_MARKETING_DEFAULT_HEADER,
  PAGE_TYPE_SPONSOR,
} from '../../../shared/constants/content';
import {
  ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
  ROBOTS_META_NOINDEX_FOLLOW,
  ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
} from '../../../shared/constants/structuredData';
import {
  PIANO_CONTAINER_ANIMATED,
  PIANO_CONTAINER_ANIMATED_WRAPPER,
  PIANO_CONTAINER_LOCKED,
  PIANO_CONTAINER_METERING,
  PIANO_CONTAINER_METERING_PADDED,
  PIANO_CONTAINER_SLIDE_DOWN_ANIMATED,
} from '../../../shared/constants/piano';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZ,
  PUBLICATION_SWISS_INSURANCE,
  PUBLICATION_HZB,
} from '../../../shared/constants/publications';
import {
  MAIN_CONTENT_ID,
  MODAL_ROOT_ID,
  ROUTES_WITH_CUSTOM_PIANO_TRACKING,
  ROUTE_451,
  ROUTE_ACCOUNT,
  ROUTE_ALERTS,
  ROUTE_BOOKMARKS,
  ROUTE_BRAND_REPORT,
  ROUTE_EVENT_CALENDAR,
  ROUTE_FINANCE_LEXICON,
  ROUTE_FINANCE_LEXICON_LIST,
  ROUTE_KEYWORDS,
  ROUTE_KEYWORDS_SEARCH,
  ROUTE_LOGOUT,
  ROUTE_SEARCH,
  ROUTE_STYLEGUIDE,
  ROUTE_STYLEGUIDE_PARAGRAPHS,
  ROUTE_STYLEGUIDE_TYPOGRAPHY,
  ROUTE_STYLEGUIDE_BUTTONS,
  ROUTE_UNSUBSCRIBE_EMAIL_ALERTS,
  ROUTE_VIDEOS,
  ROUTE_LATEST,
  ROUTE_PROFILE,
  ROUTE_BIL,
  ROUTE_SWISS_INSURANCE,
  ROUTE_HZB,
  ROUTE_AUTHORS,
} from './constants';
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

type AppPropsInner = AppProps &
  WithRaschRouter & {
    isHybridApp: boolean;
  };
type RouteObject = ContentTypeUnion & {
  publication?: string;
  subtypeValue?: string;
};

const App: ComponentType<AppPropsInner> = ({
  data,
  lastLocation,
  page,
  loading,
  error,
}) => {
  const { isSSR } = useSSRContext();

  const online = global.navigator?.onLine;

  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const routePathname = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions.pathname,
  );

  if (!__TESTING__ && Object.keys(data).length === 0 && !error) {
    return <Loading />;
  }
  /* @ts-ignore TODO: TS2322 ->  Type '(NodeInterface & { __typename? */
  const routeByPath: RaschRouter = data?.environment?.routeByPath || null;
  /* @ts-ignore TODO: TS2322 ->  Type 'Partial<ContentTypeUnion> | undefined' is not assignable to type 'RouteObject'. */
  const routeObject: RouteObject = routeByPath?.object;
  const viafouraSubdomain = __DOT_ENV__ === 'master' ? 'www' : __DOT_ENV__;
  const viafouraURL =
    `https://${viafouraSubdomain}.handelszeitung.ch` +
    routeObject?.preferredUri;
  const isBilanz = routePathname?.startsWith(ROUTE_BIL);
  const isSwissInsurance = routePathname?.startsWith(ROUTE_SWISS_INSURANCE);
  const isHZBanking = routePathname?.startsWith(ROUTE_HZB);

  const publication =
    routeObject?.publication ||
    (isBilanz && PUBLICATION_BIL) ||
    (isSwissInsurance && PUBLICATION_SWISS_INSURANCE) ||
    (isHZBanking && PUBLICATION_HZB) ||
    PUBLICATION_HZ;

  const subtypeValue = routeObject?.subtypeValue || '';
  const isMarketingPage = [
    PAGE_TYPE_MARKETING,
    PAGE_TYPE_MARKETING_DEFAULT_HEADER,
    ADVERTISING_TYPE_LONGFORM,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  ].includes(routeObject?.subtypeValue);
  const isSponsorPage = routeObject?.__typename === PAGE_TYPE_SPONSOR;

  const isAdSuppressed =
    // @ts-ignore
    routeObject?.suppressAds ||
    // @ts-ignore
    routeObject?.channel?.suppressAds ||
    routeObject?.__typename === NATIVE_ADVERTISING_CONTENT_TYPE ||
    isMarketingPage ||
    isSponsorPage;

  adsSetIsAdSuppressed(isAdSuppressed);

  const isFirstPage = page === 1;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'RaschRouterLocation | undefined' is not assignable to parameter of type 'RaschRouterLocation'. */
  const hasDisallowParametersInUrl = checkDisallowParameters(lastLocation);

  // @ts-ignore
  const isRobotsIndexingEnabled = routeObject?.isRobotsIndexingEnabled;

  const rssLink = !isBilanz ? rssLinkPrimary : rssLinkSecondary;

  const correctRobotsMetaTags =
    (!isFirstPage && ROBOTS_META_NOINDEX_FOLLOW) ||
    (((isMarketingPage && !isRobotsIndexingEnabled) ||
      hasDisallowParametersInUrl ||
      isHybridApp) &&
      ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE) ||
    ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE;

  let htmlAttributesCopy = { ...htmlAttributes };

  // for cms preview we need to add smooth scroll behavior
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (global?.__GRAPHQL_HOST__?.includes('preview')) {
    htmlAttributesCopy = {
      ...htmlAttributesCopy,
      style: 'scroll-behavior: smooth',
    };
  }
  return (
    <TestFragment data-testid="app-wrapper">
      {online && <Loading />}

      {__ENABLE_GOOGLE_NEWS_SHOWCASE__ && <GoogleNewsShowcaseProvider />}
      <UIDReset>
        <div id={MODAL_ROOT_ID} />
        <div
          className={classNames('app', styles.App, {
            ['Bilanz']: publication === PUBLICATION_BIL,
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
            link={[...metaLinks, ...rssLink]}
          >
            {__VIAFOURA_DATE__ && (
              <script
                src="https://cdn.viafoura.net/entry/index.js"
                type="text/javascript"
                async
                defer
              ></script>
            )}
          </Helmet>

          {/* This wrapping div below is needed so AppNexus doesn't modify P2R content */}
          <div>
            {getMobileOperatingSystem() === DEVICE_TYPE_IOS_MOBILE_TABLET &&
              isPWApp && <Pull2Refresh />}
          </div>
          {isHybridApp ? (
            <Navigation publication={publication} />
          ) : (
            <HeaderArea subtypeValue={subtypeValue} publication={publication} />
          )}
          {!isAdSuppressed && <HeaderAdZone />}
          <SearchOverlay />
          <main id={MAIN_CONTENT_ID} className={styles.MainWrapper}>
            {!isSSR && !online ? (
              <TestFragment data-testid="offline-wrapper">
                <Offline />
              </TestFragment>
            ) : (
              <>
                {(error && (
                  <StatusPage statusCode={503} logMessage={error} />
                )) || (
                  /* @ts-ignore TODO: TS2322 ->  Type 'RaschRouterLocation | undefined' is not assignable to type 'string | Partial<Location> | undefined'. */
                  <Routes location={lastLocation}>
                    <Route
                      path={ROUTE_STYLEGUIDE}
                      element={
                        <Suspense fallback={<Loading />}>
                          <Styleguide location={lastLocation} />{' '}
                        </Suspense>
                      }
                    />
                    <Route
                      path={ROUTE_STYLEGUIDE_PARAGRAPHS}
                      element={
                        <Suspense fallback={<Loading />}>
                          <StyleguideParagraphs location={lastLocation} />{' '}
                        </Suspense>
                      }
                    />
                    <Route
                      path={ROUTE_STYLEGUIDE_TYPOGRAPHY}
                      element={
                        <Suspense fallback={<Loading />}>
                          <StyleguideTypography location={lastLocation} />{' '}
                        </Suspense>
                      }
                    />
                    <Route
                      path={ROUTE_STYLEGUIDE_BUTTONS}
                      element={
                        <Suspense fallback={<Loading />}>
                          <StyleguideButton location={lastLocation} />{' '}
                        </Suspense>
                      }
                    />
                    <Route
                      path={ROUTE_KEYWORDS}
                      element={<Keywords data={data} location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_KEYWORDS_SEARCH}
                      element={<Keywords data={data} location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_BRAND_REPORT}
                      element={<Sponsors data={data} location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_FINANCE_LEXICON}
                      element={
                        <FinanceDictionary
                          data={data}
                          location={lastLocation}
                        />
                      }
                    />
                    <Route
                      path={ROUTE_FINANCE_LEXICON_LIST}
                      element={
                        <FinanceDictionary
                          data={data}
                          location={lastLocation}
                        />
                      }
                    />
                    <Route
                      path={`${ROUTE_FINANCE_LEXICON_LIST}/:char`}
                      element={
                        <FinanceDictionary
                          data={data}
                          location={lastLocation}
                        />
                      }
                    />
                    <Route
                      path={`${ROUTE_SEARCH}/:searchQuery`}
                      element={
                        <Search
                          data={data}
                          page={page}
                          location={lastLocation}
                        />
                      }
                    />
                    <Route
                      path={ROUTE_VIDEOS}
                      element={<Videos data={data} location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_ACCOUNT}
                      element={<Account location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_ALERTS}
                      element={<AlertsProfile location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_UNSUBSCRIBE_EMAIL_ALERTS}
                      element={<AlertsUnsubscribe location={lastLocation} />}
                    />
                    <Route
                      path={`${ROUTE_UNSUBSCRIBE_EMAIL_ALERTS}/:oneSignalExternalId`}
                      element={<AlertsUnsubscribe location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_BOOKMARKS}
                      element={
                        <BookmarksProfile page={page} location={lastLocation} />
                      }
                    />
                    <Route
                      path={ROUTE_PROFILE}
                      element={<UserProfile location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_EVENT_CALENDAR}
                      element={<EventsCalendar />}
                    />
                    <Route
                      path={ROUTE_LATEST}
                      element={
                        <Latest
                          page={page}
                          data={data}
                          location={lastLocation}
                        />
                      }
                    />
                    <Route
                      path={ROUTE_451}
                      element={<StatusPage statusCode={451} />}
                    />
                    <Route
                      path={ROUTE_LOGOUT}
                      element={<Logout location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_AUTHORS}
                      element={<Authors data={data} loading={loading} />}
                    />
                    <Route
                      path="/*"
                      element={
                        <Router
                          data={data}
                          page={page}
                          loading={loading}
                          location={lastLocation}
                        />
                      }
                    />
                  </Routes>
                )}
              </>
            )}
          </main>
          {!isHybridApp && (
            <Footer
              // @ts-ignore
              publication={publication}
              isMarketingPage={isMarketingPage}
            />
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

const withUpdatePolicy = shouldUpdate<any>(
  (props: AppPropsInner, nextProps: AppPropsInner) => {
    // update page on location change to a static page
    if (
      nextProps.loading &&
      nextProps.data?.isStatic &&
      props.data?.isStatic !== nextProps.data?.isStatic
    ) {
      return true;
    }

    // update page on location change from static to a static page
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
      !nextProps?.error
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
const AppFinal = (props) => (
  <StrictMode>
    <App {...props} />
  </StrictMode>
);

const withBranch = branch<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props) =>
    !ROUTES_WITH_CUSTOM_PIANO_TRACKING.includes(
      props.lastLocation?.pathname?.substr(1),
    ),
  withPianoTrackingData,
);

export default compose<any, any>(
  withRaschRouter,
  withUpdatePolicy,
  withBranch,
)(memo(AppFinal));
