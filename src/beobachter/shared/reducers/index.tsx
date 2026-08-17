import { combineReducers } from 'redux';
import alertListReducer, {
  alertListInitialState,
} from '../../../shared/reducers/alertList';
import authReducer, { authInitialState } from '../../../shared/reducers/auth';
import bookingReducer, {
  bookingInitialState,
} from '../../../shared/reducers/booking';
import bookmarkListReducer, {
  bookmarkListInitialState,
} from '../../../shared/reducers/bookmarkList';
import commentReducer, {
  commentInitialState,
} from '../../../shared/reducers/comment';
import chatbotReducer, { chatbotInitialState } from './chatbot';
import headerReducer from '../../../shared/reducers/header';
import navigationReducer, {
  navigationInitialState,
} from '../../../shared/reducers/navigation';
import pianoReducer from '../../../shared/reducers/piano';
import scrollReducer, { scrollInitialState } from './scroll';
import ssrReducer from '../../../shared/reducers/ssr';
import windowReducer, {
  windowInitialState,
} from '../../../shared/reducers/window';
import routeReducer, { routeInitialState } from './route';

// collection of all initial states for unit tests
export const initialStates = {
  route: routeInitialState,
  window: windowInitialState,
  scroll: scrollInitialState,
  navigation: navigationInitialState,
  comment: commentInitialState,
  chatbot: chatbotInitialState,
  auth: authInitialState,
  alertList: alertListInitialState,
  bookmarkList: bookmarkListInitialState,
  booking: bookingInitialState,
};

const reducers = {
  route: routeReducer,
  window: windowReducer,
  scroll: scrollReducer,
  navigation: navigationReducer,
  header: headerReducer,
  comment: commentReducer,
  chatbot: chatbotReducer,
  piano: pianoReducer,
  auth: authReducer,
  alertList: alertListReducer,
  bookmarkList: bookmarkListReducer,
  booking: bookingReducer,
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
  combineReducers({
    ...reducers,
    ...asyncReducers,
  });
