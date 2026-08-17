export const SET_TIMESERIES_DATA = 'charts/set-timeseries-data';

type ChartsStateActionTypes = 'charts/set-timeseries-data';

export type ChartsStateAction<T> = {
  type: ChartsStateActionTypes;
  payload: T;
};

export const setTimeseriesData = (
  data: PriceWithAutoupdateState[],
): ChartsStateAction<PriceWithAutoupdateState[]> => ({
  type: SET_TIMESERIES_DATA,
  payload: data,
});
