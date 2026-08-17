import { RestaurantsMapLazyProps } from '../../typings';

export type RestaurantsPanelProps = Pick<
  RestaurantsMapLazyProps,
  | 'ratingRange'
  | 'itemsPerPage'
  | 'setRatingRange'
  | 'totalResults'
  | 'page'
  | 'setPage'
> & {
  data: ApolloData;
  query: string;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  setLocation: (boolean) => void;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  setQuery: (string) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  /* @ts-ignore TODO: TS7008 ->  Member 'activeMarker' implicitly has an 'any' type. */
  activeMarker;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  setActiveMarker: (boolean) => void;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  setPanelActive: (boolean) => void;
  routerLocation: RaschRouterLocation;
};
