import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_RATE_BY_CURRENCY } from './queries';

export const rateByCurrencyApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'portfolioCurrency' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'currency' does not exist on type 'Record<string, string> | undefined'. */
    const { portfolioCurrency, currency } = params;
    return {
      query: GET_RATE_BY_CURRENCY,
      variables: {
        portfolioCurrency: portfolioCurrency,
        currency: currency,
      },
      fetchPolicy: 'network-only',
      ssr: false,
      skip: !portfolioCurrency || !currency,
    };
  },
};
