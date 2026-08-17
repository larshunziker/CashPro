export const SET_SCREEN_READY = 'route/set-screen-ready';
export const SET_REFETCHING_DATA = 'route/set-refetching-data';
export const ON_LOCATION_CHANGE = 'route/on-router-location-change';
export const SET_LOADING = 'route/set-loading';
export const MARKETING_PAGE = 'vertical/marketing-page';

export const setScreenReady = (
  screenReady: boolean,
  tealiumData: TaeliumData,
  hasCustomTracking = false,
) => ({
  type: SET_SCREEN_READY,
  payload: {
    screenReady,
    ...tealiumData,
    hasCustomTracking,
  },
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const onLocationChange = (location: RaschRouterLocation) => ({
  type: ON_LOCATION_CHANGE,
  payload: location,
});
