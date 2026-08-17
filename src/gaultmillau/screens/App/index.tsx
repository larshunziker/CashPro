/**
 * @TODO
 *
 * 1. Remove all event listener setup stuff from app/entry/client and app/entry/server
 *    and re-add those as HoCs
 */

// import-sort-ignore
import './assets/styles/fonts.font';
import './assets/styles/reset.legacy.css'; // include it before our own components so it doesn't override their styles

import React, {
  ComponentType,
  ReactElement,
  memo,
  Suspense,
  lazy,
} from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { UIDReset } from 'react-uid';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import { Routes, Route } from 'react-router-dom';
import classNames from 'classnames';
import { checkDisallowParameters } from '../../../shared/helpers/withHelmet';
import {
  htmlAttributes,
  metaData,
  metaIcons,
} from './../../shared/helpers/metaData';
import settingsStateSelector from './../../shared/selectors/settingsStateSelector';
import withPianoTrackingData from '../../../shared/decorators/withPianoTrackingData';
import withRaschRouter from '../../shared/decorators/withRaschRouter';
import languageFlow from './../../shared/decorators/languageFlow';
import StrictMode from '../../../common/components/StrictMode';
import ViewGridLayout from '../../../common/components/ViewGridLayout';
import TestFragment from './../../../shared/tests/components/TestFragment';
import Footer from './components/Footer';
import HeaderArea from './components/HeaderArea';
import Helmet from './components/Helmet';
import Loading from './components/Loading';
import Router from './components/Router';
import BlogA from './screens/BlogA';
import BlogB from './screens/BlogB';
import HotTen from './screens/HotTen';
import Keywords from './screens/Keywords';
import Offline from './screens/Offline';
import Partners from './screens/Partners';
import PersonList from './screens/Person/screens/PersonList';
import AmexRestaurants from './screens/AmexRestaurants';
import PopRestaurants from './screens/PopRestaurants';
import Restaurants from './screens/Restaurants';
import RestaurantsMap from './screens/RestaurantsMap';
import RestaurantsSearch from './screens/RestaurantsSearch';
import Search from './screens/Search';
import Person from './screens/Person';
import Recipes from './screens/Recipes';
import Videos from './screens/Videos';
import messages from '../../i18n/translations/messages.json';
import { useSSRContext } from '../../../common/components/SSRContext';
import StatusPage from './screens/StatusPage';
import { WithRaschRouter } from '../../../shared/@types/gql';
import Authors from './screens/Authors';
import {
  ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
  ROBOTS_META_NOINDEX_FOLLOW,
  ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
} from '../../../shared/constants/structuredData';
import {
  MAIN_CONTENT_ID,
  ROUTE_AUTHORS,
  ROUTE_AUTHORS_FR,
  ROUTE_HOT_TEN,
  ROUTE_PARTNERS_DE,
  ROUTE_PARTNERS_FR,
  URL_DE_AMEX_RESTAURANTS,
} from '../App/constants';
import { TRACKING_CLASS_SITE_HEADER } from './../../../shared/constants/tracking';
import {
  DEFAULT_PERSON_HOME_DE,
  DEFAULT_PERSON_HOME_FR,
  URL_DE_RECIPES,
  URL_FR_RECIPES,
  URL_DE_VIDEOS,
  URL_FR_VIDEOS,
  MODAL_ROOT_ID,
  ROUTES_WITH_CUSTOM_PIANO_TRACKING,
  URL_DE_KEYWORD,
  URL_DE_MAP,
  URL_DE_POP_RESTAURANTS,
  URL_DE_RESTAURANTS,
  URL_DE_RESTAURANTS_SEARCH,
  URL_DE_SEARCH,
  URL_FR_KEYWORD,
  URL_FR_MAP,
  URL_FR_POP_RESTAURANTS,
  URL_FR_RESTAURANTS,
  URL_FR_RESTAURANTS_SEARCH,
  URL_FR_SEARCH,
  BLOG_DATA,
} from './constants';
import { PAGE_TYPE_MARKETING } from '../../../shared/constants/content';
import {
  PIANO_CONTAINER_ANIMATED,
  PIANO_CONTAINER_LOCKED,
  PIANO_CONTAINER_METERING,
  PIANO_CONTAINER_METERING_PADDED,
  PIANO_CONTAINER_SLIDE_DOWN_ANIMATED,
} from './../../../shared/constants/piano';
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
    language: string;
  };

