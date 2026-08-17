import React, { Component, createElement } from 'react';
import {
  compose,
  defaultProps,
  mapProps,
  withHandlers,
  withPropsOnChange,
  withState,
} from 'recompose';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'google-map-react'. '/Users/bhs/code/work/rasch-stack/node_modules/google- */
import { fitBounds } from 'google-map-react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.sortby'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.sor */
import sortBy from 'lodash.sortby';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'points-cluster'. '/Users/bhs/code/work/rasch-stack/node_modules/points-cl */
import calculateClusters from 'points-cluster';
import { normalizeRestaurants } from './helpers';
import withPagerState from '../../../../../../../shared/decorators/withPagerState';
import withViewportProps from '../../../../../../shared/decorators/withViewportProps';
import GoogleMap from './components/GoogleMap';
import RestaurantsPanel from './components/RestaurantsPanel';
import createResultsSelector from './selectors';
import { MAX_RATING, MIN_RATING } from './constants';
import styles from './styles.legacy.css';
import { RestaurantsMapLazyProps } from './typings';

const ITEMS_PER_PAGE = 20;
const MIN_ZOOM = 3;
const MAX_ZOOM = 15;
const DEFAULT_ZOOM = 17;
const CLUSTER_RADIUS = 60;
const CENTER_ON_ZURICH = { lat: 47.3725208, lng: 8.5426586 };

// Don't center exactly to the marker, but a bit further down so that the overlay
// is looking okay especially on mobile devices
const LAT_PULL_DOWN = 0.0013;

const RestaurantsMapLazy = ({
  totalResults,
  results,
  pageResults,
  location,
  setLocation,
  query,
  setQuery,
  page,
  setPage,
  itemsPerPage = ITEMS_PER_PAGE,
  activeMarker,
  setActiveMarker,
  ratingRange,
  setRatingRange,
  isPanelActive,
  setPanelActive,
  onChange,
  markerClusters,
  minZoom,
  maxZoom,
  center,
  zoom,
  routerLocation,
}: RestaurantsMapLazyProps) => {
  return (
    (results && Array.isArray(results) && (
      <div className={styles.Wrapper}>
        {isPanelActive && (
          <RestaurantsPanel
            data={pageResults}
            totalResults={totalResults}
            setLocation={setLocation}
            query={query}
            setQuery={setQuery}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            ratingRange={ratingRange}
            setRatingRange={setRatingRange}
            hasNextPage={page < totalResults / itemsPerPage}
            hasPreviousPage={page - 1 > 0}
            setPanelActive={setPanelActive}
            routerLocation={routerLocation}
          />
        )}
        <GoogleMap
          markerClusters={markerClusters}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          center={center}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          location={location}
          isPanelActive={isPanelActive}
          setPanelActive={setPanelActive}
          onChange={onChange}
        />
      </div>
    )) ||
    null
  );
};

const withStaticDefaultProps = defaultProps({
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  clusterRadius: CLUSTER_RADIUS,
  itemsPerPage: ITEMS_PER_PAGE,
});

// This is only run at initial mount.
const withInitialDataProcessing = withPropsOnChange(
  () => false,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props: any) => {
    const { data } = normalizeRestaurants(props.data);

    const filteredIds =
      (data &&
        typeof data === 'object' &&
        Object.keys(data).filter((key) => {
          const { id, lat, lng } = data[key];
          return (
            id !== null &&
            typeof lat === 'number' &&
            typeof lng === 'number' &&
            lat > 0 &&
            lng > 0
          );
        })) ||
      [];

    const filteredRestaurants = filteredIds.reduce(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'restaurants' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
      (restaurants, key) => Object.assign(restaurants, { [key]: data[key] }),
      {},
    );

    return {
      selector: createResultsSelector(filteredRestaurants, filteredIds),
    };
  },
);

// Remove the raw data from the props for faster reconciliation.
/* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
const withoutRawData = mapProps(({ data, ...props }) => props); // eslint-disable-line

const withTextSearchFilter = withState(
  'query',
  'setQuery',
  /* @ts-ignore TODO: TS7031 ->  Binding element 'query' implicitly has an 'any' type. */
  ({ query }) => query,
);

const withRatingRangeFilter = withState('ratingRange', 'setRatingRange', {
  min: MIN_RATING - 1, // restaurants without a rating get a default rating of 11, in order to still display them on the map, I updated this filter range
  max: MAX_RATING,
});

