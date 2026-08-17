import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../../gaultmillau/shared/tests/components/ReduxProvider';
import Component from '../index';

let initialProps = {
  IsLoading: true,
  loadMore: () => null,
  hasMoreResults: true,
  className: 'classname',
};
let initialState = {};

beforeAll(() => {
  initialProps = {
    ...initialProps,
  };
});

beforeEach(() => {
  initialProps = {
    ...initialProps,
  };

  initialState = {
    window: windowInitialState,
  };
});

describe('[Component] LazyLoading', () => {
  it('Should render component isLoading = false', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render component isLoading = false', () => {
    initialProps.IsLoading = false;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render component component wiht no more results', () => {
    initialProps.hasMoreResults = false;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});
