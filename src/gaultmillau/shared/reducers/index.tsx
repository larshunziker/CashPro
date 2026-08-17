import { combineReducers } from 'redux';
import alertListReducer, {
  alertListInitialState,
} from '../../../shared/reducers/alertList';
import authReducer, { authInitialState } from '../../../shared/reducers/auth';
import navigationReducer, {
  navigationInitialState,
} from '../../../shared/reducers/navigation';
import scrollReducer, {
  scrollInitialState,
} from '../../../shared/reducers/scroll';
import {
  searchInitialState,
  searchReducer,
} from '../../../shared/reducers/search';
import ssrReducer from '../../../shared/reducers/ssr';
import headerReducer, { initialState as headerInitialState } from './header';
import routeReducer, { routeInitialState } from './route';
import settingsReducer, { settingsInitialState } from './settings';
import windowReducer, { initialState as windowInitialState } from './window';

// collection of all initial states for unit tests
export const initialStates = {
  header: headerInitialState,
  route: routeInitialState,
  window: windowInitialState,
  scroll: scrollInitialState,
  navigation: navigationInitialState,
  search: searchInitialState,
  settings: settingsInitialState,
  auth: authInitialState,
  alertList: alertListInitialState,
};

const reducers = {
  route: routeReducer,
  window: windowReducer,
  scroll: scrollReducer,
  navigation: navigationReducer,
  header: headerReducer,
  search: searchReducer,
  settings: settingsReducer,
  auth: authReducer,
  alertList: alertListReducer,
};

// Add only server side reducers
if (__SERVER__) {
  // @ts-ignore
  reducers.ssr = ssrReducer;
}

/**
 * Creates the main reducer with the asynchronously loaded ones.
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'asyncReducers' implicitly has an 'any' type. */
export default (asyncReducers?) =>
  combineReducers({ ...reducers, ...asyncReducers });
