import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    list: mockData,
  };
});

describe('[Component] EntriesList component', () => {
  it('Should render nothing if no list is given', () => {
    // @ts-ignore
    const { container } = render(<Component />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render nothing if empty list is given', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.list = { edges: [] };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('entrylist-elementlist-wrapper')).not.toBeNull();
  });
});
