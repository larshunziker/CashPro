import { render } from '@testing-library/react';
import React from 'react';
import Component from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    isLoading: false,
    hasMoreResults: true,
    loadMore: null,
    children: null,
  };
});

describe('[Component] LazyLoading', () => {
  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('LazyLoading-wrapper')).not.toBe(null);
  });

  it('Should not render anything', () => {
    //@ts-ignore
    initialProps.hasMoreResults = false;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('LazyLoading-wrapper')).toBe(null);
  });

  it('Should render the Mehr laden label', () => {
    //@ts-ignore
    delete initialProps.children;
    //@ts-ignore
    delete initialProps.isLoading;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('Lazy-Loading-load-more-wrapper')).toMatchSnapshot();
  });
});
