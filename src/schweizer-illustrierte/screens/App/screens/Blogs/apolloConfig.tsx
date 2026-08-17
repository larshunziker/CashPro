/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  CHANNEL_TYPE_BLOGS,
  DEFAULT_PUBLICATION,
  OVERVIEW_VISIBLE_TYPE_BLOGS,
  ROUTE_SI_BLOGS,
  SI_CHANNELS_VOCABULARY,
} from '../../constants';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_BLOGS_PAGE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const page = location.query?.page || 1;
    return {
      query: GET_BLOGS_PAGE,
      variables: {
        publication: DEFAULT_PUBLICATION,
        path: ROUTE_SI_BLOGS,
        vid: SI_CHANNELS_VOCABULARY,
        channelType: [CHANNEL_TYPE_BLOGS],
        overviewPageVisibility: [OVERVIEW_VISIBLE_TYPE_BLOGS],
        overviewPageSize: page === 1 ? PAGE_SIZE + 1 : PAGE_SIZE,
        overviewPageOffset: (page - 1) * PAGE_SIZE,
      },
      context: {
        raschApolloService: true,
      },
    };
  },
};
