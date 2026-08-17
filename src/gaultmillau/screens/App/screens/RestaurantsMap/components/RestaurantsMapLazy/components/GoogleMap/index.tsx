import React from 'react';

import { compose, withHandlers } from 'recompose';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'google-map-react'. '/Users/bhs/code/work/rasch-stack/node_modules/google- */
import GoogleMapReact from 'google-map-react';
import Icon from '../../../../../../components/Icon';
import Cluster from './components/Cluster';
import Marker from './components/Marker';
import MyLocation from './components/MyLocation';
import mapStyles from './mapStyles.json';
import gaultMillauIcons from '../../../../../../assets/styles/gaultMillau.legacy.css';
import styles from './styles.legacy.css';
import { GoogleMapProps } from './typings';

const DEFAULT_ZOOM_LEVEL = 8;
const GOOGLE_MAP_API_KEY = 'AIzaSyB4vRN_6nB7lJJ3SLRSus_yYG92zCjFoio';
const GOOGLE_MAP_API_VERSION = '3.36';

const createRenderMarker =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'activeMarker' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'toggleMarkerHandler' implicitly has an 'any' type. */


    (activeMarker, toggleMarkerHandler) =>
    /* @ts-ignore TODO: TS7031 ->  Binding element 'id' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'lat' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'lng' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'points' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'props' implicitly has an 'any' type. */
    ({ id, lat, lng, points, props }) =>
      (points === 1 && (
        <Marker
          key={`restaurant-map-marker-${id}`}
          lat={lat}
          lng={lng}
          toggleActive={toggleMarkerHandler(activeMarker, id)}
          isActive={activeMarker === id}
          overlayData={props}
        />
      )) || (
        <Cluster key={`cluster-${id}`} lat={lat} lng={lng}>
          {points}
        </Cluster>
      );

/* @ts-ignore TODO: TS7006 ->  Parameter 'markerClusters' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'activeMarker' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'toggleMarkerHandler' implicitly has an 'any' type. */
const renderMarkers = (markerClusters, activeMarker, toggleMarkerHandler) =>
  markerClusters &&
  markerClusters
    .filter(
      /* @ts-ignore TODO: TS7031 ->  Binding element 'id' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'lat' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'lng' implicitly has an 'any' type. */
      ({ id, lat, lng }) =>
        id !== null &&
        typeof lat === 'number' &&
        typeof lng === 'number' &&
        lat > 0 &&
        lng > 0,
    )
    .map(createRenderMarker(activeMarker, toggleMarkerHandler));

const createMapOptions = () => ({
  disableDefaultUI: true,
  styles: mapStyles,
});

// HTML element references
/* @ts-ignore TODO: TS7034 ->  Variable 'zoomControlsRef' implicitly has type 'any' in some locations where its type cannot be determined. */
let zoomControlsRef = null;
/* @ts-ignore TODO: TS7034 ->  Variable 'zoomInButtonRef' implicitly has type 'any' in some locations where its type cannot be determined. */
let zoomInButtonRef = null;
/* @ts-ignore TODO: TS7034 ->  Variable 'zoomOutButtonRef' implicitly has type 'any' in some locations where its type cannot be determined. */
let zoomOutButtonRef = null;

// HTML reference setters
/* @ts-ignore TODO: TS7006 ->  Parameter 'ref' implicitly has an 'any' type. */
const setZoomControls = (ref) => {
  zoomControlsRef = ref;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'ref' implicitly has an 'any' type. */
const setZoomInButton = (ref) => {
  zoomInButtonRef = ref;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'ref' implicitly has an 'any' type. */
const setZoomOutButton = (ref) => {
  zoomOutButtonRef = ref;
};

// Google map callback
/* @ts-ignore TODO: TS7031 ->  Binding element 'map' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'maps' implicitly has an 'any' type. */
const onGoogleApiLoaded = ({ map, maps }) => {
  /* @ts-ignore TODO: TS7005 ->  Variable 'zoomControlsRef' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7005 ->  Variable 'zoomInButtonRef' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7005 ->  Variable 'zoomOutButtonRef' implicitly has an 'any' type. */
  if (!(zoomControlsRef && zoomInButtonRef && zoomOutButtonRef)) {
    return;
  }

  // Add DOM listeners
  /* @ts-ignore TODO: TS7005 ->  Variable 'zoomInButtonRef' implicitly has an 'any' type. */
  maps.event.addDomListener(zoomInButtonRef, 'click', () => {
    map.setZoom(map.getZoom() + 1);
  });

  /* @ts-ignore TODO: TS7005 ->  Variable 'zoomOutButtonRef' implicitly has an 'any' type. */
  maps.event.addDomListener(zoomOutButtonRef, 'click', () => {
    map.setZoom(map.getZoom() - 1);
  });

  // Move controls to the map
  /* @ts-ignore TODO: TS7005 ->  Variable 'zoomControlsRef' implicitly has an 'any' type. */
  map.controls[maps.ControlPosition.TOP_RIGHT].push(zoomControlsRef);
};

const GoogleMap = ({
  location,
  zoom,
  center,
  activeMarker,
  isPanelActive,
  showPanel,
  hidePanel,
  onChange,
  markerClusters,
  toggleMarkerHandler,
}: GoogleMapProps) => (
  <div className={styles.Wrapper}>
    <div className={styles.ControlsWrapper}>
      {/* Note this will be appended to google maps component after it has loaded */}
      <div className={styles.ZoomControls} ref={setZoomControls}>
        <button className={styles.Button} ref={setZoomInButton}>
          <span className={styles.Plus} />
        </button>
        <button className={styles.Button} ref={setZoomOutButton}>
          <span className={styles.Minus} />
        </button>
      </div>

      <div className={styles.Controls}>
        <button className={styles.Button} onClick={showPanel}>
          <Icon
            addClass={classNames(styles.Icon, {
              [styles.IconActive]: isPanelActive,
            })}
            iconsOverride={gaultMillauIcons}
            type="IconListing"
          />
        </button>
        <button className={styles.Button} onClick={hidePanel}>
          <Icon
            addClass={classNames(styles.Icon, {
              [styles.IconActive]: !isPanelActive,
            })}
            iconsOverride={gaultMillauIcons}
            type="IconLocator"
          />
        </button>
      </div>
    </div>

    <GoogleMapReact
      bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY, v: GOOGLE_MAP_API_VERSION }}
      center={center}
      zoom={zoom || DEFAULT_ZOOM_LEVEL}
      options={createMapOptions}
      onGoogleApiLoaded={onGoogleApiLoaded}
      onChange={onChange}
      yesIWantToUseGoogleMapApiInternals
      resetBoundsOnResize
    >
      {renderMarkers(markerClusters, activeMarker, toggleMarkerHandler)}
      {location && <MyLocation lat={location.lat} lng={location.lng} />}
    </GoogleMapReact>
  </div>
);

const extendWithHandlers = withHandlers({
  showPanel:
    /* @ts-ignore TODO: TS7031 ->  Binding element 'setPanelActive' implicitly has an 'any' type. */


      ({ setPanelActive }) =>
      () =>
        setPanelActive(true),
  hidePanel:
    /* @ts-ignore TODO: TS7031 ->  Binding element 'setPanelActive' implicitly has an 'any' type. */


      ({ setPanelActive }) =>
      () =>
        setPanelActive(false),
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'activeMarker' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
  toggleMarkerHandler: (props: any) => (activeMarker, id) => () => {
    props.setActiveMarker(activeMarker !== id ? id : null);
  },
});

export default compose<any, any>(extendWithHandlers)(GoogleMap);
