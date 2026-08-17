export type GoogleMapProps = {
  location: { lat: number; lng: number };
  zoom: number;
  center: { lat: number; lng: number };
  activeMarker: string;
  isPanelActive: boolean;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  showPanel: (boolean) => void;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  hidePanel: (boolean) => void;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  onChange: (event) => void;
  markerClusters: any;
  toggleMarkerHandler: any;
};