const App: ComponentType<AppPropsInner> = ({
  language,
  data,
  lastLocation,
  page,
  loading,
  error,
}): ReactElement => {
  const online = global.navigator?.onLine;
  const { isSSR } = useSSRContext();

  if (!__TESTING__ && Object.keys(data).length === 0 && !error) {
    return <Loading />;
  }
  /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
  const isRestaurantsMap: boolean =
    lastLocation &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    (lastLocation.pathname.startsWith(`/${URL_DE_MAP}`) ||
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      lastLocation.pathname.startsWith(`/${URL_FR_MAP}`));

  htmlAttributes.lang = language + '-CH';
  const isHome =
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    lastLocation.pathname === '/' || lastLocation.pathname === '/fr';
  const routeObject = data?.environment?.routeByPath?.object;
  const isMarketingPage = routeObject?.subtypeValue === PAGE_TYPE_MARKETING;
  const isFirstPage = page === 1;

  const isStageEnvironment =
    __CLIENT__ && window.location.origin.includes('stage');
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const isFr = lastLocation.pathname.includes('fr');
  const correctLanguagePathName = isFr ? 'restaurants_fr' : 'restaurants';
  const correctEnvironmentPathName = isStageEnvironment ? 'stage' : 'www';
  const restaurantsApiUrl = `https://${correctEnvironmentPathName}.gaultmillau.ch/sites/default/files/${correctLanguagePathName}.json`;
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
    <>
      <UIDReset>
        <div id={MODAL_ROOT_ID} />
        <IntlProvider
          defaultLocale="de"
          locale={language}
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ fr */
          messages={messages[language] || {}}
          key={language}
        >
          <div className={classNames('app', styles.App)}>
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
                  property: 'og:locale',
                  content: language === 'fr' ? 'fr_CH' : 'de_CH',
                },
                {
                  name: 'robots',
                  content: correctRobotsMetaTags,
                },
                ...metaData,
              ]}
              link={metaIcons}
            />

            {online && <Loading />}

            <BodyClassName className={styles.BodyClass}>
              <div
                className={classNames(TRACKING_CLASS_SITE_HEADER, {
                  [styles.PageWrap]: !isRestaurantsMap,
                })}
              >
                <HeaderArea isHome={isHome} />

                <main id={MAIN_CONTENT_ID}>
                  {!isSSR && !online ? (
                    <TestFragment data-testid="offline-wrapper">
                      <Offline />
                    </TestFragment>
                  ) : (
                    <>
                      {(error && <StatusPage statusCode={500} />) || (
                        /* @ts-ignore TODO: TS2322 ->  Type 'RaschRouterLocation | undefined' is not assignable to type 'string | Partial<Location> | undefined'. */
                        <Routes location={lastLocation}>
                          <Route
                            path={ROUTE_HOT_TEN}
                            element={
                              <HotTen
                                data={data}
                                page={page}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_AMEX_RESTAURANTS}`}
                            element={
                              <AmexRestaurants
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_AMEX_RESTAURANTS}/:province`}
                            element={
                              <AmexRestaurants
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_POP_RESTAURANTS}`}
                            element={
                              <PopRestaurants
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_POP_RESTAURANTS}/:popCity`}
                            element={
                              <PopRestaurants
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_POP_RESTAURANTS}`}
                            element={
                              <PopRestaurants
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_POP_RESTAURANTS}/:popCity`}
                            element={
                              <PopRestaurants
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_RECIPES}`}
                            element={
                              <Recipes
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_RECIPES}`}
                            element={
                              <Recipes
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />

                          <Route
                            path={`/${URL_DE_RECIPES}/kategorie/:recipeCategory`}
                            element={
                              <Recipes
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_RECIPES}/categorie/:recipeCategory`}
                            element={
                              <Recipes
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_RESTAURANTS}`}
                            element={
                              <Restaurants
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_RESTAURANTS}`}
                            element={
                              <Restaurants
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_RESTAURANTS_SEARCH}/:query`}
                            element={
                              <RestaurantsSearch
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_RESTAURANTS_SEARCH}/:query`}
                            element={
                              <RestaurantsSearch
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${DEFAULT_PERSON_HOME_FR}`}
                            element={
                              <Person
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${DEFAULT_PERSON_HOME_DE}`}
                            element={
                              <Person
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${DEFAULT_PERSON_HOME_DE}/list/:char`}
                            element={
                              <PersonList
                                data={data}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${DEFAULT_PERSON_HOME_FR}/list/:char`}
                            element={
                              <PersonList
                                data={data}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_SEARCH}/:query`}
                            element={
                              <Search
                                data={data}
                                page={page}
                                loading={loading}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_SEARCH}/:query`}
                            element={
                              <Search
                                data={data}
                                page={page}
                                loading={loading}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path="styleguide"
                            element={
                              <Suspense fallback={<Loading />}>
                                <Styleguide />
                              </Suspense>
                            }
                          />
                          <Route
                            path="styleguide/paragraphs"
                            element={
                              <Suspense fallback={<Loading />}>
                                <StyleguideParagraphs />
                              </Suspense>
                            }
                          />
                          <Route
                            path="styleguide/typography/*"
                            element={
                              <Suspense fallback={<Loading />}>
                                <StyleguideTypography />
                              </Suspense>
                            }
                          />
                          <Route
                            path="styleguide/buttons/*"
                            element={
                              <Suspense fallback={<Loading />}>
                                <StyleguideButton />
                              </Suspense>
                            }
                          />
                          <Route
                            path={`/${URL_FR_MAP}`}
                            element={
                              <RestaurantsMap
                                restaurantsApiUrl={restaurantsApiUrl}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_MAP}/:query`}
                            element={
                              <RestaurantsMap
                                restaurantsApiUrl={restaurantsApiUrl}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_MAP}`}
                            element={
                              <RestaurantsMap
                                restaurantsApiUrl={restaurantsApiUrl}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_MAP}/:query`}
                            element={
                              <RestaurantsMap
                                restaurantsApiUrl={restaurantsApiUrl}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_VIDEOS}`}
                            element={
                              <Videos
                                data={data}
                                page={page}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_VIDEOS}`}
                            element={
                              <Videos
                                data={data}
                                page={page}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${BLOG_DATA['blog_a_fr'].url}`}
                            element={
                              <BlogA
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${BLOG_DATA['blog_a_de'].url}`}
                            element={
                              <BlogA
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${BLOG_DATA['blog_b_fr'].url}`}
                            element={
                              <BlogB
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${BLOG_DATA['blog_b_de'].url}`}
                            element={
                              <BlogB
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${ROUTE_PARTNERS_FR}`}
                            element={
                              <Partners
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${ROUTE_PARTNERS_DE}`}
                            element={
                              <Partners
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_KEYWORD}`}
                            element={
                              <Keywords
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_FR_KEYWORD}/:searchString`}
                            element={
                              <Keywords
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_KEYWORD}`}
                            element={
                              <Keywords
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={`/${URL_DE_KEYWORD}/:searchString`}
                            element={
                              <Keywords
                                data={data}
                                page={page}
                                language={language}
                                location={lastLocation}
                              />
                            }
                          />
                          <Route
                            path={ROUTE_AUTHORS}
                            element={
                              <Authors
                                data={data}
                                language={language}
                                loading={loading}
                              />
                            }
                          />
                          <Route
                            path={ROUTE_AUTHORS_FR}
                            element={
                              <Authors
                                data={data}
                                language={language}
                                loading={loading}
                              />
                            }
                          />
                          <Route
                            path="/*"
                            element={
                              <Router
                                data={data}
                                error={error}
                                page={page}
                                loading={loading}
                                language={language}
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
            </BodyClassName>

            {!isRestaurantsMap && <Footer />}
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
            <div className={styles.PianoAnimatedWrapper}>
              <div
                id={PIANO_CONTAINER_ANIMATED}
                className={styles.PianoAnimated}
              ></div>
            </div>
          </div>
        </IntlProvider>
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

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  language: settingsStateSelector(state).language,
});

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
  connect(mapStateToProps),
  withRaschRouter,
  languageFlow,
  withUpdatePolicy,
  withBranch,
)(memo(AppFinal));
