/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  DEFAULT_PERSON_HOME_DE,
  DEFAULT_PERSON_HOME_FR,
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
} from '../../constants';
import { OVERVIEW_PAGE_ITEMS } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_PERSON_QUERY } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({ location, props }) => {
    const page = location?.query?.page || 1;
    /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
    const { language } = props;
    return {
      query: GET_PERSON_QUERY,
      variables: {
        path:
          language === 'fr' ? DEFAULT_PERSON_HOME_FR : DEFAULT_PERSON_HOME_DE,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
        overviewGridLimit: OVERVIEW_PAGE_ITEMS,
        overviewGridOffset: (page - 1) * OVERVIEW_PAGE_ITEMS,
      },
    };
  },
};
