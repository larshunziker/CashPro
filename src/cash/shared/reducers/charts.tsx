import { log } from '../../../shared/helpers/utils';
import { ChartsStateAction, SET_TIMESERIES_DATA } from '../actions/charts';

export const chartsInitialState: ChartsState = {
  initialized: false,
  data: [],
};

const chartsReducer = (
  state: ChartsState = chartsInitialState,
  action: ChartsStateAction<PriceWithAutoupdateState[]>,
): ChartsState => {
  switch (action.type) {
    case SET_TIMESERIES_DATA:
      log('charts', ['set timeseries data', action.payload, state], 'green');
      return {
        ...state,
        initialized: true,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default chartsReducer;
