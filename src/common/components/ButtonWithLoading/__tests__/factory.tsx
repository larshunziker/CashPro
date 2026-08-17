import React from 'react';
import { render } from '@testing-library/react';
import buttonLoadingFactory from '../factory';
import { ButtonFactoryOptions } from '../typings';

const MockIcon = () => null;
const factoryOptions: ButtonFactoryOptions = {
  Icon: MockIcon,
  styles: {
    Button: 'mock-class',
    Primary: '',
    Secondary: '',
    Tertiary: '',
  },
};
const spinnerTestId = 'button-loading-spinner-wrapper';
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  Component = buttonLoadingFactory(factoryOptions);
});

describe('[Common] ButtonLoading', () => {
  it('Should return a component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render a spinner', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { getByTestId } = render(<Component loading={true} />);
    expect(getByTestId(spinnerTestId)).not.toBeNull();
  });

  it('Should not render a spinner', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId(spinnerTestId)).toBeNull();
  });
});
