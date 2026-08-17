import React, {
  ComponentType,
  ReactElement,
  Suspense,
  lazy,
  memo,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { UIDReset } from 'react-uid';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import { adsSetIsAdSuppressed } from '../../../shared/helpers/ads';
import { checkDisallowParameters } from '../../../shared/helpers/withHelmet';
import {
  DEVICE_TYPE_IOS_MOBILE_TABLET,
  getMobileOperatingSystem,
  isPWApp,
} from './../../../shared/helpers/utils';
import {
  htmlAttributes,
  metaData,
  metaIcons,
  metaLinks,
} from './../../shared/helpers/metaData';
import withPianoTrackingData from '../../../shared/decorators/withPianoTrackingData';
import withRaschRouter from '../../shared/decorators/withRaschRouter';
import withSettingsStateHandler from '../../shared/decorators/withSettingsStateHandler';
import StrictMode from '../../../common/components/StrictMode';
import ViewGridLayout from '../../../common/components/ViewGridLayout';
import Logout from '../../../common/screens/Logout';
import TestFragment from './../../../shared/tests/components/TestFragment';
import Footer from './components/Footer';
import FullscreenGallery from './components/FullscreenGallery';
import HeaderAdZone from './components/HeaderAdZone';
import HeaderArea from './components/HeaderArea';
import Helmet from './components/Helmet';
import LoadingBar from './components/Loading';
import Pull2Refresh from './components/Pull2Refresh';
import Router from './components/Router';
import AlertsProfile from './screens/AlertsProfile';
import AlertsUnsubscribe from './screens/AlertsUnsubscribe';
import Authors from './screens/Authors';
import Blogs from './screens/Blogs';
import BookmarksProfile from './screens/BookmarksProfile';
import Horoscope from './screens/Horoscope';
import Latest from './screens/Latest';
import Offline from './screens/Offline';
import PuzzlesDetail from './screens/Puzzles/screens/PuzzlesDetail';
import PuzzlesList from './screens/Puzzles/screens/PuzzlesList';
import PuzzlesOverview from './screens/Puzzles/screens/PuzzlesOverview';
import Search from './screens/Search';
import StatusPage from './screens/StatusPage';
import Videos from './screens/Videos';
import { WithRaschRouter } from '../../../shared/@types/gql';
import {
  HoroscopeDetailWrapper as DailyHoroscopeDetail,
  HoroscopeDetailWrapper as YearlyHoroscopeDetail,
} from './screens/HoroscopeDetail';
import { useSSRContext } from '../../../common/components/SSRContext';
import {
  ADVERTISING_TYPE_LONGFORM,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_TYPE_MARKETING,
  PAGE_TYPE_MARKETING_DEFAULT_HEADER,
} from '../../../shared/constants/content';
import {
  ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
  ROBOTS_META_NOINDEX_FOLLOW,
  ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
} from '../../../shared/constants/structuredData';
import { FULLSCREEN_HASH } from './../../../shared/constants/fullscreen';
import {
  PIANO_CONTAINER_ANIMATED,
  PIANO_CONTAINER_LOCKED,
  PIANO_CONTAINER_METERING,
  PIANO_CONTAINER_METERING_PADDED,
  PIANO_CONTAINER_SLIDE_DOWN_ANIMATED,
} from './../../../shared/constants/piano';
import {
  MODAL_ROOT_ID,
  ROUTES_WITH_CUSTOM_PIANO_TRACKING,
  ROUTE_451,
  ROUTE_ALERTS,
  ROUTE_AUTHORS,
  ROUTE_BLOGS,
  ROUTE_BOOKMARKS,
  ROUTE_HOROSCOPE,
  ROUTE_LATEST,
  ROUTE_LOGOUT,
  ROUTE_PUZZLES,
  ROUTE_PUZZLES_PLAY,
  ROUTE_SEARCH,
  ROUTE_UNSUBSCRIBE_EMAIL_ALERTS,
  ROUTE_VIDEOS,
} from './constants';
import './assets/styles/_reset.legacy.css'; // include it before our own components so it doesn't override their styles
import './assets/styles/global.legacy.css';
import '@piano.legacy.css';
import styles from './styles.legacy.css';
import './assets/styles/fonts.font';

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

type AppPropsInner = WithRaschRouter;

const App: ComponentType<AppPropsInner> = ({
  data,
  lastLocation,
  page,
  loading,
  error,
}): ReactElement => {
  const { isSSR } = useSSRContext();

  if (!__TESTING__ && Object.keys(data).length === 0 && !error) {
    return <LoadingBar />;
  }

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const isPuzzleGame = lastLocation.pathname.startsWith(
    `/${ROUTE_PUZZLES_PLAY}`,
  );
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const isPuzzlePage = lastLocation.pathname.startsWith(`/${ROUTE_PUZZLES}`);

  const online = global.navigator?.onLine;
  const routeObject = data?.environment?.routeByPath?.object;
  const viafouraSubdomain = __DOT_ENV__ === 'master' ? 'www' : __DOT_ENV__;
  const viafouraURL =
    `https://${viafouraSubdomain}.schweizer-illustrierte.ch` +
    routeObject?.preferredUri;
  const isAdSuppressed =
    // @ts-ignore
    routeObject?.suppressAds ||
    // @ts-ignore
    routeObject?.channel?.suppressAds ||
    routeObject?.__typename === NATIVE_ADVERTISING_CONTENT_TYPE;

  adsSetIsAdSuppressed(isAdSuppressed);

  const isMarketingPageReducedHeader =
    routeObject?.subtypeValue === PAGE_TYPE_MARKETING;

  const isMarketingPageDefaultHeader =
    routeObject?.subtypeValue === PAGE_TYPE_MARKETING_DEFAULT_HEADER ||
    routeObject?.subtypeValue === ADVERTISING_TYPE_LONGFORM;

  const isMarketingPage =
    isMarketingPageReducedHeader || isMarketingPageDefaultHeader;

  const isFirstPage = page === 1;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'RaschRouterLocation | undefined' is not assignable to parameter of type 'RaschRouterLocation'. */
  const hasDisallowParametersInUrl = checkDisallowParameters(lastLocation);

  // @ts-ignore
  const isRobotsIndexingEnabled = routeObject?.isRobotsIndexingEnabled;

  const correctRobotsMetaTags =
    (!isFirstPage && ROBOTS_META_NOINDEX_FOLLOW) ||
    (((isMarketingPage && !isRobotsIndexingEnabled) ||
      hasDisallowParametersInUrl) &&
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
      {online && <LoadingBar />}
      <UIDReset>
        <div id={MODAL_ROOT_ID} />
        <div
          className={classNames(styles.Wrapper, {
            [styles.Hide]:
              !isSSR && global?.location?.hash.indexOf(FULLSCREEN_HASH) !== -1,
          })}
          data-testid="helmet-wrapper"
        >
          <Helmet
            htmlAttributes={htmlAttributesCopy}
            titleTemplate="%s"
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
            link={[...metaLinks, ...metaIcons]}
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
          <div className={styles.MainWrapper}>
            {/* This wrapping div below is needed so AppNexus doesn't modify P2R content */}
            <div>
              {getMobileOperatingSystem() === DEVICE_TYPE_IOS_MOBILE_TABLET &&
                isPWApp && <Pull2Refresh />}
            </div>
            {!isPuzzleGame && (
              <TestFragment data-testid="header-wrapper">
                <HeaderArea
                  isMarketingPageReducedHeader={isMarketingPageReducedHeader}
                  isPuzzlePage={isPuzzlePage}
                  /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                  subtypeValue={routeObject?.subtypeValue}
                />
                {!isAdSuppressed && !isMarketingPage && !isPuzzlePage && (
                  <HeaderAdZone />
                )}
              </TestFragment>
            )}
            <main>
              {!isSSR && location.hash.indexOf(FULLSCREEN_HASH) !== -1 && (
                <FullscreenGallery />
              )}
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
                        path={`/${ROUTE_BOOKMARKS}`}
                        element={
                          <BookmarksProfile
                            page={page}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={ROUTE_451}
                        element={<StatusPage statusCode={451} />}
                      />
                      <Route
                        path={`/${ROUTE_SEARCH}`}
                        element={
                          <Search
                            data={data}
                            page={page}
                            loading={loading}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_VIDEOS}`}
                        element={
                          <Videos
                            data={data}
                            page={page}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_LATEST}`}
                        element={
                          <Latest
                            data={data}
                            page={page}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_BLOGS}`}
                        element={
                          <Blogs
                            data={data}
                            page={page}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_HOROSCOPE}`}
                        element={
                          <Horoscope data={data} location={lastLocation} />
                        }
                      />
                      <Route
                        path="/styleguide"
                        element={
                          <Suspense fallback={<LoadingBar />}>
                            <Styleguide location={lastLocation} />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/styleguide/typography/*"
                        element={
                          <Suspense fallback={<LoadingBar />}>
                            <StyleguideTypography location={lastLocation} />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/styleguide/paragraphs/*"
                        element={
                          <Suspense fallback={<LoadingBar />}>
                            <StyleguideParagraphs location={lastLocation} />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/styleguide/buttons/*"
                        element={
                          <Suspense fallback={<LoadingBar />}>
                            <StyleguideButton location={lastLocation} />
                          </Suspense>
                        }
                      />
                      <Route
                        path={`/${ROUTE_HOROSCOPE}/tageshoroskop/:zodiacSlug`}
                        element={
                          <DailyHoroscopeDetail
                            data={data}
                            loading={loading}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_HOROSCOPE}/jahreshoroskop/:zodiacSlug`}
                        element={
                          <YearlyHoroscopeDetail
                            data={data}
                            isYearly
                            loading={loading}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_ALERTS}`}
                        element={<AlertsProfile location={lastLocation} />}
                      />
                      <Route
                        path={`/${ROUTE_UNSUBSCRIBE_EMAIL_ALERTS}`}
                        element={<AlertsUnsubscribe location={lastLocation} />}
                      />
                      <Route
                        path={`/${ROUTE_LOGOUT}`}
                        element={<Logout location={lastLocation} />}
                      />
                      <Route
                        path={`/${ROUTE_UNSUBSCRIBE_EMAIL_ALERTS}/:oneSignalExternalId`}
                        element={<AlertsUnsubscribe location={lastLocation} />}
                      />
                      {/* Picks up /raetselecke/abo & /hilfe before PuzzleList does */}
                      <Route
                        path={`/${ROUTE_PUZZLES}/abo`}
                        element={
                          <Router
                            data={data}
                            error={error}
                            page={page}
                            loading={loading}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_PUZZLES}/hilfe`}
                        element={
                          <Router
                            data={data}
                            page={page}
                            loading={loading}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_PUZZLES}/faq`}
                        element={
                          <Router
                            data={data}
                            page={page}
                            loading={loading}
                            location={lastLocation}
                          />
                        }
                      />
                      <Route
                        path={`/${ROUTE_PUZZLES_PLAY}/:puzzle/:date`}
                        element={<PuzzlesDetail location={lastLocation} />}
                      />
                      <Route
                        path={`/${ROUTE_PUZZLES}/:puzzle`}
                        element={
                          <PuzzlesList page={page} location={lastLocation} />
                        }
                      />
                      <Route
                        path={`/${ROUTE_PUZZLES}`}
                        element={
                          <PuzzlesOverview
                            page={page}
                            location={lastLocation}
                          />
                        }
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
          </div>
        </div>
        <div
          data-testid="footer-wrapper"
          className={classNames({
            [styles.Hide]:
              !isSSR && global?.location?.hash.indexOf(FULLSCREEN_HASH) !== -1,
          })}
        >
          {!isPuzzleGame && (
            <Footer
              isMarketingPageReducedHeader={isMarketingPageReducedHeader}
            />
          )}
          <div id="piano-wrapper">
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
          <div className={styles.PianoAnimatedWrapper}>
            <div
              id={PIANO_CONTAINER_ANIMATED}
              className={styles.PianoAnimated}
            ></div>
          </div>
        </div>
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

const withBranch = branch<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props) =>
    !ROUTES_WITH_CUSTOM_PIANO_TRACKING.includes(
      props.lastLocation?.pathname?.substr(1),
    ),
  withPianoTrackingData,
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const AppFinal = (props) => (
  <StrictMode>
    <App {...props} />
  </StrictMode>
);

export default compose<any, any>(
  withRaschRouter,
  withUpdatePolicy,
  withSettingsStateHandler,
  withBranch,
)(memo(AppFinal));
