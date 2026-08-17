/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import { GLOBAL_SEARCH_SORT_BY_RELEVANCE } from '../../../../../../../shared/constants/globalSearch';
import { ITEMS_LIMIT } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_TERM_OCCURRENCE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  /* @ts-ignore TODO: TS2339 ->  Property 'term' does not exist on type 'Record<string, string> | undefined'. */
  options: ({ params: { term } }) => {
    return {
      query: GET_TERM_OCCURRENCE,
      variables: {
        contentTypes: ['Article'],
        limit: ITEMS_LIMIT,
        publication: 'HZ',
        sort: GLOBAL_SEARCH_SORT_BY_RELEVANCE,
        query: `${term}*`,
      },
    };
  },
};
