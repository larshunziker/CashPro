/* istanbul ignore file */

import { getTealiumData } from '../../../shared/helpers/tealium/helper';
import { countSearchResults } from '../helpers/searchResults';
import { isStockFullquoteShorthandValorName } from '../helpers/fullquote';
import withRaschRouterFactory, {
  RaschApolloConfig,
  RaschRouterConfig,
} from '../../../shared/decorators/withRaschRouterFactory';
import { onLocationChange, setLoading, setScreenReady } from '../actions/route';
import { apolloConfig as routerApolloConfig } from '../../screens/App/components/Router/apolloConfig';
import { apolloConfig as authorsPageApolloConfig } from '../../screens/App/screens/Authors/apolloConfig';
import { apolloConfig as dictionaryApolloConfig } from '../../screens/App/screens/Dictionary/apolloConfig';
import { fullquotePageApolloConfig } from '../../screens/App/screens/FullquotePage/apolloConfig';
import { quoteListPageApolloConfig } from '../../screens/App/screens/QuoteListPage/apolloConfig';
import { searchAllApolloConfig } from '../../screens/App/screens/Search/apolloConfig';
import { searchCategoryApolloConfig } from '../../screens/App/screens/SearchCategory/apolloConfig';
import { tradingIdeasApolloConfig } from '../../screens/App/screens/TradingIdeas/apolloConfig';
import {
  ROUTE_451,
  ROUTE_ALERTS,
  ROUTE_AUTHORS,
  ROUTE_CRYPTO_CURRENCIES_FULLQUOTE_PAGE,
  ROUTE_DERIVATIVES_BNP_FULLQUOTE_PAGE,
  ROUTE_DERIVATIVES_FULLQUOTE_PAGE,
  ROUTE_DERIVATIVES_FULLQUOTE_PAGE_SIMULATOR,
  ROUTE_DICTIONARY,
  ROUTE_DICTIONARY_LIST,
  ROUTE_DIVERSE_FULLQUOTE_PAGE,
  ROUTE_EMAIL_ALERTS,
  ROUTE_FONDS_FULLQUOTE_PAGE,
  ROUTE_INDICES_FULLQUOTE_PAGE,
  ROUTE_INTEREST_FULLQUOTE_PAGE,
  ROUTE_NEW_EMISSIONS_FULLQUOTE_PAGE,
  ROUTE_OBLIGATIONS_FULLQUOTE_PAGE,
  ROUTE_PORTFOLIO,
  ROUTE_PORTFOLIOS,
  ROUTE_PORTFOLIOS_ORDER,
  ROUTE_PORTFOLIO_CASH_ITEMS,
  ROUTE_PORTFOLIO_CUSTOM_VIEW,
  ROUTE_PORTFOLIO_INSTRUMENT,
  ROUTE_PORTFOLIO_TRANSACTION,
  ROUTE_PROFILE,
  ROUTE_QUOTELIST_PAGE,
  ROUTE_RAW_MATERIALS_FULLQUOTE_PAGE,
  ROUTE_SEARCH,
  ROUTE_SEARCH_SUB_CATEGORY,
  ROUTE_STOCK_FULLQUOTE_PAGE,
  ROUTE_STOCK_FULLQUOTE_PAGE_SHORT,
  ROUTE_STYLEGUIDE,
  ROUTE_TRADING_IDEAS,
  ROUTE_UNSUBSCRIBE_EMAIL_ALERTS,
  ROUTE_WATCHLIST,
  ROUTE_WATCHLIST_CUSTOM_VIEW,
  ROUTE_WIKIFOLIO_FULLQUOTE_PAGE,
} from '../../screens/App/constants';

const getFullquoteConfig = (path: string, type: string, id: string) => {
  return {
    path: path,
    apolloConfig: fullquotePageApolloConfig,
    parseTealiumData: (props: any) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: type,
          pageId: id,
        },
      }),
  };
};

const stockFullquoteShortApolloConfig: RaschApolloConfig<any> = {
  options: ({ location, params, props }) => {
    if (isStockFullquoteShorthandValorName(params?.valorName)) {
      return fullquotePageApolloConfig.options({ location, params, props });
    }

    return routerApolloConfig.options({ location, params, props });
  },
};

