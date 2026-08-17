/**
 * @file   AlertsUnsubscribe test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-10-24 09:45:27
 */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { authInitialState } from '../../../../shared/reducers/auth';
import alertsUnsubscribeFactory from '../factory';

// https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167 nice article about mocking fetch request

const mockSuccessResponse: any = {};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
let mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
let initialState: any = {};

// @ts-ignore
jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
const factoryOptions = {
  styles: {
    AlertsUnsubscribeWrapper: 'AlertsUnsubscribeWrapperClassName',
    Icon: 'IconClassName',
    Text: 'TextClassName',
    Wrapper: 'WrapperClassName',
    LoginWrapper: 'LoginWrapperClassName',
  },
  grid: {
    Container: 'containerClassName',
  },
  pleaseWaitText: 'bitte warten...',
  successText: 'erfolg text here',
  LoginForm: () => <form>Loginform</form>,
  loginText: 'Bitte melden Sie sich an um E-Mail Alerts zu verwalten',
  LoadingSpinner: () => <div>loading...</div>,
  checkmarkIcon: (
    <div>
      <span aria-label="checkmark" role="img">
        ✅
      </span>
    </div>
  ),
  button: <button>click me</button>,
};

beforeEach(() => {
  Component = alertsUnsubscribeFactory(factoryOptions);

  jest.clearAllMocks();
  cleanup();

  initialState = {
    auth: authInitialState,
  };
});

describe('[Common] AlertsUnsubscribe', () => {
  it('Should render correctly if no oneSignalExternalId is provided', async () => {
    initialState.auth.isAuthenticated = true;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );

    expect(container).toMatchSnapshot();

    // @ts-ignore
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  it('Should render correctly and make a fetch request', async () => {
    initialState.auth.isAuthenticated = true;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component oneSignalExternalId="hashedId" />
      </Provider>,
    );

    expect(container).toMatchSnapshot();

    // const successElement = await findByText(
    //   container,
    //   factoryOptions.successText,
    // );

    // @ts-ignore
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // expect(successElement).toMatchSnapshot();
  });

  it('Should render correctly and make a fetch request that fails', async () => {
    initialState.auth.isAuthenticated = true;
    mockFetchPromise = Promise.reject({
      json: () => mockJsonPromise,
    });
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component oneSignalExternalId="hashedId" />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
    // @ts-ignore
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
