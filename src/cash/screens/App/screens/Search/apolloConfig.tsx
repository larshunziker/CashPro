/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_CMS_SEARCH_PAGE_ALL, GET_SEARCH_PAGE_ALL } from './queries';

export const searchAllApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'searchQuery' does not exist on type 'Record<string, string> | undefined'. */
    const { searchQuery = '' } = params;
    return {
      query: GET_SEARCH_PAGE_ALL,
      additionalQuery: GET_CMS_SEARCH_PAGE_ALL,
      additionalVariables: {
        query: searchQuery,
      },
      variables: {
        query: searchQuery,
        limit: PAGE_SIZE,
      },
    };
  },
};
