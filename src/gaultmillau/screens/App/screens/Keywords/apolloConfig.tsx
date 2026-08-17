/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_ID_DE, PUBLICATION_ID_FR } from '../../constants';
import { KEYWORD_PAGE_SIZE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_KEYWORDS_QUERY } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({
    location,
    /* @ts-ignore TODO: TS2339 ->  Property 'searchString' does not exist on type 'Record<string, string> | undefined'. */
    params: { searchString = 'A' },
    /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
    props: { language },
  }) => {
    const page = location?.query?.page || 1;
    return {
      query: GET_KEYWORDS_QUERY,
      variables: {
        searchString: searchString.toUpperCase(),
        pageSize: KEYWORD_PAGE_SIZE,
        offset: (page - 1) * KEYWORD_PAGE_SIZE,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
      },
      skip: !!(searchString && searchString.length > 1),
    };
  },
};
