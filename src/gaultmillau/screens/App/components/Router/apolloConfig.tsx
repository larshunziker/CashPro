/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_ID_DE, PUBLICATION_ID_FR } from '../../constants';
import { KEYWORD_PAGE_SIZE } from '../../screens/Keywords/constants';
import {
  LANDING_PAGE_GRID_ITEMS,
  LANDING_PAGE_HOME_GRID_ITEMS,
} from '../../screens/LandingPage/constants';
import { HOME_ALIAS_DE, HOME_ALIAS_FR } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { ROUTER_ROUTE_BY_PATH_QUERY } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({ location, props }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
    const { language } = props;
    // encoding the pathname is no longer needed, since location.pathname already returns a encoded string
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    let pathname = location.pathname.substr(1);
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const page = location.query?.page || 1;

    if (language === 'fr' && pathname === 'fr') {
      pathname = HOME_ALIAS_FR;
    } else if (!pathname && language === 'de') {
      pathname = HOME_ALIAS_DE;
    }

    const isHome: boolean =
      pathname === HOME_ALIAS_DE || pathname === HOME_ALIAS_FR;

    let additionalPublications: string[] = [];
    if (pathname.startsWith('node/')) {
      additionalPublications = [PUBLICATION_ID_FR];
    }

    return {
      query: ROUTER_ROUTE_BY_PATH_QUERY,
      variables: {
        path: pathname,
        landingPageGridLimit: isHome
          ? LANDING_PAGE_HOME_GRID_ITEMS
          : LANDING_PAGE_GRID_ITEMS,
        landingPageGridOffset: isHome
          ? 0
          : (page - 1) * LANDING_PAGE_GRID_ITEMS,
        keywordsPageSize: KEYWORD_PAGE_SIZE,
        keywordsOffset: (page - 1) * KEYWORD_PAGE_SIZE,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
        additionalPublications,
        language: language || '',
      },
    };
  },
};
