/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { GLOBAL_SEARCH_SORT_BY_RELEVANCE } from '../../../../../shared/constants/globalSearch';
import { PUBLICATION_ID_DE, PUBLICATION_ID_FR } from '../../constants';
import { PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_SEARCH_PAGE } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
  options: ({ location, params, props: { language } }) => {
    const page = location?.query?.page || 1;
    const sortOrder = location?.query?.sort || GLOBAL_SEARCH_SORT_BY_RELEVANCE;
    /* @ts-ignore TODO: TS2339 ->  Property 'query' does not exist on type 'Record<string, string> | undefined'. */
    const { query = '' } = params;
    return {
      query: GET_SEARCH_PAGE,
      variables: {
        query: query && `${query}*`,
        pageSize: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        sort: sortOrder,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
        language: language || 'de',
      },
      // Do not execute this query if no search string was provided.
      skip: !query,
    };
  },
};
