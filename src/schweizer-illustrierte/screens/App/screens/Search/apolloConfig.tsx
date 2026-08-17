/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_FILTER_IMAGE_GALLERY,
  GLOBAL_SEARCH_FILTER_KEYWORD_SETTINGS,
  GLOBAL_SEARCH_FILTER_LANDING_PAGE,
  GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
  GLOBAL_SEARCH_FILTER_VIDEO,
  GLOBAL_SEARCH_SORT_BY_RELEVANCE,
} from '../../../../../shared/constants/globalSearch';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_SEARCH_PAGE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const page = location.query?.page || 1;
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const sort = location.query?.sort || GLOBAL_SEARCH_SORT_BY_RELEVANCE;
    /* @ts-ignore TODO: TS2339 ->  Property 'searchQuery' does not exist on type 'Record<string, string> | undefined'. */
    const { searchQuery = '' } = params;

    return {
      query: GET_SEARCH_PAGE,
      variables: {
        query: searchQuery,
        limit: PAGE_SIZE,
        offset: Math.abs(page - 1) * PAGE_SIZE,
        sort,
        contentTypes: [
          GLOBAL_SEARCH_FILTER_ARTICLE,
          GLOBAL_SEARCH_FILTER_IMAGE_GALLERY,
          GLOBAL_SEARCH_FILTER_LANDING_PAGE,
          GLOBAL_SEARCH_FILTER_KEYWORD_SETTINGS,
          GLOBAL_SEARCH_FILTER_VIDEO,
          GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
        ],
      },
      context: {
        raschApolloService: true,
      },
    };
  },
};
