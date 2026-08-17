import { ApolloError } from '@apollo/client';

export type QueryResult = {
  quoteList: {
    quoteList: {
      edges: { node: Instrument }[];
    };
  };
};

export type TraderInfoProps = {
  fields: any;
  instrument: Partial<Instrument>;
  loading: boolean;
  error: ApolloError;
  barPercentages: { ask: number; bid: number };
  tradeType: string;
  hrefBuy: string;
};
