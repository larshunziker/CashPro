/* istanbul ignore file */
import { getTealiumData } from '../../../shared/helpers/tealium/helper';
import withRaschRouterFactory, {
  RaschRouterConfig,
} from '../../../shared/decorators/withRaschRouterFactory';
import { onLocationChange, setLoading, setScreenReady } from '../actions/route';
import { apolloConfig as routerApolloConfig } from '../../screens/App/components/Router/apolloConfig';
import { apolloConfig as authorsPageApolloConfig } from '../../screens/App/screens/Authors/apolloConfig';
import { apolloConfig as blogAApolloConfig } from '../../screens/App/screens/BlogA/apolloConfig';
import { apolloConfig as blogBApolloConfig } from '../../screens/App/screens/BlogB/apolloConfig';
import { apolloConfig as hotTenApolloConfig } from '../../screens/App/screens/HotTen/apolloConfig';
import { apolloConfig as keywordsApolloConfig } from '../../screens/App/screens/Keywords/apolloConfig';
import { apolloConfig as personApolloConfig } from '../../screens/App/screens/Person/apolloConfig';
import { apolloConfig as personListApolloConfig } from '../../screens/App/screens/Person/screens/PersonList/apolloConfig';
import { apolloConfig as amexRestaurantApolloConfig } from '../../screens/App/screens/AmexRestaurants/apolloConfig';
import { apolloConfig as popRestaurantApolloConfig } from '../../screens/App/screens/PopRestaurants/apolloConfig';
import { apolloConfig as recipesApolloConfig } from '../../screens/App/screens/Recipes/apolloConfig';
import { apolloConfig as restaurantsApolloConfig } from '../../screens/App/screens/Restaurants/apolloConfig';
import { apolloConfig as restaurantsSearchApolloConfig } from '../../screens/App/screens/RestaurantsSearch/apolloConfig';
import { apolloConfig as searchApolloConfig } from '../../screens/App/screens/Search/apolloConfig';
import { apolloConfig as videosApolloConfig } from '../../screens/App/screens/Videos/apolloConfig';
import {
  BLOG_DATA,
  DEFAULT_PERSON_HOME_DE,
  DEFAULT_PERSON_HOME_FR,
  ROUTE_451,
  ROUTE_AUTHORS,
  ROUTE_AUTHORS_FR,
  ROUTE_HOT_TEN,
  ROUTE_PARTNERS_DE,
  ROUTE_PARTNERS_FR,
  ROUTE_STYLEGUIDE,
  URL_DE_AMEX_RESTAURANTS,
  URL_DE_KEYWORD,
  URL_DE_MAP,
  URL_DE_POP_RESTAURANTS,
  URL_DE_RECIPES,
  URL_DE_RESTAURANTS,
  URL_DE_RESTAURANTS_SEARCH,
  URL_DE_SEARCH,
  URL_DE_VIDEOS,
  URL_FR_KEYWORD,
  URL_FR_MAP,
  URL_FR_POP_RESTAURANTS,
  URL_FR_RECIPES,
  URL_FR_RESTAURANTS,
  URL_FR_RESTAURANTS_SEARCH,
  URL_FR_SEARCH,
  URL_FR_VIDEOS,
} from '../../screens/App/constants';

