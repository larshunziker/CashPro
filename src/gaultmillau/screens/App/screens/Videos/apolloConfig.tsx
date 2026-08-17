/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE } from '../../../../../shared/constants/globalSearch';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
  URL_DE_VIDEOS,
  URL_FR_VIDEOS,
} from '../../../App/constants';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_VIDEO_PAGE } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({ location, props }) => {
    const page = location?.query?.page || 1;
    /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
    const { language } = props;

    return {
      query: GET_VIDEO_PAGE,
      variables: {
        query: '',
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        hasVideo: true,
        sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
        path: language === 'fr' ? URL_FR_VIDEOS : URL_DE_VIDEOS,
      },
    };
  },
};
