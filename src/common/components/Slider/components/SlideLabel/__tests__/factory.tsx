import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

const componentFactoryOptions = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  ImageCaption: (props) => <div>{props.credit}</div>,
  styles: {
    Wrapper: 'WrapperClassName',
  },
};

const componentProps = {
  activeIndex: 0,
  labels: [{ credit: 'Credit 1' }],
  slideDimensions: [{ format: 'landscape' }],
};

beforeEach(() => {
  // @ts-ignore
  Component = componentFactory(componentFactoryOptions);
});

describe('[Common] SlideLabel', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should render slide label', () => {
    const { queryByTestId, queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...componentProps} />,
    );

    const slideLabelElement = queryByTestId('slidelabel-factory-wrapper');
    const mockLabelText =
      componentProps.labels[componentProps.activeIndex].credit;

    expect(queryAllByTestId('slidelabel-factory-wrapper')).toHaveLength(1);
    // @ts-ignore
    expect(slideLabelElement).toHaveClass(
      componentFactoryOptions.styles.Wrapper,
    );
    // @ts-ignore
    expect(slideLabelElement).toHaveTextContent(mockLabelText);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(slideLabelElement.textContent).toHaveLength(mockLabelText.length);
  });
});
