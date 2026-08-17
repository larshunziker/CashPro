export type RestaurantsMapLazyProps = {
  totalResults: number;
  results: any;
  pageResults: any;
  location: { lat: number; lng: number };
  setLocation: (props: string) => void;
  query: string;
  setQuery: (props: string) => void;
  page: number;
  setPage: (props: string) => void;
  itemsPerPage: number;
  activeMarker: string;
  setActiveMarker: (props: string) => void;
  ratingRange: string;
  setRatingRange: (props: string) => void;
  isPanelActive: string;
  setPanelActive: (props: string) => void;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  onChange: (event) => void;
  markerClusters: string;
  minZoom: string;
  maxZoom: string;
  center: string;
  zoom: string;
  routerLocation: RaschRouterLocation;
};
