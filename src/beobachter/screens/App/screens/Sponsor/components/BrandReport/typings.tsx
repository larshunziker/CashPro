export type BrandReportProps = {
  data: ApolloData &
    QueryRoot & {
      routeByPath: Route;
    };
  page: number;
};
