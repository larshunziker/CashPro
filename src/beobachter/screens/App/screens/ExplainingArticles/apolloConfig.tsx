/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_BEO } from '../../../../../shared/constants/publications';
import { EXPLAINING_TYPE_LEGAL_DICTIONARY } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { GET_EXPLAINING_PAGE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({
    /* @ts-ignore TODO: TS2339 ->  Property 'char' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'category' does not exist on type 'Record<string, string> | undefined'. */
    params: { char = 'A', category = EXPLAINING_TYPE_LEGAL_DICTIONARY },
  }) => {
    return {
      query: GET_EXPLAINING_PAGE,
      variables: {
        char: char && `${char.toUpperCase()}`,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        publication: PUBLICATION_BEO,
      },
      skip: char.length > 1,
    };
  },
};
