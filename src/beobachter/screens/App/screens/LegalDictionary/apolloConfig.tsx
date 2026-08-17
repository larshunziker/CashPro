/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { PUBLICATION_BEO } from '../../../../../shared/constants/publications';
import { EXPLAINING_TYPE_LEGAL_DICTIONARY } from '../././ExplainingArticles/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../././ExplainingArticles/queries'. '/Users/bhs/code/work/rasch-stack/src */
import { GET_EXPLAINING_PAGE } from '../././ExplainingArticles/queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({
    /* @ts-ignore TODO: TS2339 ->  Property 'char' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'category' does not exist on type 'Record<string, string> | undefined'. */
    params: { char = 'A', category = EXPLAINING_TYPE_LEGAL_DICTIONARY },
  }) => {
    if (char.length > 1) {
      char = char.substring(0, 1);
    }
    return {
      query: GET_EXPLAINING_PAGE,
      variables: {
        char: char.toUpperCase(),
        category: category.charAt(0).toUpperCase() + category.slice(1),
        publication: PUBLICATION_BEO,
      },
    };
  },
};
