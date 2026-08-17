export type PersonProps = {
  page: number;
  data: ApolloData & {
    environment: {
      routeByPath: {
        object: {
          grid: Record<string, any>;
          editContentUri: string;
          editRelationUri: string;
          cloneContentUri: string;
        };
      };
    };
  };
};
