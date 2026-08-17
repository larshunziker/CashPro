import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

const componentFactoryOptions = {
  Icon: () => <div data-testid="slidernavigation-factory-icon" />,
  styles: {
    Wrapper: 'WrapperClassName',
    NextButton: 'NextButtonClassName',
    PrevButton: 'PrevButtonClassName',
    TopArrows: 'TopArrowsClassName',
  },
};

const componentProps = {
  // eslint-disable-next-line
  nextImage: () => {},
  // eslint-disable-next-line
  prevImage: () => {},
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  // @ts-ignore
  Component = componentFactory(componentFactoryOptions);
});

describe('[Common] SliderNavigation', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should render navigation', () => {
    const { queryByTestId, queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...componentProps} />,
    );

    expect(queryAllByTestId('slidernavigation-factory-wrapper')).toHaveLength(
      1,
    );
    // @ts-ignore
    expect(queryByTestId('slidernavigation-factory-wrapper')).toHaveClass(
      componentFactoryOptions.styles.Wrapper,
    );

    expect(
      queryAllByTestId('slidernavigation-factory-prev-button'),
    ).toHaveLength(1);
    expect(
      queryAllByTestId('slidernavigation-factory-next-button'),
    ).toHaveLength(1);

    const prevButton = queryByTestId('slidernavigation-factory-prev-button');
    const nextButton = queryByTestId('slidernavigation-factory-next-button');

    // @ts-ignore
    expect(prevButton).toHaveClass(componentFactoryOptions.styles.PrevButton);
    // @ts-ignore
    expect(prevButton).toHaveAttribute('title');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(prevButton.getAttribute('title')).toBe('previous');

    // @ts-ignore
    expect(nextButton).toHaveClass(componentFactoryOptions.styles.NextButton);
    // @ts-ignore
    expect(nextButton).toHaveAttribute('title');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(nextButton.getAttribute('title')).toBe('next');
  });
});
