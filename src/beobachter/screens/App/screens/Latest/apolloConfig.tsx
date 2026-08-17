/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PAGE_SIZE } from './constants';
import {
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE } from '../../../../../shared/constants/globalSearch';
import { DEFAULT_PUBLICATION, ROUTE_LATEST } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { LATEST_QUERY } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    const page = location?.query?.page || 1;

    return {
      query: LATEST_QUERY,
      variables: {
        contentTypes: [
          ARTICLE_CONTENT_TYPE,
          IMAGE_GALLERY_CONTENT_TYPE,
          VIDEO_CONTENT_TYPE,
        ],
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        path: ROUTE_LATEST,
        publication: DEFAULT_PUBLICATION,
        query: `*`,
        sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
      },
      context: {
        raschApolloService: true,
      },
    };
  },
};
