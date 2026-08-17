import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_CASH_ITEMS } from './queries';

export const cashItemsApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'portfolioKey' does not exist on type 'Record<string, string> | undefined'. */
    const { portfolioKey } = params;
    return {
      query: GET_CASH_ITEMS,
      variables: {
        portfolioKey,
      },
    };
  },
};
