/**
 * @file   AlertsProfile test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-10-24 09:45:27
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { cleanup, render } from '@testing-library/react';
// @ts-ignore
import { alertListInitialState } from 'reducers/alertList';
// @ts-ignore
import { authInitialState } from 'reducers/auth';
import AlertsProfileFactory from '../factory';
import { AlertsProfileFactoryOptions } from '../typings';

let mockSuccessResponse = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
let initialState: any = {};

const factoryOptions: AlertsProfileFactoryOptions = {
  styles: {
    AlertsProfileWrapper: 'AlertsProfileWrapperClassName',
    LoginWrapper: 'LoginWrapperClassName',
    Title: 'TitleClassName',
    Description: 'DescriptionClassName',
    ItemsWrapper: 'ItemsWrapperClassName',
  },
  grid: {
    Container: 'containerClassName',
  },
  LoginForm: () => <form data-testid="login-form"></form>,
  NoItems: () => <div data-testid="no-alerts">No alerts found</div>,
  LoadingSpinner: () => <div data-testid="loading">loading...</div>,
  AlertList: () => <ul data-testid="alerts-list">alerts list here</ul>,
  Helmet: () => null,
};

beforeEach(() => {
  Component = AlertsProfileFactory(factoryOptions);

  // https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167 nice article about mocking fetch request

  mockSuccessResponse = {
    'term-1': {
      timestamp: 1572018633919,
    },
    'term-21': {
      timestamp: 1572018634836,
    },
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch' as any).mockImplementation(() => mockFetchPromise);

  initialState = {
    auth: authInitialState,
    alertList: alertListInitialState,
  };

  jest.clearAllMocks();
  cleanup();
});

describe('[Common] AlertsProfile', () => {
  it('Should match snapshot and display the login form', async () => {
    const store = createStore((state) => state, initialState);
    initialState.auth.initialAuthRequest = true;

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );

    expect((global as any).fetch).toHaveBeenCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot if isAuthenticated is true and fetch an empty alert list', async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    initialState.auth.isAuthenticated = true;
    initialState.auth.initialAuthRequest = true;

    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );
    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
    // await waitFor(() => {
    // expect(getByTestId('no-alerts').innerHTML).toContain('No alerts founds');
    // expect(container.innerHTML).not.toBe('');
    // expect(getByTestId('alerts-list').innerHTML).toContain(
    //   'alerts list here',
    // );
    // });
  });

  it('Should match snapshot if isAuthenticated is true and fetch request fails', async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.reject({
      json: () => mockJsonPromise,
    });

    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    initialState.auth.isAuthenticated = true;
    initialState.auth.initialAuthRequest = true;
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot if isAuthenticated is true and fetch an alert list with keywords and nodes', async () => {
    initialState.auth.initialAuthRequest = true;
    initialState.auth.isAuthenticated = true;
    initialState.alertList = {
      'keyword-1': { timestamp: 1572014756876 },
      'node-21': { timestamp: 1572014756876 },
    };

    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );

    // const alertsList = await findByText(container, 'alerts list here');

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
    // expect(alertsList).toMatchSnapshot();
    // expect(container).toMatchSnapshot();
  });
});
