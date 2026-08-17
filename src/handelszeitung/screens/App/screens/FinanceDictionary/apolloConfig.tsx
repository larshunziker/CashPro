/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_ONMEDA_LISTING } from './queries';

export const apolloConfig: RaschApolloConfig = {
  /* @ts-ignore TODO: TS2339 ->  Property 'char' does not exist on type 'Record<string, string> | undefined'. */
  /* @ts-ignore TODO: TS2339 ->  Property 'category' does not exist on type 'Record<string, string> | undefined'. */
  options: ({ params: { char = 'A', category = 'Finanzlexikon' } }) => {
    return {
      query: GET_ONMEDA_LISTING,
      variables: {
        char: char.toUpperCase(),
        publication: 'HZ',
        category,
      },
    };
  },
};
