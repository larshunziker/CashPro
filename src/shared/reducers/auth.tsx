import { log } from '../helpers/utils';
import { AuthStateAction, SET_AUTH_DATA, SET_DEVICE_ID } from '../actions/auth';

export const authInitialState: AuthState = {
  username: null,
  givenName: null,
  familyName: null,
  email: null,
  registrationTimestamp: null,
  subscriptionTimestamp: null,
  isAuthenticated: false,
  hasSubscriptions: false,
  initialAuthRequest: false,
  subscriptions: null,
  gpNumber: null,
  address: null,
  birthday: null,
  mobileNumber: null,
  deviceId: '',
  realtime: null,
  hasLegalAdviceAccess: false,
  legalAdviceSubscriptions: null,
  subscriptionsEndDates: null,
  isChatbotAllowed: false,
  isAbotAllowed: false,
};

const AuthStateReducer = (
  state: AuthState = authInitialState,
  action: AuthStateAction<AuthState>,
): AuthState => {
  switch (action.type) {
    case SET_AUTH_DATA:
      log('auth', ['set auth data', action.payload, state], 'green');
      return {
        ...state,
        username: action.payload.username || null,
        givenName: action.payload.givenName || null,
        familyName: action.payload.familyName || null,
        email: action.payload.email || null,
        registrationTimestamp: action.payload.registrationTimestamp || null,
        subscriptionTimestamp: action.payload.subscriptionTimestamp || null,
        isAuthenticated: action.payload.isAuthenticated || false,
        hasSubscriptions: action.payload.hasSubscriptions || false,
        initialAuthRequest: action.payload.initialAuthRequest || false,
        subscriptions: action.payload?.subscriptions || null,
        gpNumber: action.payload?.gpNumber || null,
        address: action.payload?.address || null,
        birthday: action.payload?.birthday || null,
        mobileNumber: action.payload?.mobileNumber || null,
        realtime: action.payload?.realtime || null,
        hasLegalAdviceAccess: action.payload.hasLegalAdviceAccess || false,
        legalAdviceSubscriptions:
          action.payload.legalAdviceSubscriptions || null,
        subscriptionsEndDates: action.payload.subscriptionsEndDates || null,
        isChatbotAllowed: action.payload.isChatbotAllowed || false,
        isAbotAllowed: action.payload.isAbotAllowed || false,
      };
    case SET_DEVICE_ID:
      log('auth', ['set device id', action.payload, state], 'green');
      return {
        ...state,
        deviceId: action.payload.deviceId,
      };
    default:
      return state;
  }
};

export default AuthStateReducer;
