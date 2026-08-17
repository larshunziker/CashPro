/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_SPONSORS } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: () => {
    return {
      query: GET_SPONSORS,
      variables: {
        path: 'brandreport',
        publication: 'HZ',
        additionalPublications: ['BIL', 'SV', 'HZB'],
      },
    };
  },
};
