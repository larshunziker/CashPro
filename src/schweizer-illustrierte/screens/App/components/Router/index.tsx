import React from 'react';
import { useDispatch } from 'react-redux';
import { getMatchingTouchIcon } from '../../../../../shared/helpers/getMatchingTouchIcon';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import { setScreenReady } from '../../../../shared/actions/route';
import Redirect from '../../../../../common/components/Redirect';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import ArticlePage from '../../screens/ArticlePage';
import Author from '../../screens/Author';
import Channel from '../../screens/Channel';
import ImageGalleryArticle from '../../screens/ImageGalleryArticle';
import Keyword from '../../screens/Keyword';
import LandingPage from '../../screens/LandingPage';
import PageScreen from '../../screens/PageScreen';
import StatusPage from '../../screens/StatusPage';
import Video from '../../screens/Video';
import Error from '../Error';
import Topic from '../Topic';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import {
  ADVERTISING_TYPE_LONGFORM,
  ARTICLE_CONTENT_TYPE,
  AUTHOR_CONTENT_TYPE,
  CHANNEL_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
  TOPIC_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { FULLSCREEN_HASH } from '../../../../../shared/constants/fullscreen';
import { ROUTE_HOME } from '../../constants';
import appleTouchIcon114 from '../../assets/graphics/favicon/apple-icon-114x114.png';
import appleTouchIcon144 from '../../assets/graphics/favicon/apple-icon-144x144.png';
import appleTouchIcon57 from '../../assets/graphics/favicon/apple-icon-57x57.png';
import appleTouchIcon152 from '../../assets/graphics/favicon/apple-touch-icon-152x152.png';
import appleTouchIcon180 from '../../assets/graphics/favicon/apple-touch-icon-180x180.png';
import favicon from '../../assets/graphics/favicon/favicon.ico';
import { StatusCode } from '../../../../../common/screens/StatusPage/typings';
import { RasRouterProps } from './typings';

type RouterPropsInner = RasRouterProps;

const Router = ({ data, location, page, loading, error }: RouterPropsInner) => {
  const { isSSR } = useSSRContext();

  const dispatch = useDispatch();
  const routeByPath =
    (data && data?.environment && data?.environment?.routeByPath) || null;

  // handle soft 301 for apple-touch-icons (https://getoutofmyhead.dev/apple-touch-icons)
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  if (/apple-touch-icon/.test(location?.pathname)) {
    const iconSizes = {
      '57x57': appleTouchIcon57,
      '114x114': appleTouchIcon114,
      '120x120': appleTouchIcon144,
      '144x144': appleTouchIcon144,
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
  // case directly in the router as a pointing in the proxy.redirecty file is not working
  if (location?.pathname === '/favicon.ico') {
    if (isSSR) {
      dispatch(setStatusCode(301, favicon));
      return null;
    }
    global.history.replaceState({}, '', favicon + location.search);
  }

  if (error) {
    return <StatusPage statusCode={503} logMessage={error} />;
  }

  const statusCode = (routeByPath?.statusCode as StatusCode) || 404;

  // handle soft 404
  if (!routeByPath || !routeByPath.preferred) {
    return loading || data?.isStatic ? null : (
      <StatusPage statusCode={statusCode} />
    );
  }

  // we do have a redirect issue on localhost by clicking on a teaser
  // to open the fullscreen gallery
  const isFullscreenGallery =
    (!isSSR && global?.location?.hash.indexOf(FULLSCREEN_HASH) !== -1) || false;

  // handle soft 301
  if (location && location.pathname && !isFullscreenGallery) {
    const currentPathName = location.pathname;
    const preferredPathName = routeByPath.preferred || null;

    if (
      preferredPathName &&
      currentPathName !== preferredPathName &&
      preferredPathName !== `/${ROUTE_HOME}` &&
      currentPathName !== '/'
    ) {
      if (isSSR) {
        dispatch(setStatusCode(301, preferredPathName));
        return null;
      }

      // check extern redirect
      if (
        preferredPathName.indexOf('http://') === 0 ||
        preferredPathName.indexOf('https://') === 0
      ) {
        window.location.href = preferredPathName;
        return null;
      }

      dispatch(setScreenReady(false, { ...location }));

      const redirectTo = preferredPathName + location.search + location.hash;

      global.history.replaceState({}, '', redirectTo);
      return <Redirect to={redirectTo} />;
    }
  }

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
      return <ArticlePage article={routeByPath.object} location={location} />;
    }
    case IMAGE_GALLERY_CONTENT_TYPE: {
      return (
        <ImageGalleryArticle
          imageGalleryArticle={routeByPath.object}
          location={location}
        />
      );
    }
    case KEYWORD_CONTENT_TYPE: {
      return (
        <Keyword keyword={routeByPath.object} location={location} page={page} />
      );
    }
    case CHANNEL_CONTENT_TYPE: {
      return (
        <Channel channel={routeByPath.object} location={location} page={page} />
      );
    }
    case LANDING_PAGE_CONTENT_TYPE: {
      return (
        <LandingPage
          landingPage={routeByPath.object}
          location={location}
          page={page}
        />
      );
    }
    case TOPIC_CONTENT_TYPE: {
      return (
        <Topic topic={routeByPath.object} location={location} page={page} />
      );
    }
    case PAGE_CONTENT_TYPE: {
      return (
        <TestFragment data-testid="pagescreen-wrapper">
          <PageScreen pageScreen={routeByPath.object} location={location} />
        </TestFragment>
      );
    }
    case VIDEO_CONTENT_TYPE: {
      return <Video location={location} video={routeByPath.object} />;
    }
    case AUTHOR_CONTENT_TYPE:
      return <Author author={routeByPath.object} page={page} />;
    default:
      return __DEVELOPMENT__ ? (
        <Error
          msg={`Router: No Component for: ${routeByPath.object.__typename}`}
        />
      ) : null;
  }
};

export default withAppNexus({ parseTrackingData })(Router);
