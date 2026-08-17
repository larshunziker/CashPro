import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchingTouchIcon } from '../../../../../shared/helpers/getMatchingTouchIcon';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { checkKMUAccess } from '../../screens/LegalAdvice/helpers/checkKMUAccess';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import { setScreenReady } from '../../../../shared/actions/route';
import Redirect from '../../../../../common/components/Redirect';
import ExplainingArticle from '../../screens/./ExplainingArticles/screens/Article';
import ArticlePage from '../../screens/ArticlePage';
import Author from '../../screens/Author';
import LandingPage from '../../screens/LandingPage';
import LawyersPage from '../../screens/Lawyers';
import LandingPageLegalAdvice from '../../screens/LegalAdvice/LandingPage';
import SearchLegalAdvice from '../../screens/LegalAdvice/Search';
import LongForm from '../../screens/LongForm';
import PageScreen from '../../screens/PageScreen';
import PageTemplate from '../../screens/PageTemplate';
import SponsorList from '../../screens/Sponsor/components/SponsorList';
import StatusPage from '../../screens/StatusPage';
import Video from '../../screens/Video';
import Error from '../Error';
import { default as KeywordArticlesList } from '../../screens/Keywords/screens/KeywordArticlesList';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import {
  FULL_PAGE_LAYOUT_TYPE,
  RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
} from '../../../../../common/screens/PageTemplate/constants';
import {
  ADVERTISING_TYPE_LONGFORM,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_RATGEBER,
  AUTHOR_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
  SPONSOR_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { FULLSCREEN_HASH } from '../../../../../shared/constants/fullscreen';
import { ROUTE_HOME, ROUTE_LAWYERS, ROUTE_LEGAL_ADVICE } from '../../constants';
import appleTouchIcon114 from '../../assets/graphics/favicon/apple-icon-114x114.png';
import appleTouchIcon120 from '../../assets/graphics/favicon/apple-icon-120x120.png';
import appleTouchIcon144 from '../../assets/graphics/favicon/apple-icon-144x144.png';
import appleTouchIcon152 from '../../assets/graphics/favicon/apple-icon-152x152.png';
import appleTouchIcon180 from '../../assets/graphics/favicon/apple-icon-180x180.png';
import { StatusCode } from '../../../../../common/screens/StatusPage/typings';
import { RasRouterProps } from './typings';

type RouterPropsInner = RasRouterProps & {
  data: {
    legalAdvice?: any;
  };
};

const Router = ({ data, loading, location, page, error }: RouterPropsInner) => {
  const { isSSR } = useSSRContext();
  const dispatch = useDispatch();
  const routeByPath = data?.environment?.routeByPath || null;
  const legalAdviceSubscriptions = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).legalAdviceSubscriptions,
  );

  // handle soft 301 for apple-touch-icons (https://getoutofmyhead.dev/apple-touch-icons)
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  if (/apple-touch-icon/.test(location?.pathname)) {
    const iconSizes = {
      '57x57': appleTouchIcon114,
      '114x114': appleTouchIcon114,
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

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string[] | undefined' is not assignable to parameter of type 'string[]'. */
  const hasKMUAccess = checkKMUAccess(legalAdviceSubscriptions);

  if (error) {
    return <StatusPage statusCode={503} logMessage={error} />;
  }
  const isLegalAdvice = location?.pathname?.startsWith(
    '/' + ROUTE_LEGAL_ADVICE,
  );
  const isLawyersList = location?.pathname?.startsWith('/' + ROUTE_LAWYERS);
  const statusCode: StatusCode = (routeByPath?.statusCode as StatusCode) || 404;

  // handle soft 404
  if (!routeByPath?.preferred && !isLegalAdvice) {
    return loading || data?.isStatic ? null : (
      <StatusPage statusCode={statusCode} />
    );
  }

  const isFullscreenGallery =
    (!isSSR &&
      (global?.location?.hash.includes(FULLSCREEN_HASH) ||
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        location?.hash.includes(FULLSCREEN_HASH))) ||
    false;

  // handle soft 301
  if (location?.pathname && !isFullscreenGallery && !loading) {
    const currentPathName: string = location.pathname;
    /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
    const preferredPathName: string = routeByPath?.preferred || null;
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
        global.location.href = preferredPathName;
        return null;
      }

      dispatch(setScreenReady(false, { ...location }));

      const redirectTo =
        preferredPathName + global.location.search + global.location.hash;

      global.history.replaceState({}, '', redirectTo);
      return <Redirect to={redirectTo} />;
    }
  }

  if (isLegalAdvice) {
    if (routeByPath?.object?.specialInterest === 'KMU' && !hasKMUAccess) {
      return <StatusPage statusCode={404} />;
    }

    if (routeByPath?.object.__typename === ARTICLE_CONTENT_TYPE) {
      return (
        /* @ts-ignore TODO: TS2786 ->  'PageTemplate' cannot be used as a JSX component. */
        <PageTemplate
          data={data}
          location={location}
          pageLayoutType={RIGHT_COLUMN_PAGE_LAYOUT_TYPE}
        />
      );
    }

    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    if (location.query.q) {
      return (
        <SearchLegalAdvice
          location={location}
          page={page}
          legalAdvice={data?.legalAdvice}
        />
      );
    }

    return (
      <LandingPageLegalAdvice
        landingPage={routeByPath?.object}
        page={page}
        location={location}
        legalAdvice={data?.legalAdvice}
      />
    );
  }

  if (isLawyersList) {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    return <LawyersPage pageScreen={routeByPath?.object} />;
  }

  // switch components
  switch (routeByPath?.object?.__typename) {
    case EXPLAINING_ARTICLE_CONTENT_TYPE:
      return (
        <ExplainingArticle article={routeByPath.object} location={location} />
      );
    case ARTICLE_CONTENT_TYPE:
    case NATIVE_ADVERTISING_CONTENT_TYPE:
      if (routeByPath.object?.subtypeValue === ARTICLE_TYPE_LONG_READ) {
        return (
          // TODO: Temporary - waiting for information if LongRead will be replaced with LongForm
          // <LongRead node={routeByPath.object} page={page} location={location} />
          <LongForm
            article={routeByPath.object}
            page={page}
            location={location}
          />
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
      if (routeByPath.object?.subtypeValue === ARTICLE_TYPE_GUIDE) {
        return <ArticlePage article={routeByPath.object} location={location} />;
      }
      return (
        /* @ts-ignore TODO: TS2786 ->  'PageTemplate' cannot be used as a JSX component. */
        <PageTemplate
          data={data}
          location={location}
          pageLayoutType={
            routeByPath.object?.subtypeValue === ARTICLE_TYPE_RATGEBER ||
            routeByPath.object?.subtypeValue ===
              ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE ||
            routeByPath.object?.subtypeValue ===
              ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL
              ? RIGHT_COLUMN_PAGE_LAYOUT_TYPE
              : FULL_PAGE_LAYOUT_TYPE
          }
        />
      );
    case LANDING_PAGE_CONTENT_TYPE:
      return (
        <LandingPage
          landingPage={routeByPath.object}
          page={page}
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
    case SPONSOR_CONTENT_TYPE:
      return <SponsorList sponsor={routeByPath.object} location={location} />;
    case VIDEO_CONTENT_TYPE:
      return <Video location={location} video={routeByPath.object} />;
    case PAGE_CONTENT_TYPE:
      return <PageScreen location={location} pageScreen={routeByPath.object} />;
    case AUTHOR_CONTENT_TYPE:
      return (
        <Author author={routeByPath.object} location={location} page={page} />
      );

    default:
      return (
        <>
          <Error
            msg={`Router: No Component for: ${routeByPath?.object?.__typename}`}
          />
          <StatusPage statusCode={404} />
        </>
      );
  }
};

export default withAppNexus({ parseTrackingData })(Router);
