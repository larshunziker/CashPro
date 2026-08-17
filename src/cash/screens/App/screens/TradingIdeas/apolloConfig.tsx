/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { ROUTE_TRADING_IDEAS } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_TRADING_IDEAS_PAGE, GET_TRADING_IDEAS_PORTFOLIO } from './queries';

export const tradingIdeasApolloConfig: RaschApolloConfig = {
  options: () => {
    return {
      query: GET_TRADING_IDEAS_PORTFOLIO, // gql-service
      additionalQuery: GET_TRADING_IDEAS_PAGE, // cms
      additionalVariables: {
        path: ROUTE_TRADING_IDEAS,
        publication: 'CASH',
      },
      variables: {
        pathname: `/${ROUTE_TRADING_IDEAS}`,
        publication: 'CASH',
      },
    };
  },
};
