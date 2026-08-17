import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import { ITEMS_PER_PAGE } from './constants';
import {
  GET_WATCHLISTS,
  GET_WATCHLIST_ALERTS_BY_KEY,
  GET_WATCHLIST_BY_KEY,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
} from './queries';

export const watchlistScreenApolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    const page = location?.query?.page || 1;
    const isAuthenticated =
      (params?.isAuthenticated === 'true' && true) || false;
    return {
      query: GET_WATCHLISTS,
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

export const watchlistByKeyApolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    const watchlistKey = params?.watchlistKey;
    const page = location?.query?.page || 1;
    return {
      query: GET_WATCHLIST_BY_KEY,
      variables: {
        watchlistKey,
        publication: 'CASH',
        limit: ITEMS_PER_PAGE,
        offset: Math.abs(page - 1) * ITEMS_PER_PAGE,
      },
      ssr: false,
      skip: !watchlistKey,
    };
  },
};

export const watchlistAlertsByKeyApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const watchlistKey = params?.watchlistKey;
    return {
      query: GET_WATCHLIST_ALERTS_BY_KEY,
      variables: {
        watchlistKey,
        publication: 'CASH',
      },
      ssr: false,
    };
  },
};