const routerConfig: RaschRouterConfig = {
  // created route styleguide/* to catch paragraphs and typography children of styleguide
  styleguide: { path: `${ROUTE_STYLEGUIDE}/*`, ignoreLoadingState: true },
  login: { path: `/login`, ignoreLoadingState: true },
  statusPage: {
    path: ROUTE_451,
    ignoreLoadingState: true,
  },
  userProfile: {
    path: ROUTE_PROFILE,
    ignoreLoadingState: true,
  },
  alertsPage: {
    path: ROUTE_ALERTS,
  },
  authorsPage: {
    path: ROUTE_AUTHORS,
    apolloConfig: authorsPageApolloConfig,
  },
  alertsProfile: {
    path: ROUTE_EMAIL_ALERTS,
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
  portfolioPage: {
    path: ROUTE_PORTFOLIO,
    hasCustomTracking: true,
  },
  portfoliosPage: {
    path: ROUTE_PORTFOLIOS,
    hasCustomTracking: true,
  },
  portfoliosOrderPage: {
    path: ROUTE_PORTFOLIOS_ORDER,
    hasCustomTracking: true,
  },
  portfolioPageWithKey: {
    path: `${ROUTE_PORTFOLIO}/:portfolioKey`,
    hasCustomTracking: true,
  },
  portfolioCashItems: {
    path: ROUTE_PORTFOLIO_CASH_ITEMS,
    hasCustomTracking: true,
  },
  portfolioTransaction: {
    path: ROUTE_PORTFOLIO_TRANSACTION,
  },
  portfolioInstrument: {
    path: ROUTE_PORTFOLIO_INSTRUMENT,
  },
  portfolioCustomView: {
    path: ROUTE_PORTFOLIO_CUSTOM_VIEW,
  },
  watchlistPage: {
    path: ROUTE_WATCHLIST,
    hasCustomTracking: true,
  },
  watchlistPageWithKey: {
    path: `${ROUTE_WATCHLIST}/:watchlistKey`,
    hasCustomTracking: true,
  },
  watchlistCustomView: {
    path: ROUTE_WATCHLIST_CUSTOM_VIEW,
  },
  fullquotePageStocksShort: {
    ...getFullquoteConfig(
      ROUTE_STOCK_FULLQUOTE_PAGE_SHORT,
      'Aktien',
      'fq_stock',
    ),
    apolloConfig: stockFullquoteShortApolloConfig,
  },
  fullquotePageStocks: getFullquoteConfig(
    ROUTE_STOCK_FULLQUOTE_PAGE,
    'Aktien',
    'fq_stock',
  ),
  fullquotePageIndices: getFullquoteConfig(
    ROUTE_INDICES_FULLQUOTE_PAGE,
    'Indizes',
    'fq_indices',
  ),
  fullquotePageDerivates: getFullquoteConfig(
    ROUTE_DERIVATIVES_FULLQUOTE_PAGE,
    'Derivate',
    'fq_derivates',
  ),
  fullquotePageDiverse: getFullquoteConfig(
    ROUTE_DIVERSE_FULLQUOTE_PAGE,
    'Diverse',
    'fq_diverse',
  ),
  fullquotePageFonds: getFullquoteConfig(
    ROUTE_FONDS_FULLQUOTE_PAGE,
    'Fonds',
    'fq_fonds',
  ),
  fullquotePageInterest: getFullquoteConfig(
    ROUTE_INTEREST_FULLQUOTE_PAGE,
    'Devisen-Zinsen',
    'fq_interest',
  ),
  fullquotePageRawMaterial: getFullquoteConfig(
    ROUTE_RAW_MATERIALS_FULLQUOTE_PAGE,
    'Rohstoffe-Edelmetalle',
    'fq_raw_materials',
  ),
  fullquotePageObligations: getFullquoteConfig(
    ROUTE_OBLIGATIONS_FULLQUOTE_PAGE,
    'Obligationen',
    'fq_obligations',
  ),
  fullquotePageCryptoCurrencies: getFullquoteConfig(
    ROUTE_CRYPTO_CURRENCIES_FULLQUOTE_PAGE,
    'Kryptowährungen',
    'fq_crypto_currencies',
  ),
  fullquotePageWikifolio: getFullquoteConfig(
    ROUTE_WIKIFOLIO_FULLQUOTE_PAGE,
    'Wikifolio',
    'fq_wikifolio',
  ),
  fullquoteNewEmissions: getFullquoteConfig(
    ROUTE_NEW_EMISSIONS_FULLQUOTE_PAGE,
    'Neu-Emissionen',
    'fq_new_emissions',
  ),
  fullquotePageStocksChart: getFullquoteConfig(
    `${ROUTE_STOCK_FULLQUOTE_PAGE}/chart`,
    'Aktien',
    'fq_stock_chart',
  ),
  fullquotePageIndicesChart: getFullquoteConfig(
    `${ROUTE_INDICES_FULLQUOTE_PAGE}/chart`,
    'Indizes',
    'fq_indices_chart',
  ),
  fullquotePageDerivatesChart: getFullquoteConfig(
    `${ROUTE_DERIVATIVES_FULLQUOTE_PAGE}/chart`,
    'Derivate',
    'fq_derivates_chart',
  ),
  fullquotePageDiverseChart: getFullquoteConfig(
    `${ROUTE_DIVERSE_FULLQUOTE_PAGE}/chart`,
    'Diverse',
    'fq_diverse_chart',
  ),
  fullquotePageFondsChart: getFullquoteConfig(
    `${ROUTE_FONDS_FULLQUOTE_PAGE}/chart`,
    'Fonds',
    'fq_fonds_chart',
  ),
  fullquotePageInterestChart: getFullquoteConfig(
    `${ROUTE_INTEREST_FULLQUOTE_PAGE}/chart`,
    'Devisen-Zinsen',
    'fq_interest_chart',
  ),
  fullquotePageRawMaterialChart: getFullquoteConfig(
    `${ROUTE_RAW_MATERIALS_FULLQUOTE_PAGE}/chart`,
    'Rohstoffe-Edelmetalle',
    'fq_raw_materials_chart',
  ),
  fullquotePageObligationsChart: getFullquoteConfig(
    `${ROUTE_OBLIGATIONS_FULLQUOTE_PAGE}/chart`,
    'Obligationen',
    'fq_obligations_chart',
  ),
  fullquotePageCryptoCurrenciesChart: getFullquoteConfig(
    `${ROUTE_CRYPTO_CURRENCIES_FULLQUOTE_PAGE}/chart`,
    'Kryptowährungen',
    'fq_crypto_currencies_chart',
  ),
  fullquotePageWikifolioChart: getFullquoteConfig(
    `${ROUTE_WIKIFOLIO_FULLQUOTE_PAGE}/chart`,
    'Wikifolio',
    'fq_wikifolio_chart',
  ),
  fullquoteNewEmissionsChart: getFullquoteConfig(
    `${ROUTE_NEW_EMISSIONS_FULLQUOTE_PAGE}/chart`,
    'Neu-Emissionen',
    'fq_new_emissions_chart',
  ),
  fullquoteDerivatesSimulator: {
    path: ROUTE_DERIVATIVES_FULLQUOTE_PAGE_SIMULATOR,
    apolloConfig: fullquotePageApolloConfig,
  },
  fullquoteDerivateBNP: getFullquoteConfig(
    ROUTE_DERIVATIVES_BNP_FULLQUOTE_PAGE,
    'Derivate',
    'fq_derivates_bnp',
  ),
  quoteListPage: {
    path: ROUTE_QUOTELIST_PAGE,
    apolloConfig: quoteListPageApolloConfig,
  },
  search: {
    path: ROUTE_SEARCH,
    apolloConfig: searchAllApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) => {
      const data = getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Search',
          pageId: 'search',
        },
      });
      data.cms_search_type = 'Alle';
      data.cms_search_results = countSearchResults(props);
      data.cms_search_query = props.params?.searchQuery;
      return data;
    },
  },
  searchCategory: {
    path: ROUTE_SEARCH_SUB_CATEGORY,
    apolloConfig: searchCategoryApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) => {
      const data = getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Search',
          pageId: 'search',
        },
      });
      data.cms_search_type = props.params?.searchCategory;
      data.cms_search_results = countSearchResults(props, data.cms_search_type);
      data.cms_search_query = props.params?.searchQuery;
      return data;
    },
  },
  dictionary: {
    path: ROUTE_DICTIONARY,
    apolloConfig: dictionaryApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'Dictionary',
          pageId: 'dictionary',
        },
      }),
  },
  dictionaryList: {
    path: `${ROUTE_DICTIONARY_LIST}`,
    apolloConfig: dictionaryApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'DictionaryCharList',
          pageId: `dictionary_char_list_${props.params.char}`,
        },
      }),
  },
  dictionaryChar: {
    path: `${ROUTE_DICTIONARY_LIST}/:char`,
    apolloConfig: dictionaryApolloConfig,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTealiumData: (props) =>
      getTealiumData({
        object: {
          ...props,
          preferredUri: props.location.pathname,
          __typename: 'DictionaryCharList',
          pageId: `dictionary_char_list_${props.params.char}`,
        },
      }),
  },
  tradingIdeas: {
    path: ROUTE_TRADING_IDEAS,
    apolloConfig: tradingIdeasApolloConfig,
  },
  default: {
    path: '*',
    apolloConfig: routerApolloConfig,
    fetchPolicies: { 'network-only': ['/'] },
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
