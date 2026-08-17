import { ApolloError } from '@apollo/client';

export type QueryResult = {
  quoteList: {
    quoteList: {
      edges: { node: Instrument }[];
    };
  };
};

export type PriceDataProps = {
  fields: any;
  loading: boolean;
  error: ApolloError;
  isAlertForm: boolean;
  curr: string;
  instrument: Partial<Instrument>;
};
