/* istanbul ignore file */

import { getTealiumData } from '../../../shared/helpers/tealium/helper';
import withRaschRouterFactory, {
  RaschRouterConfig,
} from '../../../shared/decorators/withRaschRouterFactory';
import { nativeAdvertisingBreadcrumbsData } from '../../screens/App/screens/Article/components/ArticleHead/components/NativeAdvertisingHeader';
import { authorBreadcrumbsData } from '../../screens/App/screens/Author';
import { authorsBreadcrumbsData } from '../../screens/App/screens/Authors';
import { keywordsBreadcrumbsData } from '../../screens/App/screens/Keywords';
import { explainingBreadcrumbsData } from '../../screens/App/screens/ExplainingArticles/screens/Article';
import { videoBreadcrumbsData } from '../../screens/App/screens/Video';
import { onLocationChange, setLoading, setScreenReady } from '../actions/route';
import { apolloConfig as routerApolloConfig } from '../../screens/App/components/Router/apolloConfig';
import { apolloConfig as authorsPageApolloConfig } from '../../screens/App/screens/Authors/apolloConfig';
import { apolloConfig as keywordsApolloConfig } from '../../screens/App/screens/Keywords/apolloConfig';
import { apolloConfig as legalApolloConfig } from '../../screens/App/screens/LegalDictionary/apolloConfig';
import { apolloConfig as onmedaApolloConfig } from '../../screens/App/screens/././ExplainingArticles/apolloConfig';
import { apolloConfig as searchApolloConfig } from '../../screens/App/screens/Search/apolloConfig';
import { apolloConfig as BrandReportApolloConfig } from '../../screens/App/screens/Sponsor/components/BrandReport/apolloConfig';

import { apolloConfig as latestApolloConfig } from '../../screens/App/screens/Latest/apolloConfig';
import { longFormBreadcrumbsData } from '../../screens/App/screens/LongForm';
import { legalAdviceBreadcrumbsData } from '../../screens/App/screens/ArticlePage/components/ArticlePageLegalAdvice';
import { pageBreadcrumbsData } from '../../screens/App/screens/PageScreen';
import { legalAdviceCategoryBreadcrumbsData } from '../../screens/App/screens/LegalAdvice/helpers/legalAdviceCategoryBreadcrumbsData';
import {
  ROUTE_451,
  ROUTE_ACCOUNT,
  ROUTE_ALERTS,
  ROUTE_AUTHORS,
  ROUTE_BOOKMARKS,
  ROUTE_BRAND_REPORT,
  ROUTE_FILTER_SEARCH,
  ROUTE_KEYWORDS,
  ROUTE_KEYWORDS_SEARCH,
  ROUTE_LATEST,
  ROUTE_LEGAL_DICTIONARY,
  ROUTE_LEGAL_DICTIONARY_CHAR,
  ROUTE_ONMEDA,
  ROUTE_ONMEDA_CHAR,
  ROUTE_SEARCH,
  ROUTE_STYLEGUIDE,
} from '../../screens/App/constants';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  ARTICLE_TYPE_LONG_READ,
  AUTHOR_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
  SPONSOR_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../shared/constants/content';

/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
function defaultEnrichData(data, props) {
  if (data?.legalAdvice?.args) {
    return legalAdviceCategoryBreadcrumbsData(data);
  }
  const routeByPath = data?.environment?.routeByPath || null;

  switch (routeByPath?.object?.__typename) {
    case AUTHOR_CONTENT_TYPE:
      return authorBreadcrumbsData(data);
    case EXPLAINING_ARTICLE_CONTENT_TYPE:
      return explainingBreadcrumbsData(data);
    case NATIVE_ADVERTISING_CONTENT_TYPE:
      if (routeByPath?.object?.subtypeValue === ADVERTISING_TYPE_BRANDREPORT) {
        return nativeAdvertisingBreadcrumbsData(data);
      }
      if (routeByPath?.object?.activeMenuTrail) {
        data.breadcrumbsData = {
          activeMenuTrail: routeByPath.object.activeMenuTrail,
        };
      }
      break;
    case SPONSOR_CONTENT_TYPE:
      return nativeAdvertisingBreadcrumbsData(data);
    case VIDEO_CONTENT_TYPE:
      return videoBreadcrumbsData(data);
    case KEYWORD_CONTENT_TYPE:
      return keywordsBreadcrumbsData(data, props);
    case ARTICLE_CONTENT_TYPE:
      const articleType = routeByPath?.object?.subtypeValue;

      if (
        [
          ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
          ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
        ].includes(articleType)
      ) {
        return legalAdviceBreadcrumbsData(data);
      }

      if (articleType === ARTICLE_TYPE_LONG_READ) {
        return longFormBreadcrumbsData(data);
      }
      if (routeByPath?.object?.activeMenuTrail) {
        data.breadcrumbsData = {
          activeMenuTrail: routeByPath.object.activeMenuTrail,
        };
      }
      break;
    case PAGE_CONTENT_TYPE:
      if (
        !['/beratung', '/engagement', '/beratung-neu'].includes(
          routeByPath?.object?.preferredUri,
        )
      ) {
        return pageBreadcrumbsData(data);
      }
  }
}

