import { RaschApolloConfig } from '../../../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_PORTFOLIO_BY_KEY } from './queries';

export const portfolioByKeyApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const portfolioKey = params?.portfolioKey;

    return {
      query: GET_PORTFOLIO_BY_KEY,
      variables: {
        portfolioKey,
        publication: 'CASH',
      },
      ssr: false,
      skip: !portfolioKey,
    };
  },
};
