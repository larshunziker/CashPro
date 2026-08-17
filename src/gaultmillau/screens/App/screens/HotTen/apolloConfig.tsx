/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { ARTICLE_TYPE_HOT_TEN } from '../../../../../shared/constants/content';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
} from '../../../../../shared/constants/globalSearch';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_ARTICLE_HOT_TEN } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    const page = location?.query?.page || 1;

    return {
      query: GET_ARTICLE_HOT_TEN,
      variables: {
        query: '',
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
        filter: GLOBAL_SEARCH_FILTER_ARTICLE,
        articleType: ARTICLE_TYPE_HOT_TEN,
      },
    };
  },
};
