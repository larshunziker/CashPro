/**
 * @file   keyword list component tests
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-05-13
 *
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component, { SearchResultProps } from '../index';
import mockData from './mockData.json';

let initialProps: SearchResultProps = {};

beforeEach(() => {
  initialProps = {
    list: mockData,
  };
});

describe('[Component] KeywordList component', () => {
  it('Should render nothing if no list is given', () => {
    const { container } = render(<Component />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render nothing if empty list is given', () => {
    initialProps.list = { edges: [] };
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );
    expect(container.innerHTML).toBe('');
    expect(queryByTestId('keywordlist-elementlist-wrapper')).toBeNull();
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('keywordlist-elementlist-wrapper')).not.toBeNull();
  });
});
