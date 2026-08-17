import React from 'react';
import { connect, useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import { getMatchingTouchIcon } from '../../../../../shared/helpers/getMatchingTouchIcon';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import { setScreenReady } from '../../../../shared/actions/route';
import Redirect from '../../../../../common/components/Redirect';
import Article from '../../screens/Article';
import Author from '../../screens/Author';
import LandingPage from '../../screens/LandingPage';
import NotFound from '../../screens/NotFound';
import Organization from '../../screens/Organization';
import PageScreen from '../../screens/PageScreen';
import Recipe from '../../screens/Recipe';
import Error from '../Error';
import { default as KeywordArticlesList } from '../../screens/Keywords/screens/KeywordArticlesList';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import {
  ARTICLE_CONTENT_TYPE,
  AUTHOR_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  ORGANIZATION_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
  RECIPE_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { HOME_ALIAS_DE, HOME_ALIAS_FR } from './constants';
import appleTouchIcon114 from '../../assets/graphics/favicon/apple-touch-icon-114x114.png';
import appleTouchIcon120 from '../../assets/graphics/favicon/apple-touch-icon-120x120.png';
import appleTouchIcon144 from '../../assets/graphics/favicon/apple-touch-icon-144x144.png';
import appleTouchIcon152 from '../../assets/graphics/favicon/apple-touch-icon-152x152.png';
import appleTouchIcon180 from '../../assets/graphics/favicon/apple-touch-icon-180x180.png';
import appleTouchIcon57 from '../../assets/graphics/favicon/apple-touch-icon-57x57.png';
import { RasRouterProps } from './typings';

type SetStatusCode = typeof setStatusCode;

type RasRouterPropsInner = RasRouterProps & {
  setStatusCode?: SetStatusCode;
};

const Router = ({
  data,
  loading,
  page,
  location,
  language,
  setStatusCode,
  error,
}: RasRouterPropsInner) => {
  const { isSSR } = useSSRContext();

  const dispatch = useDispatch();
  const routeByPath: any = // TODO: fix typings
    (data && data?.environment && data?.environment?.routeByPath) || null;

  // handle soft 301 for apple-touch-icons (https://getoutofmyhead.dev/apple-touch-icons)
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  if (/apple-touch-icon/.test(location?.pathname)) {
    const iconSizes = {
      '57x57': appleTouchIcon57,
      '114x114': appleTouchIcon114,
      '120x120': appleTouchIcon120,
      '144x144': appleTouchIcon144,
      '152x152': appleTouchIcon152,
      '167x167': appleTouchIcon180,
      '180x180': appleTouchIcon180,
    };

    const touchIcon = getMatchingTouchIcon(iconSizes, location);

    if (__SERVER__) {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      dispatch(setStatusCode(301, touchIcon));
      return null;
    }
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    global.history.replaceState({}, '', touchIcon + location.search);
  }

  if (error) {
    return <NotFound language={language} />;
  }

  // handle soft 404
  if (!routeByPath || !routeByPath.preferred) {
    return loading || data?.isStatic ? null : <NotFound language={language} />;
  }

  // handle soft 301
  if (location?.pathname) {
    const currentPathName = location.pathname;
    let preferredPathName = routeByPath.preferred || null;

    // if smb hit the alias route for home, we redirect him to '/'
    if (currentPathName === `/${HOME_ALIAS_DE}` && language !== 'fr') {
      preferredPathName = '/';
    }

    // if smb hit the alias route for home FR, we redirect him to '/fr'
    if (currentPathName === `/${HOME_ALIAS_FR}` && language === 'fr') {
      preferredPathName = '/fr';
    }

    // if smb hit the node route for home FR, we redirect him to '/fr' (happens on preview links)
    if (currentPathName === `/node/${__FR_HOME_NODE_ID__}`) {
      preferredPathName = '/fr';
      if (isSSR) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        setStatusCode(301, preferredPathName);
        return null;
      }
    }

    if (
      preferredPathName &&
      language !== 'fr' &&
      currentPathName !== preferredPathName &&
      preferredPathName !== `/${HOME_ALIAS_DE}` &&
      currentPathName !== '/' // <= seems like we have an update issue on the router props while navigation to home!!!
    ) {
      if (isSSR) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        setStatusCode(301, preferredPathName);
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

    if (
      preferredPathName &&
      language === 'fr' &&
      currentPathName !== preferredPathName &&
      preferredPathName !== `/${HOME_ALIAS_FR}` &&
      currentPathName !== '/fr'
    ) {
      if (isSSR) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        setStatusCode(301, preferredPathName);
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
      global.history.replaceState({}, '', preferredPathName + location.search);
      return <Redirect to={preferredPathName + location.search} />;
    }
  }

  // switch components
  switch (routeByPath.object.__typename) {
    case ARTICLE_CONTENT_TYPE:
      return <Article article={routeByPath.object} location={location} />;
    case RECIPE_CONTENT_TYPE:
      return <Recipe recipe={routeByPath.object} location={location} />;
    case ORGANIZATION_CONTENT_TYPE:
      return (
        <Organization organization={routeByPath.object} location={location} />
      );
    case 'Keyword':
      return (
        <KeywordArticlesList
          keywordPage={routeByPath.object}
          page={page}
          language={language}
          location={location}
        />
      );
    case LANDING_PAGE_CONTENT_TYPE: {
      return (
        <LandingPage
          landingPage={routeByPath.object}
          page={page}
          /* @ts-ignore TODO: TS2322 ->  Type 'Partial<RaschRouterLocation> | undefined' is not assignable to type 'Partial<RaschRouterLocation>'. */
          location={location}
        />
      );
    }
    case PAGE_CONTENT_TYPE: {
      return <PageScreen pageScreen={routeByPath.object} location={location} />;
    }
    case AUTHOR_CONTENT_TYPE:
      return (
        <Author author={routeByPath.object} language={language} page={page} />
      );
    // eslint-disable-next-line no-underscore-dangle
    default:
      return (
        <Error
          msg={`Router: No Component for: ${routeByPath.object.__typename}`}
        />
      );
  }
};

const mapDispatchToProps = {
  setStatusCode,
};

export default compose<any, any>(
  connect(null, mapDispatchToProps),
  withAppNexus({ parseTrackingData }),
)(Router);
