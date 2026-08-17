/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import getEntityQueueLimitByPath from './getEntityQueueLimitByPath';
import { DEFAULT_PUBLICATION, ROUTE_HOME } from '../../../App/constants';
import { LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE } from '../../screens/LandingPage/constants';
import { OVERVIEW_PAGE_SIZE } from '../TeaserGrid/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { ROUTER_ROUTE_BY_PATH_QUERY } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const pathname = location.pathname.substr(1);
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const page = location.query?.page || 1;
    return {
      query: ROUTER_ROUTE_BY_PATH_QUERY,
      variables: {
        path: pathname ? pathname : ROUTE_HOME,
        publication: DEFAULT_PUBLICATION,
        overviewPageSize:
          page === 1 ? OVERVIEW_PAGE_SIZE + 1 : OVERVIEW_PAGE_SIZE,
        overviewPageOffset: (page - 1) * OVERVIEW_PAGE_SIZE,
        landingPageGridSize: LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE,
        landingPageGridOffset: (page - 1) * LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE,
        entityQueueLimit: getEntityQueueLimitByPath(
          pathname ? pathname : ROUTE_HOME,
        ),
      },
    };
  },
};
