/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_BEO } from '../../../../../shared/constants/publications';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { GET_KEYWORDS } from './queries';

export const apolloConfig: RaschApolloConfig = {
  /* @ts-ignore TODO: TS2339 ->  Property 'searchString' does not exist on type 'Record<string, string> | undefined'. */
  options: ({ params: { searchString = 'A' } }) => ({
    query: GET_KEYWORDS,
    variables: {
      searchString: searchString && searchString.toUpperCase(),
      publication: PUBLICATION_BEO,
    },
  }),
};
