import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_FULLQUOTE_PAGE_EXTENDED } from './queries';

export const apolloConfig: RaschApolloConfig = {
  /* @ts-ignore TODO: TS2339 ->  Property 'listingId' does not exist on type 'Record<string, string> | undefined'. */
  /* @ts-ignore TODO: TS2339 ->  Property 'path' does not exist on type 'Record<string, string> | undefined'. */
  options: ({ params: { listingId, path } }) => {
    return {
      query: GET_FULLQUOTE_PAGE_EXTENDED,
      variables: {
        listingId: listingId,
        path: path,
        publication: 'CASH',
      },
    };
  },
};
