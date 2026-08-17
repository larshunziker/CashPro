import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_MINI_PORTFOLIO } from './queries';

export const miniPortfolioApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const portfolioKey = params?.portfolioKey;

    return {
      query: GET_MINI_PORTFOLIO,
      variables: {
        portfolioKey,
        publication: 'CASH',
      },
      ssr: false,
      skip: !portfolioKey,
    };
  },
};
