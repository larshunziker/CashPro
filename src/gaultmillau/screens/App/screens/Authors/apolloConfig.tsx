/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_ID_DE, PUBLICATION_ID_FR } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_AUTHORS_PAGE } from './queries';
import { RasRouterProps } from '../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({ location, props }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
    const { language } = props;
    const path = location?.pathname?.substr(1);
    return {
      query: GET_AUTHORS_PAGE,
      variables: {
        path,
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
      },
    };
  },
};