const routerConfig: RaschRouterConfig = {
  // created route styleguide/* to catch paragraphs and typography children of styleguide
  styleguide: { path: `${ROUTE_STYLEGUIDE}/*`, ignoreLoadingState: true },
  statusPage: {
    path: ROUTE_451,
    ignoreLoadingState: true,
  },
  hotTen: {
    path: ROUTE_HOT_TEN,
    apolloConfig: hotTenApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'HotTen',
          pageId: 'hot-ten',
        },
      }),
  },
  amexRestaurantDE: {
    path: URL_DE_AMEX_RESTAURANTS,
    apolloConfig: amexRestaurantApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  amexRestaurantProvinceDE: {
    path: `/${URL_DE_AMEX_RESTAURANTS}/:province`,
    apolloConfig: amexRestaurantApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  popRestaurantDE: {
    path: URL_DE_POP_RESTAURANTS,
    apolloConfig: popRestaurantApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  popRestaurantCityDE: {
    path: `/${URL_DE_POP_RESTAURANTS}/:popCity`,
    apolloConfig: popRestaurantApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  popRestaurantFR: {
    path: URL_FR_POP_RESTAURANTS,
    apolloConfig: popRestaurantApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  popRestaurantCityFR: {
    path: `/${URL_FR_POP_RESTAURANTS}/:popCity`,
    apolloConfig: popRestaurantApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  recipesDE: {
    path: URL_DE_RECIPES,
    apolloConfig: recipesApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  recipesFR: {
    path: URL_FR_RECIPES,
    apolloConfig: recipesApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  recipesFilteredDE: {
    path: `/${URL_DE_RECIPES}/kategorie/:recipeCategory`,
    apolloConfig: recipesApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  recipesFilteredFR: {
    path: `/${URL_FR_RECIPES}/categorie/:recipeCategory`,
    apolloConfig: recipesApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  restaurantsDE: {
    path: URL_DE_RESTAURANTS,
    apolloConfig: restaurantsApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Restaurants',
        },
      }),
  },
  restaurantsFR: {
    path: URL_FR_RESTAURANTS,
    apolloConfig: restaurantsApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Restaurants',
        },
      }),
  },
  restaurantsSearchDE: {
    path: `/${URL_DE_RESTAURANTS_SEARCH}/:query`,
    apolloConfig: restaurantsSearchApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  restaurantsSearchFR: {
    path: `/${URL_FR_RESTAURANTS_SEARCH}/:query`,
    apolloConfig: restaurantsSearchApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  restaurantsMapDE: {
    path: URL_DE_MAP,
    ignoreLoadingState: true,
  },
  restaurantsMapFr: {
    path: URL_FR_MAP,
    ignoreLoadingState: true,
  },
  restaurantsMapQueryDE: {
    path: `/${URL_DE_MAP}/:query`,
    ignoreLoadingState: true,
  },
  restaurantsMapQueryFr: {
    path: `/${URL_FR_MAP}/:query`,
    ignoreLoadingState: true,
  },
  partnersDE: {
    path: ROUTE_PARTNERS_DE,
    ignoreLoadingState: true,
  },
  partnersFR: {
    path: ROUTE_PARTNERS_FR,
    ignoreLoadingState: true,
  },
  personDE: {
    path: DEFAULT_PERSON_HOME_DE,
    apolloConfig: personApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  personFR: {
    path: DEFAULT_PERSON_HOME_FR,
    apolloConfig: personApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  personListDE: {
    path: `/${DEFAULT_PERSON_HOME_DE}/list/:char`,
    apolloConfig: personListApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
          pageId: `person_list_de_${props.params.char}`,
        },
      }),
  },
  personListFR: {
    path: `/${DEFAULT_PERSON_HOME_FR}/list/:char`,
    apolloConfig: personListApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
          pageId: `person_list_fr_${props.params.char}`,
        },
      }),
  },
  searchDE: {
    path: `${URL_DE_SEARCH}/:query`,
    apolloConfig: searchApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Search',
          pageId: 'search',
        },
      }),
  },
  searchFR: {
    path: `${URL_FR_SEARCH}/:query`,
    apolloConfig: searchApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Search',
          pageId: 'search',
        },
      }),
  },
  videosDE: {
    path: URL_DE_VIDEOS,
    apolloConfig: videosApolloConfig,
  },
  videosFR: {
    path: URL_FR_VIDEOS,
    apolloConfig: videosApolloConfig,
  },
  blogADE: {
    path: BLOG_DATA['blog_a_de'].url,
    apolloConfig: blogAApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  blogAFR: {
    path: BLOG_DATA['blog_a_fr'].url,
    apolloConfig: blogAApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  blogBDE: {
    path: BLOG_DATA['blog_b_de'].url,
    apolloConfig: blogBApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  blogBFR: {
    path: BLOG_DATA['blog_b_fr'].url,
    apolloConfig: blogBApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
        },
      }),
  },
  keywordsDE: {
    path: URL_DE_KEYWORD,
    apolloConfig: keywordsApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Keywords',
        },
      }),
  },
  keywordSearchDE: {
    path: `${URL_DE_KEYWORD}/:searchString`,
    apolloConfig: keywordsApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Keywords',
          pageId: `keyword_search_${props.params.searchString}`,
        },
      }),
  },
  keywordsFR: {
    path: URL_FR_KEYWORD,
    apolloConfig: keywordsApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Keywords',
        },
      }),
  },
  keywordSearchFR: {
    path: `${URL_FR_KEYWORD}/:searchString`,
    apolloConfig: keywordsApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Keywords',
          pageId: `keyword_search_${props.params.searchString}`,
        },
      }),
  },
  authorsPage: {
    path: ROUTE_AUTHORS,
    apolloConfig: authorsPageApolloConfig,
  },
  authorsPageFR: {
    path: ROUTE_AUTHORS_FR,
    apolloConfig: authorsPageApolloConfig,
  },
  default: {
    path: '*',
    apolloConfig: routerApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) => {
      // only used for 404 pages
      if (!props.newData?.environment?.routeByPath) {
        return getTealiumData({
          object: {
            ...props,
            preferredUri: props.location.pathname,
            __typename: 'ErrorPage',
          },
        });
      }

      return null;
    },
  },
};

const withRaschRouter = withRaschRouterFactory({
  routerConfig,
  onLocationChange,
  setScreenReady,
  setLoading,
});

export default withRaschRouter;
