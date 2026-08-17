export const SET_AUTH_DATA = 'auth/set-auth-data';
export const SET_DEVICE_ID = 'auth/set-device-id';

type AuthStateActionTypes = 'auth/set-auth-data' | 'auth/set-device-id';

export type AuthStateAction<T> = {
  type: AuthStateActionTypes;
  payload: T;
};

export const setAuthData = ({
  username,
  givenName,
  familyName,
  email,
  userId,
  isAuthenticated,
  hasSubscriptions,
  registrationTimestamp,
  subscriptionTimestamp,
  initialAuthRequest,
  subscriptions,
  gpNumber,
  address,
  birthday,
  mobileNumber,
  realtime,
  hasLegalAdviceAccess,
  legalAdviceSubscriptions,
  subscriptionsEndDates,
  isChatbotAllowed,
  isAbotAllowed,
}: AuthState): AuthStateAction<AuthState> => ({
  type: SET_AUTH_DATA,
  payload: {
    username,
    givenName,
    familyName,
    email,
    userId,
    registrationTimestamp,
    subscriptionTimestamp,
    isAuthenticated,
    hasSubscriptions,
    initialAuthRequest,
    subscriptions,
    gpNumber,
    address,
    birthday,
    mobileNumber,
    realtime,
    hasLegalAdviceAccess,
    legalAdviceSubscriptions,
    subscriptionsEndDates,
    isChatbotAllowed,
    isAbotAllowed,
  },
});

export const setDeviceId = (
  deviceId: string,
): AuthStateAction<Pick<AuthState, 'deviceId'>> => ({
  type: SET_DEVICE_ID,
  payload: { deviceId },
});
