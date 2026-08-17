/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_ID_DE, PUBLICATION_ID_FR } from '../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_PERSON_LIST_QUERY } from './queries';
import { RasRouterProps } from '../../../../components/Router/typings';

export const apolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: ({ params, props }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'char' does not exist on type 'Record<string, string> | undefined'. */
    const { char = 'A' } = params;
    /* @ts-ignore TODO: TS2339 ->  Property 'language' does not exist on type 'RasRouterProps | undefined'. */
    const { language } = props;
    return {
      query: GET_PERSON_LIST_QUERY,
      variables: {
        char: char && char.toUpperCase(),
        publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
      },
    };
  },
};
