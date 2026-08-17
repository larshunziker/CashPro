import { render } from '@testing-library/react';
import React from 'react';
import Component from '../index';

let initialProps: any = {};

beforeEach(() => {
  initialProps = {
    isLoading: false,
    hasMoreResults: true,
    loadMore: null,
    children: null,
    pager: {},
  };
});

describe('[Component] LazyLoading', () => {
  test('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('LazyLoading-wrapper')).not.toBe(null);
  });

  test('Should not render anything', () => {
    //@ts-ignore
    initialProps.hasMoreResults = false;
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('LazyLoading-wrapper')).toBe(null);
  });

  test('Should render the Mehr laden label', () => {
    //@ts-ignore
    delete initialProps.children;
    //@ts-ignore
    delete initialProps.isLoading;
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('Lazy-Loading-load-more-wrapper')).toMatchSnapshot();
    expect(queryByTestId('Lazy-Loading-loading-wrapper')).toBe(null);
  });

  test('Should render the Wird geladen ... label', () => {
    //@ts-ignore
    initialProps.children = [];
    //@ts-ignore
    initialProps.hasMoreResults = true;
    //@ts-ignore
    initialProps.isLoading = true;
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('Lazy-Loading-loading-wrapper')).toMatchSnapshot();
    expect(queryByTestId('Lazy-Loading-load-more-wrapper')).toBe(null);
  });
});
