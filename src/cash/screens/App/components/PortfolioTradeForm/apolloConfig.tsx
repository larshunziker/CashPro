import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_TRANSACTION, GET_TRANSACTION_INFO } from './queries';

export const transactionApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'portfolioKey' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'instrumentKey' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'transactionKey' does not exist on type 'Record<string, string> | undefined'. */
    const { portfolioKey, instrumentKey, transactionKey } = params;
    const isOtherAsset = !!params?.isOtherAsset;
    return {
      query: GET_TRANSACTION,
      variables: {
        portfolioKey: portfolioKey,
        instrumentKey: instrumentKey,
        transactionKey: transactionKey || '',
        isOtherAsset: isOtherAsset,
      },
      ssr: false,
      skip: !portfolioKey,
    };
  },
};

export const transactionInfoApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'portfolioKey' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'instrumentKey' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'portfolioCurrency' does not exist on type 'Record<string, string> | undefined'. */
    const { portfolioKey, instrumentKey, portfolioCurrency } = params;
    const isOtherAsset = !!params?.isOtherAsset;
    return {
      query: GET_TRANSACTION_INFO,
      variables: {
        portfolioKey: portfolioKey,
        instrumentKey: instrumentKey,
        portfolioCurrency: portfolioCurrency,
        isOtherAsset: isOtherAsset,
      },
      // need to be network-only because of the real-time price we need to get
      fetchPolicy: 'network-only',
      ssr: false,
      skip: !portfolioKey,
    };
  },
};
