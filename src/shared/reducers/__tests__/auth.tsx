import AuthStateReducer, { authInitialState } from '../auth';

describe('[reducer] auth', () => {
  it('should update state according to payload', () => {
    expect(
      AuthStateReducer(authInitialState, {
        type: 'auth/set-auth-data',
        payload: {
          username: 'test',
          deviceId: '',
          givenName: 'hans',
          familyName: 'wurst',
          email: 'test@test.com',
          address: {},
          birthday: '13.10.2012',
          gpNumber: '123456789',
          mobileNumber: '0987654321',
          isAuthenticated: true,
          hasSubscriptions: true,
          initialAuthRequest: true,
          subscriptions: ['abo-pp'],
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'boolean | undefined'. */
          realtime: null,
          registrationTimestamp: null,
          subscriptionTimestamp: null,
          hasLegalAdviceAccess: false,
          legalAdviceSubscriptions: ['beokmu'],
          subscriptionsEndDates: null,
          isChatbotAllowed: false,
          isAbotAllowed: false,
        },
      }),
    ).toEqual({
      username: 'test',
      deviceId: '',
      givenName: 'hans',
      familyName: 'wurst',
      email: 'test@test.com',
      address: {},
      birthday: '13.10.2012',
      gpNumber: '123456789',
      mobileNumber: '0987654321',
      isAuthenticated: true,
      hasSubscriptions: true,
      initialAuthRequest: true,
      subscriptions: ['abo-pp'],
      realtime: null,
      registrationTimestamp: null,
      subscriptionTimestamp: null,
      hasLegalAdviceAccess: false,
      legalAdviceSubscriptions: ['beokmu'],
      subscriptionsEndDates: null,
      isChatbotAllowed: false,
      isAbotAllowed: false,
    });
  });

  it('should return default state', () => {
    expect(
      AuthStateReducer(authInitialState, {
        // @ts-ignore
        type: '',
        payload: authInitialState,
      }),
    ).toEqual(authInitialState);
  });
});
