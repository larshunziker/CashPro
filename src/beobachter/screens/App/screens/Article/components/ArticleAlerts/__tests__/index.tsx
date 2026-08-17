/**
 *
 */

import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

let initialProps = {};
let initialState = {};

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

initialState = {
  window: windowInitialState,
};

afterEach(cleanup);

describe('[Component] Article Alerts', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('article-alerts')).not.toBeNull();
    expect(queryByTestId('alertlist-wrapper')).not.toBeNull();
  });

  it('Should render nothing', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component items={null} />
      </ReduxProvider>,
    );
    expect(queryByTestId('article-alerts')).toBeNull();
  });

  it('Should render nothing if there are no keywords', () => {
    // @ts-ignore
    initialProps.items = [];
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('article-alerts')).toBeNull();
  });
});
