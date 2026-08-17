/**
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

let initialProps = {};
let initialState = {};

beforeEach(() => {
  initialState = {
    window: windowInitialState,
  };
  initialProps = {
    list: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] Search Result', () => {
  it('Should render nothing when no search result articles are passed', () => {
    initialProps = {};

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should render nothing when an empty array of search results is passed', () => {
    // @ts-ignore
    initialProps.list.edges = [];

    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
    expect(queryByTestId('searchresult-teaserlist-wrapper')).toBeNull();
  });

  it('Should render correctly', () => {
    const { getByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const teaserGridWrapper = getByTestId('searchresult-teaserlist-wrapper');

    expect(teaserGridWrapper).not.toBeNull();
  });
});
