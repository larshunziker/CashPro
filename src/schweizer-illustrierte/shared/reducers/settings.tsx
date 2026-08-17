import {
  SET_ACTIVE_MAIN_CHANNEL,
  RESET_ACTIVE_MAIN_CHANNEL,
  SET_ACTIVE_CONTENT_TYPE,
  RESET_ACTIVE_CONTENT_TYPE,
  SettingsStateActionSI,
  SettingsStateSI,
} from '../actions/settings';

export const settingsInitialState: SettingsStateSI = {
  activeMainChannel: '',
  activeContentType: '',
};

const settingsStateReducer = (
  state: SettingsStateSI = settingsInitialState,
  action: SettingsStateActionSI,
): SettingsStateSI => {
  switch (action.type) {
    case SET_ACTIVE_MAIN_CHANNEL:
      if (state.activeMainChannel === action.payload.activeMainChannel) {
        return state;
      }
      return {
        ...state,
        activeMainChannel: action.payload.activeMainChannel,
      };

    case RESET_ACTIVE_MAIN_CHANNEL:
      state.activeMainChannel = settingsInitialState.activeMainChannel;
      return state;

    case SET_ACTIVE_CONTENT_TYPE:
      if (state.activeContentType === action.payload.activeContentType) {
        return state;
      }
      return {
        ...state,
        activeContentType: action.payload.activeContentType,
      };

    case RESET_ACTIVE_CONTENT_TYPE:
      state.activeContentType = settingsInitialState.activeContentType;
      return state;

    default:
      return state;
  }
};

export default settingsStateReducer;
