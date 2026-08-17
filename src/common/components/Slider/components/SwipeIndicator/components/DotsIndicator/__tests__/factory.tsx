import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

let Component = null;

const validComponentFactoryOptions = {
  styles: {
    Active: 'Active',
    Wrapper: 'Wrapper',
    SwipeIndicator: 'SwipeIndicator',
  },
};

const emptyComponentFactoryOptions = {};

const validProps = {
  slideCount: 5,
  activeIndex: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearUpdateActiveIndex: () => {},
};

const emptyProps = {
  slideCount: 0,
};

describe('[Common] DotsIndicator', () => {
  test('Should return component from factory', () => {
    Component = componentFactory(validComponentFactoryOptions);
    expect(Component).not.toBe(null);
  });

  test('Should render correctly (with default styles)', () => {
    // @ts-ignore
    Component = componentFactory(emptyComponentFactoryOptions);
    const { queryByTestId } = render(<Component {...validProps} />);
    expect(queryByTestId('dots-indicator-wrapper')).not.toBe(null);
  });

  test('Should render correctly (with the given styles)', () => {
    Component = componentFactory(validComponentFactoryOptions);
    const { queryByTestId, container } = render(<Component {...validProps} />);
    expect(queryByTestId('dots-indicator-wrapper')).not.toBe(null);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('dots-indicator-wrapper').innerHTML).not.toBe('');
    expect(container.querySelectorAll('button')).toHaveLength(
      validProps.slideCount,
    );
  });

  test('Should render an empty container', () => {
    // @ts-ignore
    Component = componentFactory(emptyComponentFactoryOptions);
    const { queryByTestId, container } = render(<Component {...emptyProps} />);
    expect(queryByTestId('dots-indicator-wrapper')).not.toBe(null);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('dots-indicator-wrapper').innerHTML).toBe('');
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });
});
