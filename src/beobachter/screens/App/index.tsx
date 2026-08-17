// /**
//  * @TODO.
//  *
//  * 1. Remove all event listener setup stuff from app/entry/client and app/entry/server
//  *    and re-add those as HoCs.
//  */

// import-sort-ignore
import './assets/styles/fonts.font';
import './assets/styles/reset.legacy.css'; // include it before our own components so it doesn't override their styles.
import '@piano.legacy.css';

import React, {
  ComponentType,
  memo,
  Suspense,
  lazy,
  useEffect,
  useRef,
} from 'react';
import { Helmet } from 'react-helmet-async';
import { UIDReset } from 'react-uid';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import Account from './screens/Account';
import {
  DEVICE_TYPE_IOS_MOBILE_TABLET,
  getMobileOperatingSystem,
  isPWApp,
} from '../../../shared/helpers/utils';
import {
  htmlAttributes,
  metaData,
  metaIcons,
} from '../../shared/helpers/metaData';
import withPianoTrackingData from '../../../shared/decorators/withPianoTrackingData';
import withRaschRouter from '../../shared/decorators/withRaschRouter';
import StrictMode from '../../../common/components/StrictMode';
import { useSSRContext } from '../../../common/components/SSRContext';
import ViewGridLayout from '../../../common/components/ViewGridLayout';
import Logout from '../../../common/screens/Logout';
import TestFragment from '../../../shared/tests/components/TestFragment';
import Footer from './components/Footer';
import Header from './components/Header';
import HeaderAdZone from './components/HeaderAdZone';
import RasHelmet from './components/Helmet';
import AlertsProfile from './screens/AlertsProfile';
import AlertsUnsubscribe from './screens/AlertsUnsubscribe';
import BrandReport from './screens/Sponsor/components/BrandReport';
import BookmarksProfile from './screens/BookmarksProfile';
import Keywords from './screens/Keywords';
import LegalDictionary from './screens/LegalDictionary';
import Loading from './components/Loading';
import Pull2Refresh from './components/Pull2Refresh';
import Router from './components/Router';
import { useBreadcrumbsData } from '../../../shared/hooks/useBreadcrumbsData';
import FullscreenGallery from './components/FullscreenGallery';
import Authors from './screens/Authors';
import ShopCheckoutSuccess from './screens/Shop/components/Checkout/components/Success';
import ShopCheckoutError from './screens/Shop/components/Checkout/components/Error';
import Search from './screens/Search';
import Offline from './screens/Offline';
import StatusPage from './screens/StatusPage';
import { checkDisallowParameters } from '../../../shared/helpers/withHelmet';
import { adsSetIsAdSuppressed } from '../../../shared/helpers/ads';
import {
  ContentTypeUnion,
  RaschRouter,
  WithRaschRouter,
} from '../../../shared/@types/gql';
import Latest from './screens/Latest';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import Navigation from './components/Navigation';
import BottomBar from './components/BottomBar';
import {
  MARKETING_PAGE,
  MARKETING_PAGE_DEFAULT_HEADER,
  setVertical,
} from '../../shared/actions/route';
import UserProfile from './screens/UserProfile';
import { BOTTOM_BAR_PADDING_CLASS } from './components/BottomBar/constants';
import {
  ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
  ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
  ROBOTS_META_NOINDEX_FOLLOW,
  ROBOTS_META_NOINDEX,
  ROBOTS_META_NOODP,
  ROBOTS_META_NOARCHIVE,
} from '../../../shared/constants/structuredData';
import {
  PIANO_CONTAINER_ANIMATED,
  PIANO_CONTAINER_ANIMATED_WRAPPER,
  PIANO_CONTAINER_LOCKED,
  PIANO_CONTAINER_METERING,
  PIANO_CONTAINER_METERING_NO_SHADOW,
  PIANO_CONTAINER_METERING_PADDED,
  PIANO_CONTAINER_SLIDE_DOWN_ANIMATED,
} from '../../../shared/constants/piano';
import {
  MAIN_CONTENT_ID,
  MODAL_ROOT_ID,
  ROUTES_WITH_CUSTOM_PIANO_TRACKING,
  ROUTE_451,
  ROUTE_ACCOUNT,
  ROUTE_ALERTS,
  ROUTE_AUTHORS,
  ROUTE_BOOKMARKS,
  ROUTE_BRAND_REPORT,
  ROUTE_KEYWORDS,
  ROUTE_KEYWORDS_SEARCH,
  ROUTE_LATEST,
  ROUTE_LEGAL_DICTIONARY,
  ROUTE_LEGAL_DICTIONARY_CHAR,
  ROUTE_LOGOUT,
  ROUTE_SEARCH,
  ROUTE_STYLEGUIDE,
  ROUTE_STYLEGUIDE_PARAGRAPHS,
  ROUTE_STYLEGUIDE_TYPOGRAPHY,
  ROUTE_UNSUBSCRIBE_EMAIL_ALERTS,
  ROUTE_UNSUBSCRIBE_EMAIL_ALERTS_ONESIGNAL,
  ROUTE_PROFILE,
  ROUTE_LEGAL_ADVICE,
  ROUTE_FILTER_SEARCH,
  AIAICHAT_KEY,
  AIAICHAT_KEY_SCHLAF,
  CHATBOT_SCHLAF_ROUTES,
} from './constants';
import {
  ADVERTISING_TYPE_LONGFORM,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_GUIDE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_TYPE_MARKETING,
  PAGE_TYPE_MARKETING_DEFAULT_HEADER,
} from '../../../shared/constants/content';
import { TRACKING_CLASS_SITE_HEADER } from '../../../shared/constants/tracking';
import { FULLSCREEN_HASH } from '../../../shared/constants/fullscreen';
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
const StyleguideTypography = lazy(
  () =>
    import(
      /* webpackChunkName: "StyleguideTypography" */ './screens/Styleguide/screens/Typography'
    ),
);
const StyleguideButton = lazy(
  () =>
    import(
      /* webpackChunkName: "StyleguideButton" */ './screens/Styleguide/screens/Buttons'
    ),
);
const StyleguideTeaser = lazy(
  () =>
    import(
      /* webpackChunkName: "StyleguideTeaser" */ './screens/Styleguide/screens/Teasers'
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

// INFO: Make sure your static screen uses the withPianoTrackingData HoC!

const App: ComponentType<AppPropsInner> = ({
  data,
  lastLocation,
  page,
  loading,
  error,
}) => {
  const online = global.navigator?.onLine;
  const { isSSR } = useSSRContext();
  const dispatch = useDispatch();

  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  useBreadcrumbsData(data?.breadcrumbsData);

  const pathname = lastLocation?.pathname ?? global.location?.pathname ?? '';
  const isChatbotPrototypSchlaf = CHATBOT_SCHLAF_ROUTES.some(
    (route) => pathname === `/${route}`,
  );
  const wasOnSchlafRouteRef = useRef(false);

  useEffect(() => {
    if (__TESTING__ || typeof window === 'undefined') return;

    const changeChatbotKey = async (key: string) => {
      const scriptEl = document.querySelector<HTMLScriptElement>(
        'script[src*="aiaibot.com/bootstrap"]',
      );

      await Promise.resolve()
        .then(() => {
          if (scriptEl) {
            scriptEl.dataset.aiaibotKey = key;
          }
        })
        .then(() =>
          typeof window.aiaibot?.teardown === 'function'
            ? window.aiaibot.teardown()
            : undefined,
        )
        .then(() =>
          typeof window.aiaibot?.bootstrap === 'function'
            ? window.aiaibot.bootstrap()
            : undefined,
        );
    };

    const run = async () => {
      if (isChatbotPrototypSchlaf) {
        wasOnSchlafRouteRef.current = true;
        await changeChatbotKey(AIAICHAT_KEY_SCHLAF);
      } else if (wasOnSchlafRouteRef.current && AIAICHAT_KEY) {
        wasOnSchlafRouteRef.current = false;
        await changeChatbotKey(AIAICHAT_KEY);
      }
    };

    void run();
  }, [isChatbotPrototypSchlaf]);

  if (!__TESTING__ && Object.keys(data).length === 0 && !error) {
    return <Loading />;
  }

  /* @ts-ignore TODO: TS2322 ->  Type '(NodeInterface & { __typename? */
  const routeByPath: RaschRouter = data?.environment?.routeByPath || null;
  /* @ts-ignore TODO: TS2322 ->  Type 'Partial<ContentTypeUnion> | undefined' is not assignable to type 'RouteObject'. */
  const routeObject: RouteObject & {
    toolType?: string;
  } = routeByPath?.object;
  const viafouraSubdomain = __DOT_ENV__ === 'master' ? 'www' : __DOT_ENV__;
  const viafouraURL =
    `https://${viafouraSubdomain}.beobachter.ch` + routeObject?.preferredUri;
  const subtypeValue = routeObject?.subtypeValue || '';
  const isMarketingPage = [
    PAGE_TYPE_MARKETING,
    PAGE_TYPE_MARKETING_DEFAULT_HEADER,
    ADVERTISING_TYPE_LONGFORM,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  ].includes(routeObject?.subtypeValue);

  const isLegalAdvice =
    (global.location?.pathname?.startsWith('/' + ROUTE_LEGAL_ADVICE) &&
      !!data.legalAdvice) ||
    routeObject?.publication === 'guider';

  const isLegalAdviceIndexable =
    isLegalAdvice &&
    ['1002', '3', '1001'].includes(routeObject?.toolType as string);

  const isAdSuppressed =
    // @ts-ignore
    routeObject?.suppressAds ||
    // @ts-ignore
    routeObject?.channel?.suppressAds ||
    routeObject?.__typename === NATIVE_ADVERTISING_CONTENT_TYPE ||
    isMarketingPage ||
    // @ts-ignore
    routeObject?.subtypeValue === ARTICLE_TYPE_GUIDE;

  adsSetIsAdSuppressed(isAdSuppressed);

  const isFirstPage = page === 1;

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'RaschRouterLocation | undefined' is not assignable to parameter of type 'RaschRouterLocation'. */
  const hasDisallowParametersInUrl = checkDisallowParameters(lastLocation);

  // @ts-ignore
  const isRobotsIndexingEnabled = routeObject?.isRobotsIndexingEnabled;

  const correctRobotsMetaTags =
    (!isFirstPage && !isLegalAdvice && ROBOTS_META_NOINDEX_FOLLOW) ||
    (((isMarketingPage && !isRobotsIndexingEnabled) ||
      hasDisallowParametersInUrl ||
      isHybridApp) &&
      ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE) ||
    (isLegalAdvice &&
      !isLegalAdviceIndexable &&
      `${ROBOTS_META_NOINDEX},nofollow,${ROBOTS_META_NOODP},${ROBOTS_META_NOARCHIVE}`) ||
    ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE;

  const isInArticle = [
    ARTICLE_CONTENT_TYPE,
    NATIVE_ADVERTISING_CONTENT_TYPE,
    EXPLAINING_ARTICLE_CONTENT_TYPE,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  ].includes(routeObject?.__typename);

  let htmlAttributesCopy = { ...htmlAttributes };

  // for cms preview we need to add smooth scroll behavior
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (global?.__GRAPHQL_HOST__?.includes('preview')) {
    htmlAttributesCopy = {
      ...htmlAttributesCopy,
      style: 'scroll-behavior: smooth',
    };
  }

  // updates the vertical value in the route state to marketing_page
  // this is important because we don't want to render ads on these pages
  switch (subtypeValue) {
    case PAGE_TYPE_MARKETING:
      dispatch(setVertical(MARKETING_PAGE));
      break;

    case ADVERTISING_TYPE_LONGFORM:
    case PAGE_TYPE_MARKETING_DEFAULT_HEADER:
      dispatch(setVertical(MARKETING_PAGE_DEFAULT_HEADER));
      break;
  }

  return (
    <>
      <div>{online && <Loading />}</div>
      <UIDReset>
        <div id={MODAL_ROOT_ID} />
        <div className={`app ${styles.App}`}>
          <RasHelmet
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
            link={metaIcons}
          />
          <Helmet>
            <script
              id="aiaibotScript"
              src="https://chat.aiaibot.com/bootstrap.js?version=2"
              data-aiaibot-key={
                isChatbotPrototypSchlaf ? AIAICHAT_KEY_SCHLAF : AIAICHAT_KEY
              }
              type="text/javascript"
              async
              defer
            />
            {__VIAFOURA_DATE__ && (
              <script
                src="https://cdn.viafoura.net/entry/index.js"
                type="text/javascript"
                async
                defer
              />
            )}
            {__CENTINEL_ANALYTICA_SITE_KEY__ && (
              <script
                src={`https://collector.centinelanalytica.com/script.js?site_key=${__CENTINEL_ANALYTICA_SITE_KEY__}`}
                type="text/javascript"
                async
                defer
              />
            )}
          </Helmet>
          {/* This wrapping div below is needed so AppNexus doesn't modify P2R content */}
          <div>
            {getMobileOperatingSystem() === DEVICE_TYPE_IOS_MOBILE_TABLET &&
              isPWApp && <Pull2Refresh />}
          </div>
          <div className={TRACKING_CLASS_SITE_HEADER}>
            {isHybridApp ? (
              <Navigation isInApp isInArticle={isInArticle} />
            ) : (
              <Header
                subtypeValue={subtypeValue}
                hasStickiness
                isInArticle={isInArticle}
              />
            )}
          </div>
          {!isAdSuppressed && <HeaderAdZone isInArticle={isInArticle} />}
          <main id={MAIN_CONTENT_ID}>
            {!isSSR &&
              global.location?.hash?.indexOf(FULLSCREEN_HASH) !== -1 && (
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
                      path={ROUTE_STYLEGUIDE}
                      element={
                        <Suspense fallback={<Loading />}>
                          <Styleguide location={lastLocation} />
                        </Suspense>
                      }
                    />
                    <Route
                      path={ROUTE_STYLEGUIDE_PARAGRAPHS}
                      element={
                        <Suspense fallback={<Loading />}>
                          <StyleguideParagraphs location={lastLocation} />
                        </Suspense>
                      }
                    />
                    <Route
                      path={ROUTE_STYLEGUIDE_TYPOGRAPHY}
                      element={
                        <Suspense fallback={<Loading />}>
                          <StyleguideTypography location={lastLocation} />
                        </Suspense>
                      }
                    />
                    <Route
                      path={'styleguide/buttons/*'}
                      element={
                        <Suspense fallback={<Loading />}>
                          <StyleguideButton location={lastLocation} />
                        </Suspense>
                      }
                    />
                    <Route
                      path={'styleguide/teasers/*'}
                      element={
                        <Suspense fallback={<Loading />}>
                          <StyleguideTeaser location={lastLocation} />
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
                      path={ROUTE_LEGAL_DICTIONARY}
                      element={
                        <LegalDictionary
                          data={data}
                          location={lastLocation}
                          loading={loading}
                        />
                      }
                    />
                    <Route
                      path={ROUTE_LEGAL_DICTIONARY_CHAR}
                      element={
                        <LegalDictionary
                          data={data}
                          location={lastLocation}
                          loading={loading}
                        />
                      }
                    />
                    <Route
                      path={ROUTE_SEARCH}
                      element={
                        <Search data={data} page={page} loading={loading} />
                      }
                    />
                    <Route
                      path={ROUTE_FILTER_SEARCH}
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
                      path={ROUTE_BRAND_REPORT}
                      element={
                        <BrandReport
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
                      path={ROUTE_ACCOUNT}
                      element={<Account location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_LOGOUT}
                      element={<Logout location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_BOOKMARKS}
                      element={
                        <BookmarksProfile page={page} location={lastLocation} />
                      }
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
                      path={ROUTE_UNSUBSCRIBE_EMAIL_ALERTS_ONESIGNAL}
                      element={<AlertsUnsubscribe location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_PROFILE}
                      element={<UserProfile location={lastLocation} />}
                    />
                    <Route
                      path={ROUTE_AUTHORS}
                      element={
                        <Authors
                          data={data}
                          // @ts-ignore
                          loading={loading}
                          location={lastLocation}
                        />
                      }
                    />
                    <Route
                      path={ROUTE_451}
                      element={<StatusPage statusCode={451} />}
                    />
                    <Route
                      path={'/checkout/success'}
                      element={<ShopCheckoutSuccess location={lastLocation} />}
                    />
                    <Route
                      path={'/checkout/error'}
                      element={<ShopCheckoutError location={lastLocation} />}
                    />

                    <Route
                      path={'/*'}
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
                  </Routes>
                )}
              </>
            )}
          </main>
          {!isHybridApp && (
            <Footer
              // @ts-ignore
              subtypeValue={routeObject?.subtypeValue}
            />
          )}
          <BottomBar />
          <div id="piano-wrapper" className={styles.PianoWrapper}>
            <div
              id={PIANO_CONTAINER_METERING}
              className={classNames(
                styles.PianoMetering,
                BOTTOM_BAR_PADDING_CLASS,
              )}
            />
            <div
              id={PIANO_CONTAINER_METERING_NO_SHADOW}
              className={classNames(
                styles.PianoMeteringNoShadow,
                BOTTOM_BAR_PADDING_CLASS,
              )}
            />
            <div
              id={PIANO_CONTAINER_LOCKED}
              className={classNames(
                styles.PianoLocked,
                BOTTOM_BAR_PADDING_CLASS,
              )}
            />
            <div
              id={PIANO_CONTAINER_METERING_PADDED}
              className={classNames(
                styles.PianoMeteringPadded,
                BOTTOM_BAR_PADDING_CLASS,
              )}
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
    </>
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
