import React from 'react';
import { cleanup, render } from '@testing-library/react';
import swipeIndicatorFactory from '../factory';

const swipeIndicatorFactoryOptions = {
  styles: {
    Indicator: 'Test',
    Wrapper: 'WrapperClassName',
    SwipeIndicator: 'SwipeIndicatorClassName',
    Active: 'ActiveClassName',
  },
};

const propsToFail = {
  slideCount: 0,
};

const propsToRender = {
  activeIndex: 2,
  slideCount: 8,
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  // @ts-ignore
  Component = swipeIndicatorFactory(swipeIndicatorFactoryOptions);
});

//Delete mounted tree after every test. Probably saves ressources...
afterEach(cleanup);

describe('[Common] swipeIndicator', () => {
  test('should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should render swipeIndicator', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...propsToRender} />);
    // @ts-ignore
    expect(queryByTestId('swipe-indicator-wrapper')).toHaveClass('Test');
  });

  test('should display right amount of total slides', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...propsToRender} />);
    // @ts-ignore
    expect(queryByTestId('swipe-indicator-total')).toHaveTextContent(
      propsToRender.slideCount + '',
    );
  });
  test('should display the correct current slide number', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...propsToRender} />);
    // @ts-ignore
    expect(queryByTestId('swipe-indicator-current')).toHaveTextContent('3');
  });
  test('should return nothing if there are no slides', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...propsToFail} />);
    expect(queryByTestId('swipe-indicator-wrapper')).toBeNull();
  });
});
