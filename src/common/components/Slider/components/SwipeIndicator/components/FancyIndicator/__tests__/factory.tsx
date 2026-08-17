import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

let Component = null;

const componentFactoryOptions = {
  styles: {
    Wrapper: 'Wrapper',
    SwipeIndicator: 'SwipeIndicator',
  },
};

const initialProps = {
  totalWidth: 100,
  sliderWidth: 10,
  slideCount: 5,
  activeIndex: 0,
};

describe('[Common] FancyIndicator', () => {
  test('Should return component from factory', () => {
    Component = componentFactory(componentFactoryOptions);
    expect(Component).not.toBe(null);
  });

  test('Should render correctly (with default styles)', () => {
    // @ts-ignore
    Component = componentFactory({});
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('fancy-indicator-wrapper')).not.toBe(null);
  });

  test('Should render correctly (with the given styles)', () => {
    Component = componentFactory(componentFactoryOptions);
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('fancy-indicator-wrapper')).not.toBe(null);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fancy-indicator-wrapper').innerHTML).not.toBe('');
  });

  test('Should render correctly (with empty props and options)', () => {
    // @ts-ignore
    Component = componentFactory({});
    /* @ts-ignore TODO: TS2739 ->  Type '{}' is missing the following properties from type 'SwipeIndicatorProps' */
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('fancy-indicator-wrapper')).not.toBe(null);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fancy-indicator-wrapper').innerHTML).not.toBe('');
  });
});
