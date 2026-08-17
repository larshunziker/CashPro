import { ApolloError } from '@apollo/client';

export type MarketTableProps = {
  title: { label: string; url: string };
  instruments: Instrument[];
  fields: Record<string, string>;
  loading: boolean;
  error: ApolloError;
  rows: number;
  message?: string;
};
