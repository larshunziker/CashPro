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
import navigationReducer, {
  navigationInitialState,
} from '../../../shared/reducers/navigation';
import pianoReducer from '../../../shared/reducers/piano';
import scrollReducer, {
  scrollInitialState,
} from '../../../shared/reducers/scroll';
import {
  searchInitialState,
  searchReducer,
} from '../../../shared/reducers/search';
import ssrReducer from '../../../shared/reducers/ssr';
import windowReducer from '../../../shared/reducers/window';
import routeReducer, { routeInitialState } from './route';
import headerReducer from './header';

// collection of all initial states for unit tests
export const initialStates = {
  route: routeInitialState,
  scroll: scrollInitialState,
  navigation: navigationInitialState,
  auth: authInitialState,
  comment: commentInitialState,
  alertList: alertListInitialState,
  bookmarkList: bookmarkListInitialState,
  search: searchInitialState,
};

const reducers = {
  route: routeReducer,
  window: windowReducer,
  scroll: scrollReducer,
  navigation: navigationReducer,
  header: headerReducer,
  search: searchReducer,
  comment: commentReducer,
  piano: pianoReducer,
  auth: authReducer,
  alertList: alertListReducer,
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
