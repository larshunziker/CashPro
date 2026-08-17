export type KeywordsProps = {
  data: ApolloData & {
    environment: {
      keywordsByChar: KeywordConnection;
    };
  };
  page: number;
};
