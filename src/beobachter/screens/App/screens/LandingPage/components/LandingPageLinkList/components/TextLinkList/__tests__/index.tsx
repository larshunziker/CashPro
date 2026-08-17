import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] TextLinkList', () => {
  it('Should render noting', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.items.edges = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { container } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
