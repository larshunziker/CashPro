/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  PUBLICATION_GROUP_BIL,
  PUBLICATION_GROUP_HZ,
} from '../../../../../shared/constants/publications';
import { ROUTE_SUBSCRIPTIONS, ROUTE_SUBSCRIPTIONS_BIL } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_SUBSCRIPTIONS } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    const subscriptionPub =
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      location.pathname === ROUTE_SUBSCRIPTIONS_BIL
        ? PUBLICATION_GROUP_BIL
        : PUBLICATION_GROUP_HZ;
    return {
      query: GET_SUBSCRIPTIONS,
      variables: {
        path: ROUTE_SUBSCRIPTIONS,
        publication: subscriptionPub,
      },
    };
  },
};
