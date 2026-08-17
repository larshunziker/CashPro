import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';

const Icon = () => null;
const componentFactoryOptions = {
  Icon,
  styles: {
    Button: 'ButtonMockedClass',
    IconLeft: '',
    IconRight: '',
  },
};

let initialProps = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    iconTypeLeft: 'IconMagnifyingGlass',
  };
});

describe('[Component] ExpansionPanel', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>Test Button</Component>,
    );
    expect(container).toMatchSnapshot();
  });
});
