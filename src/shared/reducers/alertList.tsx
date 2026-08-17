import {
  SET_ALERT_LIST_DATA,
  ADD_ALERT_LIST_ITEM,
  REMOVE_ALERT_LIST_ITEM,
  AlertListStateAction,
} from '../actions/alertList';

export const alertListInitialState: AlertListState = {};

export default (
  state: AlertListState = alertListInitialState,
  action: AlertListStateAction,
): AlertListState => {
  switch (action.type) {
    case SET_ALERT_LIST_DATA:
      return (action.payload as AlertListState) || {};

    case REMOVE_ALERT_LIST_ITEM:
      const newState = { ...state };
      delete newState[action.payload as string];

      return newState;
    case ADD_ALERT_LIST_ITEM:
      const updatedState = {
        ...state,
        [action.payload as string]: {
          timestamp: +new Date(),
        },
      };
      return updatedState;

    default:
      return state;
  }
};
