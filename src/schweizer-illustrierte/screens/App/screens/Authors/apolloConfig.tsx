/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_AUTHORS_PAGE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    const path = location?.pathname?.substr(1);
    return {
      query: GET_AUTHORS_PAGE,
      variables: {
        path,
      },
    };
  },
};
