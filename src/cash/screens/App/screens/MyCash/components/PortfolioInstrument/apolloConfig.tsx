import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_PORTFOLIO_TRANSACTIONS } from './queries';

export const portfolioTransactionsApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const portfolioKey = params?.portfolioKey;
    return {
      query: GET_PORTFOLIO_TRANSACTIONS,
      variables: {
        publication: 'CASH',
        portfolioKey: portfolioKey,
      },
      ssr: false,
      skip: !portfolioKey,
    };
  },
};
