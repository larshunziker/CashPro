/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_FILTER_LANDING_PAGE,
  GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
  GLOBAL_SEARCH_SORT_BY_RELEVANCE,
} from '../../../../../shared/constants/globalSearch';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_SEARCH_PAGE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    const page = location?.query?.page || 1;
    const sortOrder = location?.query?.sort || GLOBAL_SEARCH_SORT_BY_RELEVANCE;
    /* @ts-ignore TODO: TS2339 ->  Property 'searchQuery' does not exist on type 'Record<string, string> | undefined'. */
    const { searchQuery = '' } = params;
    return {
      query: GET_SEARCH_PAGE,
      variables: {
        query: searchQuery && `${searchQuery}*`,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        sort: sortOrder,
        contentTypes: [
          GLOBAL_SEARCH_FILTER_ARTICLE,
          GLOBAL_SEARCH_FILTER_LANDING_PAGE,
          GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
        ],
        publication: 'HZ',
        additionalPublications: ['BIL', 'SV', 'HZB'],
      },
      // Do not execute this query if no search string was provided.
      skip: !searchQuery,
    };
  },
};
