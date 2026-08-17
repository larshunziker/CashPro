export type SearchProps = {
  page: number;
  loading: boolean;
  language: string;
  query: string;
  data: ApolloData & {
    environment: {
      globalSearch: TeasableInterfaceGraphList & { count: string };
    };
  };
};
