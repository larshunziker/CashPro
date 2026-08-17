/* istanbul ignore file */

import { mapUrlToPopCityEnum } from '../../../../shared/helpers/popRestaurantsUrlMap';
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { GLOBAL_SEARCH_SORT_DESC } from '../../../../../shared/constants/globalSearch';
import { GLOBAL_SEARCH_SORT_BY_DATE_DATE } from '../../../../shared/constants/globalSearch';

import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
  URL_DE_POP_RESTAURANTS,
  URL_FR_POP_RESTAURANTS,
} from '../../constants';
import {
  PAGE_SIZE,
  SEARCH_FILTER,
  SEARCH_ORGANIZATION_TYPE,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_POP_RESTAURANTS_QUERY } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({ location, params, props }) => {
    const page = location?.query?.page || 1;
    /* @ts-ignore TODO: TS2339 ->  Property 'popCity' does not exist on type 'Record<string, string> | undefined'. */
    const { popCity = '' } = params;
    /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
    const { language } = props;
    return {
      query: GET_POP_RESTAURANTS_QUERY,
      variables: {
        query: '',
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        sort: GLOBAL_SEARCH_SORT_BY_DATE_DATE,
        sortOrder: GLOBAL_SEARCH_SORT_DESC,
        path:
          language === 'fr' ? URL_FR_POP_RESTAURANTS : URL_DE_POP_RESTAURANTS,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
        language: language || '',
        popCity: mapUrlToPopCityEnum(popCity.toLowerCase()).popCityEnum,
        organizationType: SEARCH_ORGANIZATION_TYPE,
        filter: SEARCH_FILTER,
      },
    };
  },
};
