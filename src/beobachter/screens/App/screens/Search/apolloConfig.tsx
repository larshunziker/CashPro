import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
/* istanbul ignore file */
import {
  GLOBAL_SEARCH_SORT_BY_CHANGED,
  GLOBAL_SEARCH_SORT_BY_RELEVANCE,
} from '../../../../../shared/constants/globalSearch';
import {
  ITEMS_PER_PAGE,
  SEARCH_FILTERS_ALL,
  SEARCH_FILTERS_ARTICLE,
  SEARCH_FILTERS_BOOKS,
  SEARCH_FILTERS_DOCUMENTS,
  SEARCH_FILTERS_LEGAL_ADVICE,
  SEARCH_FILTERS_SONSTIGES,
  SEARCH_FILTERS_VIDEOS,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { SEARCH_QUERY } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    const page = location?.query?.page || 1;
    let sort = location?.query?.sort || '';
    const query = params?.query || '';
    let filter = params?.filter || '';
    if (
      ![
        SEARCH_FILTERS_ARTICLE,
        SEARCH_FILTERS_BOOKS,
        SEARCH_FILTERS_LEGAL_ADVICE,
        SEARCH_FILTERS_SONSTIGES,
        SEARCH_FILTERS_VIDEOS,
        SEARCH_FILTERS_DOCUMENTS,
      ].includes(filter)
    ) {
      filter = SEARCH_FILTERS_ALL;
    }
    if (
      ![
        GLOBAL_SEARCH_SORT_BY_RELEVANCE,
        GLOBAL_SEARCH_SORT_BY_CHANGED,
      ].includes(sort)
    ) {
      sort = GLOBAL_SEARCH_SORT_BY_RELEVANCE;
    }
    return {
      query: SEARCH_QUERY,
      variables: {
        query: query,
        limit: ITEMS_PER_PAGE,
        offset: (page - 1) * ITEMS_PER_PAGE,
        sort,
        filter,
      },
      skip: !query,
    };
  },
};
