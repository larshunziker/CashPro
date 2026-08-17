import { RaschApolloConfig } from '../../../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { NAVIGATION_MENU_ROUTE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  /* @ts-ignore TODO: TS2339 ->  Property 'path' does not exist on type 'Record<string, string> | undefined'. */
  options: ({ params: { path } }) => {
    return {
      query: NAVIGATION_MENU_ROUTE,
      variables: {
        path: path,
        publication: 'CASH',
      },
    };
  },
};
