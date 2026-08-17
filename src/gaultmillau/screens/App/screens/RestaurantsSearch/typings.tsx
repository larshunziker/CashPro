export type RestaurantSearchProps = {
  data: ApolloData & {
    environment: {
      restaurantsSearch: Record<string, any>;
      routeByPath: {
        object: {
          grid: Record<string, any>;
          editContentUri: string;
          editRelationUri: string;
          cloneContentUri: string;
          seoTitle: string;
          title: string;
          lead: string;
        };
      };
    };
  };
  page: string;
  language?: string;
  query?: string;
};
