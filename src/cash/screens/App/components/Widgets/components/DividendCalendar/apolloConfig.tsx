import { RaschApolloConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
/*@ts-ignore*/
import { GET_DIVIDEND_CALENDAR, GET_QUOTES_DIVIDEND_CALENDAR } from './queries';

export const dividendCalendarApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    return {
      query: GET_DIVIDEND_CALENDAR,
      variables: {
        limit: params?.cardsPerViewport,
        offset: params?.offset || 0,
      },
      ssr: false,
      fetchPolicy: 'cache-first',
    };
  },
};

export const dividendQuoteApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    return {
      query: GET_QUOTES_DIVIDEND_CALENDAR,
      variables: {
        listingKeys: params?.instrumentKeys,
      },
      ssr: false,
      skip: !params?.instrumentKeys,
      fetchPolicy: 'cache-first',
    };
  },
};
