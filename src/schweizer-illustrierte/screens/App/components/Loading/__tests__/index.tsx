import React from 'react';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

const initialProps: any = {};
let initialState: any = {};

beforeEach(() => {
  initialState = { route: routeInitialState };
});

describe('[Component] Loading', () => {
  it('Should render nothing if screen is ready and not refetching data', () => {
    initialState.route.screenReady = true;
    initialState.route.isRefetchingData = false;
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
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <SSRContextProvider>
          <Component {...initialProps} />,
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('loading-indicator-wrapper')).not.toBeNull();
  });

  it('Should render the loading indicator if refetching data', () => {
    initialState.route.isRefetchingData = true;
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
