import { combineReducers } from 'redux';
import alertListReducer, {
  alertListInitialState,
} from '../../../shared/reducers/alertList';
import authReducer, { authInitialState } from '../../../shared/reducers/auth';
import bookmarkListReducer, {
  bookmarkListInitialState,
} from '../../../shared/reducers/bookmarkList';
import commentReducer, {
  commentInitialState,
} from '../../../shared/reducers/comment';
import headerReducer from '../../../shared/reducers/header';
import navigationReducer, {
  navigationInitialState,
} from '../../../shared/reducers/navigation';
import pianoReducer from '../../../shared/reducers/piano';
import scrollReducer, {
  scrollInitialState,
} from '../../../shared/reducers/scroll';
import ssrReducer from '../../../shared/reducers/ssr';
import windowReducer, {
  windowInitialState,
} from '../../../shared/reducers/window';
import routeReducer, { routeInitialState } from './route';
import settingsReducer, { settingsInitialState } from './settings';

// collection of all initial states for unit tests
export const initialStates = {
  settings: settingsInitialState,
  route: routeInitialState,
  window: windowInitialState,
  scroll: scrollInitialState,
  navigation: navigationInitialState,
  auth: authInitialState,
  comment: commentInitialState,
  alertList: alertListInitialState,
  bookmarkList: bookmarkListInitialState,
};

const reducers = {
  settings: settingsReducer,
  route: routeReducer,
  window: windowReducer,
  scroll: scrollReducer,
  navigation: navigationReducer,
  piano: pianoReducer,
  auth: authReducer,
  comment: commentReducer,
  alertList: alertListReducer,
  header: headerReducer,
  bookmarkList: bookmarkListReducer,
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
export default (asyncReducers) =>
  combineReducers({ ...reducers, ...asyncReducers });
