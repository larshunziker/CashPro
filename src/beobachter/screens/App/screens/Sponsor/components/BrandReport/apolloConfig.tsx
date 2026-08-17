import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_BEO } from '../../../../../../../shared/constants/publications';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { GET_SPONSORS } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: () => {
    return {
      query: GET_SPONSORS,
      variables: {
        publication: PUBLICATION_BEO,
      },
    };
  },
};
