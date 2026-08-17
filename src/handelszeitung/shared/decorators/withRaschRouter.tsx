/* istanbul ignore file */

import { getTealiumData } from '../../../shared/helpers/tealium/helper';
import withRaschRouterFactory, {
  RaschRouterConfig,
} from '../../../shared/decorators/withRaschRouterFactory';
import { onLocationChange, setLoading, setScreenReady } from '../actions/route';
import { apolloConfig as routerApolloConfig } from '../../screens/App/components/Router/apolloConfig';
import { apolloConfig as authorsPageApolloConfig } from '../../screens/App/screens/Authors/apolloConfig';
import { apolloConfig as financeDictionaryApolloConfig } from '../../screens/App/screens/FinanceDictionary/apolloConfig';
import { apolloConfig as keywordsApolloConfig } from '../../screens/App/screens/Keywords/apolloConfig';
import { apolloConfig as latestApolloConfig } from '../../screens/App/screens/Latest/apolloConfig';
import { apolloConfig as searchApolloConfig } from '../../screens/App/screens/Search/apolloConfig';
import { apolloConfig as sponsorsApolloConfig } from '../../screens/App/screens/Sponsor/components/Sponsors/apolloConfig';
import { apolloConfig as subscriptionsApolloConfig } from '../../screens/App/screens/Subscriptions/apolloConfig';
import { apolloConfig as videosApolloConfig } from '../../screens/App/screens/Videos/apolloConfig';
import {
  ROUTE_451,
  ROUTE_ACCOUNT,
  ROUTE_ALERTS,
  ROUTE_AUTHORS,
  ROUTE_BOOKMARKS,
  ROUTE_BRAND_REPORT,
  ROUTE_EVENT_CALENDAR,
  ROUTE_FINANCE_LEXICON,
  ROUTE_FINANCE_LEXICON_LIST,
  ROUTE_KEYWORDS,
  ROUTE_KEYWORDS_SEARCH,
  ROUTE_LATEST,
  ROUTE_LOGOUT,
  ROUTE_PROFILE,
  ROUTE_SEARCH,
  ROUTE_STYLEGUIDE,
  ROUTE_SUBSCRIPTIONS,
  ROUTE_SUBSCRIPTIONS_BIL,
  ROUTE_UNSUBSCRIBE_EMAIL_ALERTS,
  ROUTE_VIDEOS,
} from '../../screens/App/constants';

const routerConfig: RaschRouterConfig = {
  // created route styleguide/* to catch paragraphs and typography children of styleguide
  styleguide: { path: `${ROUTE_STYLEGUIDE}/*`, ignoreLoadingState: true },
  userProfile: {
    path: ROUTE_PROFILE,
    ignoreLoadingState: true,
  },
  keywords: {
    path: ROUTE_KEYWORDS,
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
  keywordSearch: {
    path: ROUTE_KEYWORDS_SEARCH,
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
  sponsorList: {
    path: ROUTE_BRAND_REPORT,
    apolloConfig: sponsorsApolloConfig,
  },
  financeDictionary: {
    path: ROUTE_FINANCE_LEXICON,
    apolloConfig: financeDictionaryApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'FinanceDictionary',
          pageId: `finance_dictionary`,
        },
      }),
  },
  financeDictionaryList: {
    path: `${ROUTE_FINANCE_LEXICON_LIST}`,
    apolloConfig: financeDictionaryApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'FinanceDictionaryCharList',
          pageId: `finance_dictionary_char_list_${props.params.char}`,
        },
      }),
  },
  financeDictionaryChar: {
    path: `${ROUTE_FINANCE_LEXICON_LIST}/:char`,
    apolloConfig: financeDictionaryApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'FinanceDictionaryCharList',
          pageId: `finance_dictionary_char_list_${props.params.char}`,
        },
      }),
  },
  subscriptions: {
    path: ROUTE_SUBSCRIPTIONS,
    apolloConfig: subscriptionsApolloConfig,
  },
  subscriptionsBil: {
    path: ROUTE_SUBSCRIPTIONS_BIL,
    apolloConfig: subscriptionsApolloConfig,
  },
  search: {
    path: `${ROUTE_SEARCH}/:searchQuery`,
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
  account: {
    path: ROUTE_ACCOUNT,
    ignoreLoadingState: true,
  },
  authorsPage: {
    path: ROUTE_AUTHORS,
    apolloConfig: authorsPageApolloConfig,
  },
  loggout: {
    path: ROUTE_LOGOUT,
    ignoreLoadingState: true,
  },
  bookmarks: {
    path: ROUTE_BOOKMARKS,
    ignoreLoadingState: true,
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
  eventsCalendar: {
    path: ROUTE_EVENT_CALENDAR,
    ignoreLoadingState: true,
  },
  statusPage: {
    path: ROUTE_451,
    ignoreLoadingState: true,
  },
  latest: {
    path: ROUTE_LATEST,
    apolloConfig: latestApolloConfig,
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
