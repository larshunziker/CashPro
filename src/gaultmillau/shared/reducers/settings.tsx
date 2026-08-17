/**
 * @TODO
 *
 * 1. Do NOT use state.merge() all the time. A simple state.set() is enough.
 * 2. Use switch statements or something like
 *    https://github.com/TehShrike/create-redux-reducer-from-map/blob/master/index.js
 */

import { isFrenchRoute } from '../helpers/language';
import { SettingsStateActionGM } from '../actions/settings';

// Initial settings state
export const settingsInitialState: SettingsState = {
  language:
    (__DEVELOPMENT__ &&
      isFrenchRoute(global?.location?.pathname || '') &&
      'fr') ||
    'de',
};

/**
 * Merge settings state into the global application state.
 */

export default (
  state: SettingsState = settingsInitialState,
  action: SettingsStateActionGM<SettingsState>,
): SettingsState => {
  switch (action.type) {
    case 'settings/set-language':
      return {
        ...state,
        language: action.payload.language,
      };

    default:
      return state;
  }
};
