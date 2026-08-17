/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
} from '../../../../../shared/constants/globalSearch';
import {
  ARTICLE_TYPE_BLOG_B,
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
} from '../../constants';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_ARTICLE_BLOG_B } from './queries';
import { BlogBProps } from './typings';

export const apolloConfig: RaschApolloConfig<BlogBProps> = {
  /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'BlogBProps | undefined'. */
  options: ({ location, props: { language } }) => {
    const page = location?.query?.page || 1;
    return {
      query: GET_ARTICLE_BLOG_B,
      variables: {
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        path: location.pathname.substr(1),
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
        query: '',
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        filter: GLOBAL_SEARCH_FILTER_ARTICLE,
        articleType: ARTICLE_TYPE_BLOG_B,
        sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
      },
    };
  },
};
