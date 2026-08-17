import { render } from '@testing-library/react';
import React from 'react';
import swipeIndicatorFactory from '../factory';

const swipeIndicatorFactoryOptions = {
  Wrapper: () => <div data-testid="swipeindicator-factory-wrapper" />,
  styles: {
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
  Component = swipeIndicatorFactory(swipeIndicatorFactoryOptions);
});

describe('[Common] swipeIndicator', () => {
  test('should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should render swipeIndicator', () => {
    const { queryByTestId, getAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...propsToRender} />,
    );

    // @ts-ignore
    expect(queryByTestId('swipeindicator-factory-wrapper')).toHaveClass(
      swipeIndicatorFactoryOptions.styles.Wrapper,
    );

    getAllByTestId('swipeindicator-factory-swipeIndicator').forEach(
      (element) => {
        // @ts-ignore
        expect(element).toHaveClass(
          swipeIndicatorFactoryOptions.styles.SwipeIndicator,
        );
      },
    );
  });

  test('should return nothing if slideCount is 0', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component {...propsToFail} />);
    expect(container.innerHTML).toBe('');
  });
});
