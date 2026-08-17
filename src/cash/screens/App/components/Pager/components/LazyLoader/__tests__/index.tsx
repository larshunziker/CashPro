import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    currentPage: 1,
    itemsCount: 5,
    itemsPerPage: 1,
    pager: {
      hasNextPage: jest.fn(),
      handleNextPage: jest.fn(),
    },
  };
});

describe('[Component] LazyLoader', () => {
  it('Should render nothing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);

    expect(container).toMatchSnapshot();
  });
  it('Should not render button if no next page is needed ', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.itemsPerPage = 10;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);

    expect(container).toMatchSnapshot();
  });
});
