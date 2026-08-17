/* istanbul ignore file */
import { getTealiumData } from '../../../shared/helpers/tealium/helper';
import withRaschRouterFactory, {
  RaschRouterConfig,
} from '../../../shared/decorators/withRaschRouterFactory';
import { onLocationChange, setLoading, setScreenReady } from '../actions/route';
import { apolloConfig as routerApolloConfig } from '../../screens/App/components/Router/apolloConfig';
import { apolloConfig as authorsPageApolloConfig } from '../../screens/App/screens/Authors/apolloConfig';
import { apolloConfig as blogsApolloConfig } from '../../screens/App/screens/Blogs/apolloConfig';
import { apolloConfig as horoscopeApolloConfig } from '../../screens/App/screens/Horoscope/apolloConfig';
import {
  apolloConfigDailyHoroscope as dailyHoroscopeApolloConfig,
  apolloConfigYearlyHoroscope as yearlyHoroscopeApolloConfig,
} from '../../screens/App/screens/HoroscopeDetail/apolloConfig';
import { apolloConfig as latestApolloConfig } from '../../screens/App/screens/Latest/apolloConfig';
import { apolloConfig as searchApolloConfig } from '../../screens/App/screens/Search/apolloConfig';
import { apolloConfig as videosApolloConfig } from '../../screens/App/screens/Videos/apolloConfig';
import {
  ROUTE_451,
  ROUTE_ALERTS,
  ROUTE_AUTHORS,
  ROUTE_BLOGS,
  ROUTE_BOOKMARKS,
  ROUTE_HOROSCOPE,
  ROUTE_LATEST,
  ROUTE_SEARCH,
  ROUTE_STYLEGUIDE,
  ROUTE_UNSUBSCRIBE_EMAIL_ALERTS,
  ROUTE_VIDEOS,
} from '../../screens/App/constants';

const routerConfig: RaschRouterConfig = {
  // created route styleguide/* to catch paragraphs and typography children of styleguide
  styleguide: { path: `${ROUTE_STYLEGUIDE}/*`, ignoreLoadingState: true },
  bookmarks: {
    path: ROUTE_BOOKMARKS,
    ignoreLoadingState: true,
  },
  statusPage: {
    path: ROUTE_451,
    ignoreLoadingState: true,
  },
  search: {
    path: ROUTE_SEARCH,
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
  videos: {
    path: ROUTE_VIDEOS,
    apolloConfig: videosApolloConfig,
  },
  latest: {
    path: ROUTE_LATEST,
    apolloConfig: latestApolloConfig,
  },
  blogs: {
    path: ROUTE_BLOGS,
    apolloConfig: blogsApolloConfig,
  },
  horoscope: {
    path: ROUTE_HOROSCOPE,
    apolloConfig: horoscopeApolloConfig,
  },
  dailyHoroscope: {
    path: `${ROUTE_HOROSCOPE}/tageshoroskop/:zodiacSlug`,
    apolloConfig: dailyHoroscopeApolloConfig,
  },
  yearlyHoroscope: {
    path: `${ROUTE_HOROSCOPE}/jahreshoroskop/:zodiacSlug`,
    apolloConfig: yearlyHoroscopeApolloConfig,
  },
  alertsProfile: {
    path: ROUTE_ALERTS,
    ignoreLoadingState: true,
  },
  alertsUnsubscribe: {
    path: ROUTE_UNSUBSCRIBE_EMAIL_ALERTS,
    ignoreLoadingState: true,
  },
  oneSignalUnsubscribe: {
    path: `${ROUTE_UNSUBSCRIBE_EMAIL_ALERTS}/:oneSignalExternalId`,
    ignoreLoadingState: true,
  },
  authorsPage: {
    path: ROUTE_AUTHORS,
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
