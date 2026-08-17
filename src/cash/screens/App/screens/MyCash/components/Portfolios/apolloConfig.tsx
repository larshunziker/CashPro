import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_PORTFOLIOS, GET_PORTFOLIOS_CALCULATED } from './queries';

export const portfoliosApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const isAuthenticated =
      (params?.isAuthenticated === 'true' && true) || false;

    return {
      query: GET_PORTFOLIOS,
      variables: {
        publication: 'CASH',
      },
      ssr: false,
      skip: !isAuthenticated,
    };
  },
};

export const portfoliosCalculatedScreenApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const isAuthenticated =
      (params?.isAuthenticated === 'true' && true) || false;

    return {
      query: GET_PORTFOLIOS_CALCULATED,
      variables: {
        publication: 'CASH',
      },
      ssr: false,
      skip: !isAuthenticated,
    };
  },
};
