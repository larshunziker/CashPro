import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../shared/reducers/route';
import SSRContextProvider from '../../../../common/components/SSRContext';
import ReduxProvider from '../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { apolloConfig } from '../components/Router/apolloConfig';

jest.mock('../components/Router', () => {
  return () => <div />;
});
jest.mock('../screens/Videos', () => {
  return () => <div />;
});
jest.mock('../screens/Styleguide/screens/Paragraphs', () => {
  return () => <div />;
});
jest.mock('../components/FullscreenGallery', () => {
  return () => <div />;
});
jest.mock('../../../../common/screens/Logout', () => {
  return () => <div />;
});
jest.mock('../components/Footer', () => {
  return () => <div />;
});
jest.mock('../../../../common/screens/Logout', () => {
  return () => <div />;
});
jest.mock('../components/HeaderAdZone', () => {
  return () => <div />;
});
jest.mock('../components/HeaderArea', () => {
  return () => <div />;
});
jest.mock('../components/Helmet', () => {
  return () => <div />;
});
jest.mock('../components/Pull2Refresh', () => {
  return () => <div />;
});
jest.mock('../screens/AlertsProfile', () => {
  return () => <div />;
});
jest.mock('../screens/AlertsUnsubscribe', () => {
  return () => <div />;
});
jest.mock('../screens/BookmarksProfile', () => {
  return () => <div />;
});
jest.mock('../screens/Offline', () => {
  return () => <div />;
});
jest.mock('../screens/Search', () => {
  return () => <div />;
});
jest.mock('../screens/StatusPage', () => {
  return () => <div />;
});
jest.mock('../screens/Styleguide', () => {
  return () => <div />;
});

let initialProps = {
  location: {
    query: {},
    hash: '',
    pathname: '/',
  },
};
let initialState = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'onlineGetter' implicitly has type 'any' in some locations where its type cannot be determined. */
let onlineGetter;

beforeEach(() => {
  initialProps = {
    location: {
      query: {},
      hash: '',
      pathname: '/',
    },
  };

  initialState = {
    route: routeInitialState,
  };

  onlineGetter = jest.spyOn(window.navigator, 'onLine', 'get');
});

const mocks = [
  {
    // @ts-ignore
    request: apolloConfig.options(initialProps),
    result: {
      data: {
        environment: {
          routeByPath: null,
        },
      },
    },
  },
];

describe('[Component] App', () => {
  it('Should render correctly', () => {
    // @ts-ignore
    __CLIENT__ = false;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <MockedProvider mocks={mocks}>
              <Routes>
                <Route path="/" element={<Component {...initialProps} />} />
              </Routes>
            </MockedProvider>
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('app-wrapper')).not.toBeNull();
    expect(queryByTestId('helmet-wrapper')).not.toBeNull();
    expect(queryByTestId('header-wrapper')).not.toBeNull();
    expect(queryByTestId('footer-wrapper')).not.toBeNull();
    expect(queryByTestId('offline-wrapper')).toBeNull();
  });

  it('Should render Offline page if there is no connection', () => {
    // @ts-ignore
    __CLIENT__ = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'onlineGetter' implicitly has an 'any' type. */
    onlineGetter.mockReturnValue(false);
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <MockedProvider mocks={mocks}>
              <Routes>
                <Route path="/" element={<Component {...initialProps} />} />
              </Routes>
            </MockedProvider>
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('offline-wrapper')).not.toBeNull();
  });
});
