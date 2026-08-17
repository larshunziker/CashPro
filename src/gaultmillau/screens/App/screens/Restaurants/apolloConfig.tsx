/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  GLOBAL_SEARCH_SORT_BY_POINTS,
  GLOBAL_SEARCH_SORT_DESC,
} from '../../../../shared/constants/globalSearch';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
  URL_DE_RESTAURANTS,
  URL_FR_RESTAURANTS,
} from '../../constants';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_RESTAURANTS_QUERY } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
  options: ({ location, props: { language } }) => {
    const page = location?.query?.page || 1;
    return {
      query: GET_RESTAURANTS_QUERY,
      variables: {
        query: '*',
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        sort: [
          {
            field: GLOBAL_SEARCH_SORT_BY_POINTS,
            order: GLOBAL_SEARCH_SORT_DESC,
          },
        ],
        path: language === 'fr' ? URL_FR_RESTAURANTS : URL_DE_RESTAURANTS,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
        language: language || '',
        sticky: true,
      },
    };
  },
};
