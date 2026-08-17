import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import { ITEMS_PER_PAGE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_ALERTS_LIST_EXTERNAL } from './queries';

export const alertsScreenApolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    const page = location?.query?.page || 1;
    return {
      query: GET_ALERTS_LIST_EXTERNAL,
      variables: {
        publication: 'CASH',
        limit: ITEMS_PER_PAGE,
        offset: Math.abs(page - 1) * ITEMS_PER_PAGE,
        cacheBustor: '',
      },
    };
  },
};
