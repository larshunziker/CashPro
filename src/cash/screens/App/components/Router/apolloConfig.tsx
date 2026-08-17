/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { ROUTE_HOME, ROUTE_HOME_HYBRID } from '../../constants';
import { LANDING_PAGE_GRID_PAGE_SIZE } from '../../screens/LandingPage/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { ROUTER_ROUTE_BY_PATH_QUERY } from './queries';
import { RasRouterProps } from './typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({ location, props }) => {
    // encoding the pathname is no longer needed, since location.pathname already returns a encoded string
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const pathname = location.pathname.slice(1, location.pathname.length);
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const page = location.query?.page || 1;
    /* @ts-ignore TODO: TS2339 ->  Property 'isHybridApp' does not exist on type 'RasRouterProps | undefined'. */
    const { isHybridApp } = props;
    const isNewsPage = pathname.includes('news/');
    let sort = null;

    if (isNewsPage) {
      sort =
        'LandingPageGridSortDate' as typeof SortTypeEnum.LandingPageGridSortDate;
    }

    let homeRoute = ROUTE_HOME;
    if (isHybridApp) {
      homeRoute = ROUTE_HOME_HYBRID;
    }

    return {
      query: ROUTER_ROUTE_BY_PATH_QUERY,
      variables: {
        path: pathname ? pathname : homeRoute,
        publication: 'CASH',
        landingPageGridPageSize: LANDING_PAGE_GRID_PAGE_SIZE,
        landingPageGridOffset: (page - 1) * LANDING_PAGE_GRID_PAGE_SIZE,
        sort,
      },
    };
  },
};