const withFilteredResults = withPropsOnChange(
  ['location', 'query', 'ratingRange'],
  /* @ts-ignore TODO: TS7031 ->  Binding element 'selector' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'query' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'ratingRange' implicitly has an 'any' type. */
  ({ selector, location, query, ratingRange }) => {
    const results =
      (selector &&
        selector.filterResults({
          location,
          query,
          ...ratingRange,
        })) ||
      [];

    return {
      results,
    };
  },
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'WrappedComponent' implicitly has an 'any' type. */
const withPaginatedResults = (WrappedComponent) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const WithPaginatedResultsHoC = (props) => {
    const pageResultCopy = JSON.parse(JSON.stringify(props.results));
    const pageResults =
      (pageResultCopy &&
        typeof pageResultCopy !== 'undefined' &&
        pageResultCopy.slice(
          (props.page - 1) * ITEMS_PER_PAGE,
          props.page * ITEMS_PER_PAGE,
        )) ||
      [];

    return (
      <WrappedComponent
        key={props.page}
        {...props}
        pageResults={pageResults}
        totalResults={(pageResultCopy && pageResultCopy.length) || 0}
      />
    );
  };
  return WithPaginatedResultsHoC;
};

const withClusteredPageResults = withPropsOnChange(
  ['results', 'minZoom', 'maxZoom', 'clusterRadius'],
  /* @ts-ignore TODO: TS7031 ->  Binding element 'results' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'minZoom' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'maxZoom' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'clusterRadius' implicitly has an 'any' type. */
  ({ results, minZoom, maxZoom, clusterRadius }) => {
    const getCluster = calculateClusters(results, {
      minZoom,
      maxZoom,
      radius: clusterRadius,
    });

    return {
      getCluster,
    };
  },
);

// Go back to the first page and then execute the filter state setter.
const resetPaginationAndExecute =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'stateSetterProp' implicitly has an 'any' type. */


    (stateSetterProp) =>
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    (props) =>
    /* @ts-ignore TODO: TS7019 ->  Rest parameter 'args' implicitly has an 'any[]' type. */
    (...args) => {
      props[stateSetterProp](...args);
    };

const withPaginationResetHandling = withHandlers({
  setLocation: resetPaginationAndExecute('setLocation'),
  setQuery: resetPaginationAndExecute('setQuery'),
  setRatingRange: resetPaginationAndExecute('setRatingRange'),
});

// Centralize marker handling so we can highlight the active item in the list
// and on the map alike.
const withActiveMarker = withState(
  'activeMarker',
  'setActiveMarker',
  /* @ts-ignore TODO: TS7031 ->  Binding element 'routerLocation' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'selector' implicitly has an 'any' type. */
  ({ routerLocation, selector }) => {
    if (routerLocation && routerLocation.query && routerLocation.query.id) {
      const restaurant = selector.restaurantById(routerLocation.query.id);

      if (restaurant && restaurant.id) {
        return restaurant.id;
      }
    }

    return null;
  },
);

const withUserLocation = withState('location', 'setLocation', {
  lat: null,
  lng: null,
});

// Move map centering to the container level to control it when the active
// marker or the own location changes.
const withMapState = withState(
  'mapState',
  'setMapState',
  /* @ts-ignore TODO: TS7031 ->  Binding element 'routerLocation' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'selector' implicitly has an 'any' type. */
  ({ routerLocation, selector }) => {
    if (routerLocation && routerLocation.query && routerLocation.query.id) {
      const restaurant = selector.restaurantById(routerLocation.query.id);

      if (restaurant) {
        return {
          center: {
            lat: restaurant.lat + LAT_PULL_DOWN,
            lng: restaurant.lng,
          },
          zoom: DEFAULT_ZOOM,
        };
      }
    }

    return {
      center: CENTER_ON_ZURICH,
    };
  },
);

const withMapStateHandler = withHandlers({
  onChange:
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */


      (props: any) =>
      /* @ts-ignore TODO: TS7031 ->  Binding element 'center' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'zoom' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'bounds' implicitly has an 'any' type. */
      ({ center, zoom, bounds }) => {
        props.setMapState({ center, zoom, bounds });
      },
});

const withMarkerClusters = withPropsOnChange(
  ['mapState', 'getCluster'],
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props: any) => ({
    markerClusters: props.mapState.bounds
      ? props
          .getCluster(props.mapState)
          /* @ts-ignore TODO: TS7031 ->  Binding element 'wx' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'wy' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'numPoints' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'points' implicitly has an 'any' type. */
          .map(({ wx, wy, numPoints, points }) => ({
            points: numPoints,
            lat: wy,
            lng: wx,
            id: points[0].id,
            props: numPoints === 1 && points[0],
          }))
      : [],
  }),
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'activeMarker' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'markerClusters' implicitly has an 'any' type. */
const markerIsVisible = (activeMarker, markerClusters) =>
  markerClusters.findIndex(
    /* @ts-ignore TODO: TS7031 ->  Binding element 'id' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'points' implicitly has an 'any' type. */
    ({ id, points }) => points === 1 && id === activeMarker,
  ) !== -1;

