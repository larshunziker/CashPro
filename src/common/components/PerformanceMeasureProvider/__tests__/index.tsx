import React from 'react';
// @ts-ignore
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, waitFor } from '@testing-library/react';
import { tealiumTrackEvent } from '../../../../shared/helpers/tealium';
import Component from '../index';
import mock from './mock';

jest.mock('../../../../shared/helpers/tealium', () => {
  return {
    tealiumTrackEvent: jest.fn(),
  };
});

let initialState: any = {};

beforeEach(() => {
  initialState = {
    route: {
      locationBeforeTransitions: {
        pathname: '/home',
        search: '',
        hash: '',
        action: 'PUSH',
        key: 'b86ozif',
        query: {},
      },
      screenReady: true,
    },
  };
  mock.performance();
  (window as any).PerformanceObserver = mock.PerformanceObserver;
});

describe('[Component] ComponentName', () => {
  it('Should call the tealiumTracking fn the correct amount of times', async () => {
    const store = createStore((state) => state, initialState);
    const { rerender } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );

    await waitFor(() => expect(tealiumTrackEvent).toHaveBeenCalledTimes(1));

    initialState.route.locationBeforeTransitions.pathname = '/people';
    const newStore = createStore((state) => state, initialState);

    rerender(
      <Provider store={newStore}>
        <Component />
      </Provider>,
    );

    await waitFor(() => expect(tealiumTrackEvent).toHaveBeenCalledTimes(2));

    initialState.route.locationBeforeTransitions.pathname = '/style';
    const newerStore = createStore((state) => state, initialState);

    rerender(
      <Provider store={newerStore}>
        <Component />
      </Provider>,
    );

    await waitFor(() => expect(tealiumTrackEvent).toHaveBeenCalledTimes(2));
  });
});
