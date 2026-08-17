/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { GLOBAL_SEARCH_SORT_BY_RELEVANCE } from '../../../../../shared/constants/globalSearch';
import { PAGE_SIZE } from './constants';
import {
  GET_CMS_SEARCH_PAGE_CATEGORY,
  GET_SEARCH_PAGE_CATEGORY,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
} from './queries';

const searchCategoryMapping = {
  news: 'News',
  aktien: 'Equity',
  derivate: 'Derivative',
  diverse: 'Diverse',
  currency: 'Currency',
  etf: 'ETF',
  fonds: 'Fund',
  indizes: 'Index',
  bonds: 'Bond',
  kryptowaehrungen: 'CryptoCurrency',
  wikifolio: 'WikiFolio',
  neuemissionen: 'NewEmission',
};

export const searchCategoryApolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'searchQuery' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'searchCategory' does not exist on type 'Record<string, string> | undefined'. */
    const { searchQuery = '', searchCategory = '' } = params;
    const page = location?.query?.page || 1;
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ news */
    const category = searchCategory && searchCategoryMapping[searchCategory];
    const sortOrder = location?.query?.sort || GLOBAL_SEARCH_SORT_BY_RELEVANCE;

    return {
      query: GET_SEARCH_PAGE_CATEGORY,
      additionalQuery: GET_CMS_SEARCH_PAGE_CATEGORY,
      additionalVariables: {
        sort: sortOrder,
        query: searchQuery,
        limit: PAGE_SIZE,
        offset: Math.abs(page - 1) * PAGE_SIZE,
      },
      variables: {
        query: searchQuery,
        category: category,
        limit: PAGE_SIZE,
        offset: Math.abs(page - 1) * PAGE_SIZE,
      },
    };
  },
};
