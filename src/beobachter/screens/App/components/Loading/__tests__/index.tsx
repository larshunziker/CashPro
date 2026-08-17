import React from 'react';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import SSRContextProvider from '../../../../../../common/components/SSRContext';

const initialProps: any = {};
let initialState: any = {};

beforeEach(() => {
  initialState = { route: routeInitialState };
});

describe('[Component] Loading', () => {
  it('Should render nothing if screen is ready', () => {
    initialState.route.screenReady = true;
    initialState.route.loading = false;
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <SSRContextProvider>
          <Component {...initialProps} />,
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('loading-indicator-wrapper')).toBeNull();
  });

  it('Should render the loading indicator if screen is not ready yet', () => {
    initialState.route.screenReady = false;
    initialState.route.loading = false;
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <SSRContextProvider>
          <Component {...initialProps} />,
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('loading-indicator-wrapper')).not.toBeNull();
  });

  it('Should render the loading indicator if is loading', () => {
    initialState.route.screenReady = true;
    initialState.route.loading = true;
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <SSRContextProvider>
          <Component {...initialProps} />,
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('loading-indicator-wrapper')).not.toBeNull();
  });
});
