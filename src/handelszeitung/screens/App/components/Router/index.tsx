import React from 'react';
import { useDispatch } from 'react-redux';
import { getMatchingTouchIcon } from '../../../../../shared/helpers/getMatchingTouchIcon';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import { setScreenReady } from '../../../../shared/actions/route';
import Redirect from '../../../../../common/components/Redirect';
import ArticlePage from '../../screens/ArticlePage';
import Author from '../../screens/Author';
import Branch from '../../screens/Branch';
import Dossier from '../../screens/Dossier';
import ExplainingArticle from '../../screens/ExplainingArticle';
import ImageGalleryArticle from '../../screens/ImageGalleryArticle';
import KeywordArticlesList from '../../screens/Keywords/screens/KeywordArticlesList';
import LandingPage from '../../screens/LandingPage';
import LongRead from '../../screens/LongRead';
import Organization from '../../screens/Organization';
import PageScreen from '../../screens/PageScreen';
import PageTemplate from '../../screens/PageTemplate';
import Person from '../../screens/Person';
import Ranking from '../../screens/Ranking';
import Sponsor from '../../screens/Sponsor';
import Video from '../../screens/Video';
import Error from '../Error';
import StatusPage from './../../screens/StatusPage';
import {
  FULL_PAGE_LAYOUT_TYPE,
  RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
} from '../../../../../common/screens/PageTemplate/constants';
import {
  ADVERTISING_TYPE_LONGFORM,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_NEWS,
  AUTHOR_CONTENT_TYPE,
  BRANCH_CONTENT_TYPE,
  DOSSIER_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  ORGANIZATION_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
  PERSON_CONTENT_TYPE,
  RANKING_CONTENT_TYPE,
  SPONSOR_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { PUBLICATION_BIL } from '../../../../../shared/constants/publications';
import { ROUTE_HOME } from '../../../App/constants';
import {
  PERSON_DETAIL,
  PERSON_DETAIL_LEGACY,
  RANKING_TYPE_RICHEST,
} from '../../screens/Person/constants';
import appleTouchIcon120 from '../../assets/graphics/favicon/apple-icon-120x120.png';
import appleTouchIcon144 from '../../assets/graphics/favicon/apple-icon-144x144.png';
import appleTouchIcon152 from '../../assets/graphics/favicon/apple-icon-152x152.png';
import appleTouchIcon180 from '../../assets/graphics/favicon/apple-icon-180x180.png';
import appleTouchIcon57 from '../../assets/graphics/favicon/apple-icon-57x57.png';
import favicon from '../../assets/graphics/favicon/favicon.ico';
import { StatusCode } from '../../../../../common/screens/StatusPage/typings';
import { RasRouterProps } from './typings';

type RouterPropsInner = RasRouterProps;

const Router = ({ data, loading, location, page, error }: RouterPropsInner) => {
  const dispatch = useDispatch();
  const routeByPath: any = data?.environment?.routeByPath || null;

  // handle soft 301 for apple-touch-icons (https://getoutofmyhead.dev/apple-touch-icons)
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  if (/apple-touch-icon/.test(location?.pathname)) {
    const iconSizes = {
      '57x57': appleTouchIcon57,
      '114x114': appleTouchIcon120,
      '120x120': appleTouchIcon120,
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

  // handle 404
  if (!routeByPath?.preferred) {
    return loading || data?.isStatic ? null : (
      <StatusPage statusCode={statusCode} />
    );
  }

  // handle soft 301
  if (location?.pathname) {
    const currentPathName = location.pathname;
    let preferredPathName = routeByPath.preferred || null;

    // hardcoded redirect from '/home-hz' to the main page
    if (currentPathName === `/${ROUTE_HOME}`) {
      preferredPathName = '/';
    }

    if (
      preferredPathName &&
      currentPathName !== preferredPathName &&
      preferredPathName !== `/${ROUTE_HOME}` &&
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

      dispatch(setScreenReady(false, { ...location }));

      const redirectTo = preferredPathName + location.search + location.hash;

      global.history.replaceState({}, '', redirectTo);
      return <Redirect to={redirectTo} />;
    }
  }

  // switch components
  switch (routeByPath.object.__typename) {
    case ARTICLE_CONTENT_TYPE:
    case NATIVE_ADVERTISING_CONTENT_TYPE: {
      if (routeByPath.object?.subtypeValue === ARTICLE_TYPE_LONG_READ) {
        return (
          <LongRead node={routeByPath.object} page={page} location={location} />
        );
      }
      if (routeByPath.object?.subtypeValue === ADVERTISING_TYPE_LONGFORM) {
        return (
          <PageScreen
            pageScreen={routeByPath.object}
            page={page}
            location={location}
          />
        );
      }

      // only render the right column on news articles
      if (routeByPath.object?.subtypeValue === ARTICLE_TYPE_NEWS) {
        return (
          /* @ts-ignore TODO: TS2786 ->  'PageTemplate' cannot be used as a JSX component. */
          <PageTemplate
            data={data}
            location={location}
            pageLayoutType={RIGHT_COLUMN_PAGE_LAYOUT_TYPE}
          />
        );
      }

      return (
        <ArticlePage
          article={routeByPath.object}
          location={location}
          pageLayoutType={FULL_PAGE_LAYOUT_TYPE}
        />
      );
    }
    case EXPLAINING_ARTICLE_CONTENT_TYPE: {
      return (
        <ExplainingArticle article={routeByPath.object} location={location} />
      );
    }

    case IMAGE_GALLERY_CONTENT_TYPE:
      return (
        <ImageGalleryArticle
          imageGalleryArticle={routeByPath.object}
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
    case LANDING_PAGE_CONTENT_TYPE:
      return (
        <LandingPage
          landingPage={routeByPath.object}
          /* @ts-ignore TODO: TS2322 ->  Type 'number | undefined' is not assignable to type 'number'. */
          page={page}
          /* @ts-ignore TODO: TS2322 ->  Type 'Partial<RaschRouterLocation> | undefined' is not assignable to type 'Partial<RaschRouterLocation>'. */
          location={location}
        />
      );
    case KEYWORD_CONTENT_TYPE:
      return (
        <KeywordArticlesList
          keywordPage={routeByPath.object}
          page={page}
          location={location}
        />
      );
    case DOSSIER_CONTENT_TYPE:
      return (
        <Dossier dossier={routeByPath.object} page={page} location={location} />
      );
    case PERSON_CONTENT_TYPE: {
      const isIn300Richest =
        (Array.isArray(routeByPath.object?.rankings?.edges) &&
          routeByPath.object.rankings.edges.filter(
            ({ node: { ranking = null } }) => {
              return (
                /* @ts-ignore TODO: TS2339 ->  Property 'rankingType' does not exist on type 'never'. */
                ranking?.rankingType === RANKING_TYPE_RICHEST &&
                /* @ts-ignore TODO: TS2339 ->  Property 'year' does not exist on type 'never'. */
                ranking?.year >= '2023'
              );
            },
          )) ||
        [];
      const isBIL = routeByPath.object?.publication === PUBLICATION_BIL;
      return (
        <Person
          component={
            (isIn300Richest.length > 0 && isBIL && PERSON_DETAIL) ||
            PERSON_DETAIL_LEGACY
          }
          /* @ts-ignore TODO: TS2322 ->  Type 'number | undefined' is not assignable to type 'number'. */
          page={page}
          person={routeByPath.object}
          /* @ts-ignore TODO: TS2322 ->  Type 'Partial<RaschRouterLocation> | undefined' is not assignable to type 'Partial<RaschRouterLocation>'. */
          location={location}
        />
      );
    }
    case SPONSOR_CONTENT_TYPE:
      return (
        <Sponsor
          component="brandReport"
          sponsor={routeByPath.object}
          location={location}
          page={page}
        />
      );
    case ORGANIZATION_CONTENT_TYPE:
      return (
        <Organization
          organization={routeByPath.object}
          location={location}
          page={page}
        />
      );
    case BRANCH_CONTENT_TYPE:
      return (
        <Branch branch={routeByPath.object} location={location} page={page} />
      );
    case VIDEO_CONTENT_TYPE: {
      return <Video location={location} video={routeByPath.object} />;
    }
    case RANKING_CONTENT_TYPE: {
      return (
        <Ranking ranking={routeByPath.object} page={page} location={location} />
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
