import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import { ITEMS_PER_PAGE } from './constants';
import {
  GET_PORTFOLIOS,
  GET_PORTFOLIO_ALERTS_BY_KEY,
  GET_PORTFOLIO_BY_KEY,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
} from './queries';

export const portfolioScreenApolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    const page = location?.query?.page || 1;
    const isAuthenticated =
      (params?.isAuthenticated === 'true' && true) || false;

    return {
      query: GET_PORTFOLIOS,
      variables: {
        publication: 'CASH',
        limit: ITEMS_PER_PAGE,
        offset: Math.abs(page - 1) * ITEMS_PER_PAGE,
      },
      ssr: false,
      skip: !isAuthenticated,
    };
  },
};

export const portfolioByKeyApolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    const portfolioKey = params?.portfolioKey;
    const page = location?.query?.page || 1;

    return {
      query: GET_PORTFOLIO_BY_KEY,
      variables: {
        portfolioKey,
        publication: 'CASH',
        limit: ITEMS_PER_PAGE,
        offset: Math.abs(page - 1) * ITEMS_PER_PAGE,
        withTransaction: params?.withTransaction === 'true',
      },
      ssr: false,
      skip: !portfolioKey,
    };
  },
};

export const portfolioAlertsByKeyApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const portfolioKey = params?.portfolioKey;

    return {
      query: GET_PORTFOLIO_ALERTS_BY_KEY,
      variables: {
        portfolioKey,
        publication: 'CASH',
      },
      ssr: false,
    };
  },
};
