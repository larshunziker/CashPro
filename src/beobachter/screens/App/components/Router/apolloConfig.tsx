/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  DEFAULT_PUBLICATION,
  ROUTE_HOME,
  ROUTE_LEGAL_ADVICE,
} from '../../constants';
import { KEYWORD_PAGE_SIZE } from '../../screens/Keywords/screens/KeywordArticlesList/constants';
import {
  LANDING_PAGE_GRID_PAGE_SIZE,
  LANDING_PAGE_LEGAL_ADVICE_PAGE_SIZE,
} from '../../screens/LandingPage/constants';
import { PUBLICATION_GROUP_RECHTSRATGEBER } from '../../../../../shared/constants/publications';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { ROUTER_ROUTE_BY_PATH_QUERY } from './queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/LegalAdvice/LandingPage/queries'. '/Users/bhs/code/work/ras */
import { GET_LEGAL_ADVICE_DATA } from '../../screens/LegalAdvice/LandingPage/queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    // encoding the pathname is no longer needed, since location.pathname already returns a encoded string
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const pathname = location.pathname.substr(1);
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const page = location.query?.page || 1;
    let additionalQueries = {};

    if (
      pathname.startsWith(ROUTE_LEGAL_ADVICE) &&
      pathname.split('/').length <= 5
    ) {
      const {
        q: searchQuery = '',
        types: types = '',
        kmu = '',
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      } = location.query;
      const hasKMUAccess = !!kmu;
      additionalQueries = {
        additionalQuery: GET_LEGAL_ADVICE_DATA,
        additionalVariables: {
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          path: location.pathname,
          query: searchQuery,
          limit: LANDING_PAGE_LEGAL_ADVICE_PAGE_SIZE,
          offset: LANDING_PAGE_LEGAL_ADVICE_PAGE_SIZE * (page - 1),
          types: types,
          hasKMUAccess,
        },
      };
    }

    return {
      query: ROUTER_ROUTE_BY_PATH_QUERY,
      variables: {
        path: pathname ? pathname : ROUTE_HOME,
        publication: DEFAULT_PUBLICATION,
        additionalPublications: [PUBLICATION_GROUP_RECHTSRATGEBER],
        landingPageGridPageSize: LANDING_PAGE_GRID_PAGE_SIZE,
        landingPageGridOffset: (page - 1) * LANDING_PAGE_GRID_PAGE_SIZE,
        keywordsPageSize: KEYWORD_PAGE_SIZE,
        keywordsOffset: (page - 1) * KEYWORD_PAGE_SIZE,
      },
      context: {
        sharingPlus: location?.query?.sharingPlus,
      },
      ...additionalQueries,
    };
  },
};