/* @ts-ignore TODO: TS7006 ->  Parameter 'activeMarker' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'filteredRestaurants' implicitly has an 'any' type. */
const markerExists = (activeMarker, filteredRestaurants) =>
  /* @ts-ignore TODO: TS7031 ->  Binding element 'id' implicitly has an 'any' type. */
  filteredRestaurants.findIndex(({ id }) => id === activeMarker) !== -1;

const withEnsureActiveMarker = withPropsOnChange(
  ['markerClusters', 'activeMarker'],
  /* @ts-ignore TODO: TS7031 ->  Binding element 'activeMarker' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'markerClusters' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'results' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'selector' implicitly has an 'any' type. */
  ({ activeMarker, markerClusters, results, selector }) => {
    const activeRestaurant =
      (activeMarker && selector.restaurantById(activeMarker)) || null;
    if (
      activeRestaurant &&
      markerExists(activeMarker, results) &&
      !markerIsVisible(activeMarker, markerClusters)
    ) {
      const activeMarkerCluster = {
        points: 1,
        lat: activeRestaurant.lat,
        lng: activeRestaurant.lng,
        id: activeRestaurant.id || '',
        props: activeRestaurant,
      };

      return {
        markerClusters: [...(markerClusters || []), activeMarkerCluster],
      };
    }

    return {};
  },
);

const withCenterHandlingOverride = withHandlers({
  setActiveMarker:
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */


      (props: any) =>
      /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
      (id, zoom = false) => {
        const restaurant = props.selector.restaurantById(id);

        if (restaurant && restaurant.lat && restaurant.lng) {
          props.setMapState({
            bounds: props.mapState.bounds,
            zoom: zoom ? DEFAULT_ZOOM : props.mapState.zoom,
            center: {
              lat: restaurant.lat + LAT_PULL_DOWN,
              lng: restaurant.lng,
            },
          });
        }

        props.setActiveMarker(id);
      },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'location' implicitly has an 'any' type. */
  setLocation: (props) => (location) => {
    props.setLocation(location);
    props.setMapState({
      zoom: props.mapState.zoom,
      center: location,
    });
  },
});

// State to switch panel on or off
const withPanelState = withState(
  'isPanelActive',
  'setPanelActive',
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isMobile' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'routerLocation' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'selector' implicitly has an 'any' type. */
  ({ isMobile, routerLocation, selector }) => {
    if (routerLocation && routerLocation.query && routerLocation.query.id) {
      const restaurant = selector.restaurantById(routerLocation.query.id);

      if (restaurant && isMobile) {
        return false;
      }
    }

    return true;
  },
);

