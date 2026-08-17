/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  GLOBAL_SEARCH_SORT_BY_DATE,
  GLOBAL_SEARCH_SORT_DESC,
} from '../../../../../shared/constants/globalSearch';
import { ROUTE_HOME } from '../../constants';
import { BRANCH_PAGE_SIZE } from '../../screens/Branch/constants';
import { DOSSIER_PAGE_SIZE } from '../../screens/Dossier/constants';
import { KEYWORD_PAGE_SIZE } from '../../screens/Keywords/constants';
import { LANDING_PAGE_GRID_PAGE_SIZE } from '../../screens/LandingPage/constants';
import { ORGANIZATION_PAGE_SIZE } from '../../screens/Organization/constants';
import {
  SPONSOR_PAGE_SIZE,
  SPONSOR_PAGE_SORT_BY,
  SPONSOR_PAGE_SORT_ORDER,
} from '../../screens/Sponsor/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { ROUTER_ROUTE_BY_PATH_QUERY } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    // encoding the pathname is no longer needed, since location.pathname already returns a encoded string
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const pathname = location.pathname.substr(1);
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const page = location.query?.page || 1;

    return {
      query: ROUTER_ROUTE_BY_PATH_QUERY,
      variables: {
        path: pathname ? pathname : ROUTE_HOME,
        publication: 'HZ',
        additionalPublications: ['BIL', 'SV', 'HZB'],
        landingPageGridPageSize: LANDING_PAGE_GRID_PAGE_SIZE,
        landingPageGridOffset: (page - 1) * LANDING_PAGE_GRID_PAGE_SIZE,
        branchPageSize: BRANCH_PAGE_SIZE,
        branchOffset: (page - 1) * BRANCH_PAGE_SIZE,
        keywordsPageSize: KEYWORD_PAGE_SIZE,
        keywordsOffset: (page - 1) * KEYWORD_PAGE_SIZE,
        dossierPageSize: DOSSIER_PAGE_SIZE,
        dossierOffset: (page - 1) * DOSSIER_PAGE_SIZE,
        sponsorLimit: SPONSOR_PAGE_SIZE,
        sponsorSortBy: SPONSOR_PAGE_SORT_BY,
        sponsorOffset: (page - 1) * SPONSOR_PAGE_SIZE,
        sponsorSortOrder: SPONSOR_PAGE_SORT_ORDER,
        organizationOffset: (page - 1) * ORGANIZATION_PAGE_SIZE,
        organizationLimit: ORGANIZATION_PAGE_SIZE,
        organizationSortBy: GLOBAL_SEARCH_SORT_BY_DATE,
        organizationSortOrder: GLOBAL_SEARCH_SORT_DESC,
      },
    };
  },
};
