export const SET_REFETCHING_DATA = 'route/set-refetching-data';

type RouteStateActionTypes = 'route/set-refetching-data';

export type RouteStateAction<T> = {
  type: RouteStateActionTypes;
  payload: T;
};

export const setIsRefetchingData = (
  isRefetchingData: boolean,
  tealiumData?: TaeliumData,
): RouteStateAction<{ isRefetchingData: boolean }> => ({
  type: SET_REFETCHING_DATA,
  payload: {
    isRefetchingData,
    ...tealiumData,
  },
});
