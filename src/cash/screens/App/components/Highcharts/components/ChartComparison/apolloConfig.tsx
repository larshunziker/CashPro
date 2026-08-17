/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import { isListingKeyList } from '../../../../screens/MyCash/components/Portfolio/helpers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_CHART_COMPARISON_DATA } from './queries';

export const apolloConfig: RaschApolloConfig = {
  /* @ts-ignore TODO: TS2339 ->  Property 'listingKeys' does not exist on type 'Record<string, string> | undefined'. */
  options: ({ params: { listingKeys } }) => {
    return {
      query: GET_CHART_COMPARISON_DATA,
      variables: {
        listingKeys,
      },
      skip: !listingKeys || !isListingKeyList(listingKeys),
    };
  },
};
