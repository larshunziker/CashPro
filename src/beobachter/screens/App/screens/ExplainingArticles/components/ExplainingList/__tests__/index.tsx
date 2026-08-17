/**
 *
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from '../index';
import mockData from './mockData.json';

let initialProps = {};

beforeEach(() => {
  initialProps = {
    list: mockData,
  };
});

describe('[Component] EntriesList', () => {
  it('Should render nothing if no list is given', () => {
    // @ts-ignore
    const { container } = render(<Component />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render nothing if empty list is given', () => {
    // @ts-ignore
    initialProps.list = { edges: [] };
    // @ts-ignore
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('entrylist-elementlist-wrapper')).not.toBeNull();
  });
});
