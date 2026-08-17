/* istanbul ignore file */

import { mapUrlToRecipeCategoryEnum } from '../../../../shared/helpers/recipeCategoryUrlMap';
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  GLOBAL_SEARCH_FILTER_RECIPE,
  GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
  GLOBAL_SEARCH_SORT_DESC,
} from '../../../../../shared/constants/globalSearch';
import { GLOBAL_SEARCH_FILTER_KEYWORD } from '../../../../shared/constants/globalSearch';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
  URL_DE_RECIPES,
  URL_FR_RECIPES,
} from '../../constants';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_RECIPES_QUERY } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
  options: ({ location, params, props: { language } }) => {
    const page = location?.query?.page || 1;
    /* @ts-ignore TODO: TS2339 ->  Property 'recipeCategory' does not exist on type 'Record<string, string> | undefined'. */
    const { recipeCategory = 'all' } = params;

    return {
      query: GET_RECIPES_QUERY,
      variables: {
        query:
          (mapUrlToRecipeCategoryEnum(recipeCategory.toLowerCase())
            .recipeCategoryEnum === 'all' &&
            '') ||
          mapUrlToRecipeCategoryEnum(recipeCategory.toLowerCase())
            .recipeCategoryEnum,
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
        sortOrder: GLOBAL_SEARCH_SORT_DESC,
        filter: GLOBAL_SEARCH_FILTER_KEYWORD,
        path: language === 'fr' ? URL_FR_RECIPES : URL_DE_RECIPES,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
        contentTypes: [GLOBAL_SEARCH_FILTER_RECIPE],
      },
    };
  },
};
