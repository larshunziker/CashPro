import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import Component from '../index';
import {
  LANDING_PAGE_BILANZ_HOME,
  LANDING_PAGE_HZB_HOME,
  LANDING_PAGE_SV_HOME,
} from '../../../../../../../../../screens/LandingPage/constants';

jest.mock('../../../../../../../../Logo');
jest.mock('../../../../../../../../RefetchGqlDataLink');

const initialState = {
  route: {
    screenReady: true,
    isInitialPage: true,
    locationBeforeTransitions: {
      pathname: '/',
    },
  },
};

describe('[Component] MinistageListicle - Header', () => {
  it('Should render HZ correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Component />
        </Provider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render BIL correctly', () => {
    initialState.route.locationBeforeTransitions.pathname =
      LANDING_PAGE_BILANZ_HOME;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Component />
        </Provider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render INS correctly', () => {
    initialState.route.locationBeforeTransitions.pathname =
      LANDING_PAGE_SV_HOME;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Component />
        </Provider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render Banking correctly', () => {
    initialState.route.locationBeforeTransitions.pathname =
      LANDING_PAGE_HZB_HOME;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Component />
        </Provider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
