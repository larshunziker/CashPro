import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

const componentFactoryOptions = {
  styles: {
    Wrapper: 'WrapperClassName',
  },
};

const componentProps = {
  key: 0,
  index: 0,
  slide: 0,
  positions: [184],
  isActive: true,
  visible: true,
  fadeInactive: true,
  slideWidth: 364,
  opacityInactive: 0,
  syncParentHeight: false,
  deltaX: 0,
  height: '488px',
  animate: true,
  children: null,
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

const divMockText = 'IMAGE';
const DivMockComponent = () => (
  <div data-testid="cssslide-factory-item-children">{divMockText}</div>
);

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  /* @ts-ignore TODO: TS2322 ->  Type '() => JSX.Element' is not assignable to type 'null'. */
  componentProps.children = () => <DivMockComponent />;
});

describe('[Common] CSSSlide', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should render one slide', () => {
    const { queryByTestId, queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...componentProps} />,
    );

    expect(queryAllByTestId('cssslide-factory-wrapper')).toHaveLength(1);
    // @ts-ignore
    expect(queryByTestId('cssslide-factory-wrapper')).toHaveClass(
      componentFactoryOptions.styles.Wrapper,
    );
    // @ts-ignore
    expect(queryByTestId('cssslide-factory-wrapper')).toHaveStyle(`
      transform: translate(${
        componentProps.positions[componentProps.index] - componentProps.deltaX
      }px, 0);
      width: ${componentProps.slideWidth}px;
      height: ${componentProps.height};
    `);

    expect(queryAllByTestId('cssslide-factory-item')).toHaveLength(1);

    expect(queryAllByTestId('cssslide-factory-item-children')).toHaveLength(1);
    // @ts-ignore
    expect(queryByTestId('cssslide-factory-item-children')).toHaveTextContent(
      divMockText,
    );
  });
});
