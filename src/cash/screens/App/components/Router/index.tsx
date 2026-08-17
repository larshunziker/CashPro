import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchingTouchIcon } from '../../../../../shared/helpers/getMatchingTouchIcon';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import Redirect from '../../../../../common/components/Redirect';
import ArticlePage from '../../screens/ArticlePage';
import Author from '../../screens/Author';
import ExplainingArticle from '../../screens/ExplainingArticle';
import LandingPage from '../../screens/LandingPage';
import PageScreen from '../../screens/PageScreen';
import Sponsor from '../../screens/Sponsor';
import StatusSubpage from '../../screens/StatusPage/components/StatusSubpage';
import Video from '../../screens/Video';
import Error from '../Error';
import StatusPage from './../../screens/StatusPage';
import {
  ADVERTISING_TYPE_LONGFORM,
  ARTICLE_CONTENT_TYPE,
  AUTHOR_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
  SPONSOR_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import {
  CASH_MENU_PREFIX,
  FULLQUOTE_HYBRID_SEMI_STATIC_PREFIX,
  FULLQUOTE_SEMI_STATIC_PREFIX,
  ROUTE_HOME,
  ROUTE_HOME_HYBRID,
} from '../../../App/constants';
import {
  ARTICLE_PAGE_DEFAULT,
  ARTICLE_PAGE_SWIPEABLE,
} from '../../screens/ArticlePage/constants';
import appleTouchIcon120 from '../../assets/graphics/favicon/apple-touch-icon-120x120.png';
import appleTouchIcon152 from '../../assets/graphics/favicon/apple-touch-icon-152x152.png';
import appleTouchIcon180 from '../../assets/graphics/favicon/apple-touch-icon-180x180.png';
import favicon from '../../assets/graphics/favicon/favicon.ico';
import { StatusCode } from '../../../../../common/screens/StatusPage/typings';
import { RasRouterProps } from './typings';

type RouterPropsInner = RasRouterProps;

// @ts-ignore
const Router = ({ data, location, page, loading, error }: RouterPropsInner) => {
  const dispatch = useDispatch();
  const routeByPath: any =
    (data && data?.environment && data?.environment?.routeByPath) || null;
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  // handle soft 301 for apple-touch-icons (https://getoutofmyhead.dev/apple-touch-icons)
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  if (/apple-touch-icon/.test(location?.pathname)) {
    const iconSizes = {
      '57x57': appleTouchIcon120,
      '114x114': appleTouchIcon120,
      '120x120': appleTouchIcon120,
      '144x144': appleTouchIcon152,
      '152x152': appleTouchIcon152,
      '167x167': appleTouchIcon180,
      '180x180': appleTouchIcon180,
    };

    const touchIcon = getMatchingTouchIcon(iconSizes, location);

    if (__SERVER__) {
      dispatch(setStatusCode(301, touchIcon));
      return null;
    }
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    global.history.replaceState({}, '', touchIcon + location.search);
  }

  // As webpack is hashing files on prod - and we need to create a pointing from /favicon.ico to the proper location in static/media/.. we've decided to handle that
  // case directly in the router as a pointing in the proxy.redirect file is not working
  if (location?.pathname === '/favicon.ico') {
    if (__SERVER__) {
      dispatch(setStatusCode(301, favicon));
      return null;
    }
    global.history.replaceState({}, '', favicon + location.search);
  }

  // if we call /_/api/authentication on client we should do a redirect to the auth service using nginx
  // atm it's used in our apps because we need to be backwards compatible with the old auth service
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  if (__CLIENT__ && location?.pathname.indexOf(__AUTH_SERVICE_URL__) > -1) {
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    global.location.href = location?.href;
    return null;
  }

  if (error) {
    return <StatusPage statusCode={503} logMessage={error} />;
  }

  const statusCode: StatusCode = (routeByPath?.statusCode as StatusCode) || 404;

  if (location?.hash === '#chart__comparision' && __CLIENT__) {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const newPath = location.href.replace('#chart__comparision', '/chart');
    global.history.replaceState({}, '', newPath);
    return <Redirect to={newPath} />;
  }

  // handle 404
  if (!routeByPath || !routeByPath.preferred) {
    return loading || data?.isStatic ? null : (
      <StatusPage statusCode={statusCode}>
        {/* @ts-ignore TODO: TS2322 ->  Type '({ statusCode } */}
        {({ statusCode }) => {
          if (statusCode === 404) {
            return <StatusSubpage statusCode={statusCode} />;
          }
          return null;
        }}
      </StatusPage>
    );
  }

  // following routes are used as semi-static pages and should not be rendered as react components from router
  if (
    routeByPath.preferred.startsWith(`/${FULLQUOTE_SEMI_STATIC_PREFIX}`) ||
    routeByPath.preferred.startsWith(
      `/${FULLQUOTE_HYBRID_SEMI_STATIC_PREFIX}`,
    ) ||
    routeByPath.preferred.startsWith(`/${CASH_MENU_PREFIX}`)
  ) {
    return <StatusPage statusCode={404} />;
  }

  // handle soft 301
  if (location?.pathname) {
    const currentPathName = location.pathname;
    let preferredPathName = routeByPath.preferred || null;

    // hardcoded redirect from '/home' to the main page
    if (
      currentPathName === `/${ROUTE_HOME}`
      // TODO: Do we need to redirect from /hybrid-news/top-news to / too?
      // currentPathName === `/${ROUTE_HOME_HYBRID}`
    ) {
      preferredPathName = '/';
    }

    if (
      preferredPathName &&
      currentPathName !== preferredPathName &&
      preferredPathName !== `/${ROUTE_HOME}` &&
      preferredPathName !== `/${ROUTE_HOME_HYBRID}` &&
      currentPathName !== '/'
    ) {
      if (__SERVER__) {
        dispatch(setStatusCode(301, preferredPathName));
        return null;
      }
      // check extern redirect
      if (
        preferredPathName.indexOf('http://') === 0 ||
        preferredPathName.indexOf('https://') === 0
      ) {
        global.location.href = preferredPathName;
        return null;
      }

      if (page && page !== 1) {
        location.search =
          location?.search?.includes('?') &&
          !location?.search?.includes('page=')
            ? location?.search
            : `?page=${page}`;
      }

      const redirectTo = preferredPathName + location.search + location.hash;

      global.history.replaceState({}, '', redirectTo);
      return <Redirect to={redirectTo} />;
    }
  }

  // switch components
  switch (routeByPath.object.__typename) {
    case ARTICLE_CONTENT_TYPE:
    case NATIVE_ADVERTISING_CONTENT_TYPE: {
      if (routeByPath.object?.subtypeValue === ADVERTISING_TYPE_LONGFORM) {
        return (
          <PageScreen
            pageScreen={routeByPath.object}
            page={page}
            location={location}
          />
        );
      }
      return (
        <ArticlePage
          article={routeByPath.object}
          location={location}
          loading={loading}
          key={`article-${routeByPath.object.id}`}
          component={
            (isHybridApp &&
              (routeByPath.object.__typename === ARTICLE_CONTENT_TYPE ||
                routeByPath.object.__typename ===
                  NATIVE_ADVERTISING_CONTENT_TYPE) &&
              ARTICLE_PAGE_SWIPEABLE) ||
            ARTICLE_PAGE_DEFAULT
          }
        />
      );
    }

    case LANDING_PAGE_CONTENT_TYPE:
      return (
        <LandingPage
          landingPage={routeByPath.object}
          page={page}
          /* @ts-ignore TODO: TS2322 ->  Type 'Partial<RaschRouterLocation> | undefined' is not assignable to type 'Partial<RaschRouterLocation>'. */
          location={location}
        />
      );
    case PAGE_CONTENT_TYPE:
      return (
        <PageScreen
          pageScreen={routeByPath.object}
          page={page}
          location={location}
        />
      );
    case SPONSOR_CONTENT_TYPE:
      return (
        <Sponsor sponsor={routeByPath.object} location={location} page={page} />
      );
    case VIDEO_CONTENT_TYPE: {
      /* @ts-ignore TODO: TS2322 ->  Type 'Partial<RaschRouterLocation> | undefined' is not assignable to type 'Partial<RaschRouterLocation>'. */
      return <Video location={location} video={routeByPath.object} />;
    }
    case EXPLAINING_ARTICLE_CONTENT_TYPE: {
      return (
        <ExplainingArticle article={routeByPath.object} location={location} />
      );
    }
    case AUTHOR_CONTENT_TYPE:
      return <Author author={routeByPath.object} page={page} />;
    default:
      return (
        <Error
          msg={`Router: No Component for: ${routeByPath.object.__typename}`}
        />
      );
  }
};

export default withAppNexus({ parseTrackingData })(Router);
