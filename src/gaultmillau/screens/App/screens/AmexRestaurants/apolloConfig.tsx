/* istanbul ignore file */

import { mapUrlToAmexProvinceEnum } from '../../../../shared/helpers/amexRestaurantsUrlMap';
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { GLOBAL_SEARCH_SORT_DESC } from '../../../../../shared/constants/globalSearch';

import { PUBLICATION_ID_DE, URL_DE_AMEX_RESTAURANTS } from '../../constants';
import {
  PAGE_SIZE,
  SEARCH_FILTER,
  SEARCH_ORGANIZATION_TYPE,
} from './constants';
import {
  GET_AMEX_RESTAURANTS_QUERY,
  GET_ALL_AMEX_RESTAURANTS_QUERY,
  // @ts-ignore
} from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({ location, params }) => {
    const page = location?.query?.page || 1;
    /* @ts-ignore TODO: TS2339 ->  Property 'province' does not exist on type 'Record<string, string> | undefined'. */
    const { province = '' } = params;
    const provinceMapped = mapUrlToAmexProvinceEnum(
      province.toLowerCase(),
    ).amexProvinceEnum;

    if (provinceMapped === 'All') {
      return {
        query: GET_ALL_AMEX_RESTAURANTS_QUERY,
        variables: {
          query: '',
          pageSize: PAGE_SIZE,
          offset: (page - 1) * PAGE_SIZE,
          sortOrder: GLOBAL_SEARCH_SORT_DESC,
          path: URL_DE_AMEX_RESTAURANTS,
          publication: PUBLICATION_ID_DE,
          language: 'de',
          organizationType: SEARCH_ORGANIZATION_TYPE,
          filter: SEARCH_FILTER,
        },
      };
    }

    return {
      query: GET_AMEX_RESTAURANTS_QUERY,
      variables: {
        query: '',
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        sortOrder: GLOBAL_SEARCH_SORT_DESC,
        path: URL_DE_AMEX_RESTAURANTS,
        publication: PUBLICATION_ID_DE,
        language: 'de',
        province: provinceMapped,
        organizationType: SEARCH_ORGANIZATION_TYPE,
        filter: SEARCH_FILTER,
      },
    };
  },
};