const routerConfig: RaschRouterConfig = {
  // created route styleguide/* to catch paragraphs and typography children of styleguide
  styleguide: { path: `${ROUTE_STYLEGUIDE}/*`, ignoreLoadingState: true },
  keywords: {
    path: ROUTE_KEYWORDS,
    apolloConfig: keywordsApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    enrichData: (data) => {
      data.breadcrumbsData = {
        label: 'Stichworte',
        link: `/${ROUTE_KEYWORDS}`,
        title: 'A',
      };
    },
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
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    enrichData: (data, props) => {
      data.breadcrumbsData = {
        label: 'Stichworte',
        link: `/${ROUTE_KEYWORDS}`,
        title: props.params?.searchString,
      };
    },
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
  account: {
    path: ROUTE_ACCOUNT,
    ignoreLoadingState: true,
  },
  bookmarks: {
    path: ROUTE_BOOKMARKS,
    ignoreLoadingState: true,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    enrichData: (data) => {
      data.breadcrumbsData = {
        label: 'Merkliste',
      };
    },
  },
  onmedaList: {
    path: ROUTE_ONMEDA,
    apolloConfig: onmedaApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          articleType: 'LandingPage',
          __typename: 'Onmeda',
          pageId: `onmeda_list`,
        },
      }),
  },
  onmedaCharList: {
    path: ROUTE_ONMEDA_CHAR,
    apolloConfig: onmedaApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LandingPage',
          pageId: `onmeda_by_char_${props.params.char}`,
        },
      }),
  },
  legalDictionary: {
    path: ROUTE_LEGAL_DICTIONARY,
    apolloConfig: legalApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    enrichData: (data) => {
      data.breadcrumbsData = {
        label: 'Rechtslexikon',
        link: `/${ROUTE_LEGAL_DICTIONARY}`,
        title: 'A',
      };
    },
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LegalDictionary',
          pageId: `legal_dictionary`,
        },
      }),
  },
  legalDictionaryCharList: {
    path: ROUTE_LEGAL_DICTIONARY_CHAR,
    apolloConfig: legalApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    enrichData: (data, props) => {
      data.breadcrumbsData = {
        label: 'Rechtslexikon',
        link: `/${ROUTE_LEGAL_DICTIONARY}`,
        title: props.params?.char,
      };
    },
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'LegalDictionaryCharList',
          pageId: `legal_dictionary_char_list_${props.params.char}`,
        },
      }),
  },
  sponsorList: {
    path: ROUTE_BRAND_REPORT,
    apolloConfig: BrandReportApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    enrichData: (data) => {
      data.breadcrumbsData = {
        label: 'Brandreport',
      };
    },
  },
  alertsProfile: {
    path: ROUTE_ALERTS,
    ignoreLoadingState: true,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    enrichData: (data) => {
      data.breadcrumbsData = {
        label: 'E-Mail Alerts',
      };
    },
  },
  authorsPage: {
    path: ROUTE_AUTHORS,
    apolloConfig: authorsPageApolloConfig,
    enrichData: authorsBreadcrumbsData,
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
  searchFilter: {
    path: ROUTE_FILTER_SEARCH,
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
  statusPage: {
    path: ROUTE_451,
    ignoreLoadingState: true,
  },
  shopCheckoutSuccess: {
    path: '/checkout/success',
    ignoreLoadingState: true,
  },
  shopCheckoutError: {
    path: '/checkout/error',
    ignoreLoadingState: true,
  },
  latest: {
    path: ROUTE_LATEST,
    apolloConfig: latestApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    enrichData: (data) => {
      data.breadcrumbsData = {
        label: 'Das Neueste',
      };
    },
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
    enrichData: defaultEnrichData,
  },
};

const withRaschRouter = withRaschRouterFactory({
  routerConfig,
  onLocationChange,
  setScreenReady,
  setLoading,
});

export default withRaschRouter;