// New Zoom and Center on restaurant data change
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const withZoomOnDataChange = withPropsOnChange(['results'], (props: any) => {
  // dependend on map size, zoom and center calculation will return different results
  const size = {
    width: 640, // Map width in pixels minus restaurants panel width
    height: 400, // Map height in pixels
  };

  const eps = 0.0001;

  // convert all that latitude longitude
  const pointsNorm =
    (props.results &&
      Array.isArray(props.results) &&
      props.results
        /* @ts-ignore TODO: TS7006 ->  Parameter 'pt' implicitly has an 'any' type. */
        .map((pt) => ({
          ...pt,
          lat: pt.lat || pt.latitude,
          lng: pt.lng || pt.longitude,
        }))

        // add bounding box corners to points
        /* @ts-ignore TODO: TS7006 ->  Parameter 'r' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7006 ->  Parameter 'pt' implicitly has an 'any' type. */
        .reduce((r, pt) => {
          r.push(pt);

          if ('leftTopLatitude' in pt) {
            r.push({
              ...pt,
              lat: pt.leftTopLatitude,
              lng: pt.leftTopLongitude,
            });

            r.push({
              ...pt,
              lat: pt.rightBottomLatitude,
              lng: pt.rightBottomLongitude,
            });
          }

          return r;
        }, [])) ||
    [];

  if (!pointsNorm || !pointsNorm.length) {
    return {};
  }

  const { lat: latFirst, lng: lngFirst } = pointsNorm[0];

  const { nw, se } = pointsNorm
    /* @ts-ignore TODO: TS7031 ->  Binding element 'lat' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'lng' implicitly has an 'any' type. */
    .filter(({ lat, lng }) => !(isNaN(lat) || isNaN(lng)))
    .reduce(
      /* @ts-ignore TODO: TS7031 ->  Binding element 'ptNW' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'ptSE' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'lat' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'lng' implicitly has an 'any' type. */
      ({ nw: ptNW, se: ptSE }, { lat, lng }) => ({
        nw: {
          lat: Math.max(ptNW.lat, lat + eps),
          lng: Math.min(ptNW.lng, lng - eps),
        },
        se: {
          lat: Math.min(ptSE.lat, lat - eps),
          lng: Math.max(ptSE.lng, lng + eps),
        },
      }),
      {
        nw: { lat: latFirst, lng: lngFirst },
        se: { lat: latFirst, lng: lngFirst },
      },
    );

  // Use n^(log2(n) + c) algorithm to find closer maximum bounds.
  //
  // To avoid medians which confuse the calculation of the zoom level
  // (basically avoiding wrong and very far zoom levels)
  // e.g.: the prime meridian of longitudes is 0 and goes through greenwich in england.
  // if the northwest (nw) value of our longitude is 359 and the southeast (se) value
  // is 1 the zoom level would probably be around 0.01 or something like that,
  // which is very far away. to avoid this we have to calculate the maximum distance of
  // the latitude and longitude of two points correctly to avoid wrong zoom levels.

  // The idea is to find max distance between nearest pts (as I know similar algos always n*log(n))
  // so sorting is good here
  const pointsSorted = sortBy(pointsNorm, 'lng');

  let dist = 0;
  let leftLng = 0;

  for (let i = 0; i < pointsSorted.length - 1; i += 1) {
    const d = pointsSorted[i + 1].lng - pointsSorted[i].lng;
    if (d > dist) {
      leftLng = pointsSorted[i].lng;
      dist = d;
    }
  }

  const minInterval1 = se.lng - nw.lng;
  const minInterval2 = 360 - dist;

  // set northwest and southeast bounds depending on the calculated
  // and correct values of longitude and latitude.
  const bounds =
    minInterval1 < minInterval2
      ? { nw, se }
      : {
          nw: {
            lat: nw.lat,
            lng: leftLng + dist,
          },
          se: {
            lat: se.lat,
            lng: leftLng + 360,
          },
        };

  const { center, zoom } = fitBounds(bounds, size);

  return {
    resultsZoom: zoom,
    resultsCenter: center,
  };
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'BaseComponent' implicitly has an 'any' type. */
const withMapStateOrDataZoomAndCenter = (BaseComponent) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'curProps' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
  const propsMapper = (curProps, nextProps) => {
    const nextOrCurProps = nextProps || curProps;

    if (
      curProps.resultsZoom !== nextOrCurProps.resultsZoom ||
      curProps.resultsCenter !== nextOrCurProps.resultsCenter
    ) {
      return {
        center: nextOrCurProps.resultsCenter,
        zoom: nextOrCurProps.resultsZoom,
      };
    }

    if (
      curProps.mapState.center !== nextOrCurProps.mapState.center ||
      curProps.mapState.zoom !== nextOrCurProps.mapState.zoom
    ) {
      return {
        center: nextOrCurProps.mapState.center,
        zoom: nextOrCurProps.mapState.zoom,
      };
    }

    return {
      center: nextOrCurProps.activeMarker
        ? nextOrCurProps.mapState.center
        : nextOrCurProps.resultsCenter || CENTER_ON_ZURICH,
      zoom: nextOrCurProps.activeMarker
        ? nextOrCurProps.mapState.zoom
        : nextOrCurProps.resultsZoom || DEFAULT_ZOOM,
    };
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'curProps' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
  const shouldMap = (curProps, nextProps) => {
    if (
      curProps.resultsZoom !== nextProps.resultsZoom ||
      curProps.resultsCenter !== nextProps.resultsCenter ||
      curProps.mapState.center !== nextProps.mapState.center ||
      curProps.mapState.zoom !== nextProps.mapState.zoom
    ) {
      return true;
    }

    return false;
  };

  return class extends Component {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    constructor(props) {
      super(props);
      this.state = { ...props, ...propsMapper(props, null) };
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'prevState' implicitly has an 'any' type. */
    static getDerivedStateFromProps(nextProps, prevState) {
      if (shouldMap(prevState, nextProps)) {
        return { ...nextProps, ...propsMapper(prevState, nextProps) };
      }
      return null;
    }

    render() {
      return createElement(BaseComponent, {
        ...this.state,
      });
    }
  };
};

export default compose<any, any>(
  withViewportProps,
  withStaticDefaultProps,
  withInitialDataProcessing,
  withoutRawData,
  withTextSearchFilter,
  withRatingRangeFilter,
  withUserLocation,
  withFilteredResults,
  withZoomOnDataChange,
  withPagerState,
  withPaginatedResults,
  withPaginationResetHandling,
  withMapState,
  withMapStateHandler,
  withMapStateOrDataZoomAndCenter,
  withClusteredPageResults,
  withActiveMarker,
  withMarkerClusters,
  withEnsureActiveMarker,
  withCenterHandlingOverride,
  withPanelState,
)(RestaurantsMapLazy);
