/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_GROUP_HZ } from '../../../../../shared/constants/publications';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_KEYWORD_LISTING } from './queries';

export const apolloConfig: RaschApolloConfig = {
  /* @ts-ignore TODO: TS2339 ->  Property 'searchString' does not exist on type 'Record<string, string> | undefined'. */
  options: ({ params: { searchString = 'A' } }) => ({
    query: GET_KEYWORD_LISTING,
    variables: {
      searchString: searchString && `${searchString.toUpperCase()}`,
      publication: PUBLICATION_GROUP_HZ,
    },
    skip: !!(searchString && searchString.length > 1),
  }),
};
