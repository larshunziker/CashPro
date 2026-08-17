/**
 * @file   search result tests
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-05-13
 *
 */

import React from 'react';
import { windowInitialState } from '../../../../../../../../../../shared/reducers/window';
import { VIEWPORT_MD } from '../../../../../../../../../../shared/actions/window';
import Component, { SearchResultProps } from '../index';
import { render } from '../../../../../../../../../shared/customRenderer';
import mockData from './mockData.json';

let initialProps: SearchResultProps = {};
let initialState: Partial<Pick<ReduxState, 'window'>> = {};

beforeEach(() => {
  initialState = {
    window: windowInitialState,
  };
  initialProps = {
    list: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] Search Result component', () => {
  it('Should render nothing when no search result articles are passed', () => {
    initialProps = {};

    const { container } = render(<Component {...initialProps} />);

    expect(container.innerHTML).toBe('');
  });

  it('Should render nothing when an empty array of search results is passed', () => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    initialProps.list.edges = [];

    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );

    expect(container.innerHTML).toBe('');
    expect(queryByTestId('searchresult-teaserlist-wrapper')).toBeNull();
  });

  it('Should render correctly', () => {
    const { getByTestId } = render(<Component {...initialProps} />);
    const teaserListWrapper = getByTestId('searchresult-teaserlist-wrapper');

    expect(teaserListWrapper).not.toBeNull();
  });

  it('Should render correctly on Medium Screen', () => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    initialState.window.viewport.label = VIEWPORT_MD;
    const { getByTestId } = render(<Component {...initialProps} />);
    const teaserListWrapper = getByTestId('searchresult-teaserlist-wrapper');

    expect(teaserListWrapper).not.toBeNull();
  });
});
