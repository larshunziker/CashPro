/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { DEFAULT_PUBLICATION, ROUTE_HOROSCOPE } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_HOROSCOPE_PAGE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: () => {
    return {
      query: GET_HOROSCOPE_PAGE,
      variables: {
        publication: DEFAULT_PUBLICATION,
        path: ROUTE_HOROSCOPE,
        entityQueueLimit: -1,
      },
      context: {
        raschApolloService: true,
      },
    };
  },
};
