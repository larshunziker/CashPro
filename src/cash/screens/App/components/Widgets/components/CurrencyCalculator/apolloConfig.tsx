import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_CURRENCY_CALCULATOR_CHARTS_DATA } from './queries';

export const currencyCalculatorApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'listingKey' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'from' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'to' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'max' does not exist on type 'Record<string, string> | undefined'. */
    const { listingKey, from, to, max } = params;
    return {
      query: GET_CURRENCY_CALCULATOR_CHARTS_DATA,
      variables: {
        listingKey: listingKey,
        from: from,
        to: to,
        max: max,
      },
      // need to be network-only because of the real-time price we need to get
      fetchPolicy: 'cache-first',
      ssr: false,
      skip: !listingKey,
    };
  },
};
