import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../screens/FullquotePage/queries.js'. '/Users/bhs/code/work/rasc */
import { GET_FULLQUOTE_SERVICE_PAGE } from '../../../../screens/FullquotePage/queries.js';

// We keep our own apolloConfig and not the one from the fullquote page.
// So we don't have to overwrite the url params.
export const apolloConfig: RaschApolloConfig = {
  /* @ts-ignore TODO: TS2339 ->  Property 'path' does not exist on type 'Record<string, string> | undefined'. */
  options: ({ params: { path } }) => {
    return {
      query: GET_FULLQUOTE_SERVICE_PAGE,
      variables: {
        path: path,
        publication: 'CASH',
      },
    };
  },
};
