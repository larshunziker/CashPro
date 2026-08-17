export type RestaurantMapProps = Pick<RouterProps, 'location' | 'page'> & {
  restaurantsData: ApolloData;
  language?: string;
  query?: string;
  RestaurantsMapLazy: JSX.Element;
};
