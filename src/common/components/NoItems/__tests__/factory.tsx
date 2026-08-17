/**
 * @file   No Alerts test
 */

import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import { NoItemsFactoryOptions } from '../typings';

let componentFactoryOptions: NoItemsFactoryOptions | any = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
const Icon = () => null;
const button = <button>Test</button>;

beforeEach(() => {
  componentFactoryOptions = {
    Icon: Icon,
    button: button,
    text: 'This is the test text',
    styles: {
      NoItemsWrapper: 'NoItemsWrapperClass',
      InnerWrapper: 'InnerWrapperClass',
      Text: 'TextClass',
      Icon: 'IconClass',
      Wrapper: 'WrapperClass',
    },
  };
  Component = componentFactory(componentFactoryOptions);
});

describe('[Common] no alerts component', () => {
  it('Should render correctly when all factory options are set', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly when minimum factory options are set ', () => {
    delete componentFactoryOptions.button;
    delete componentFactoryOptions.text;
    Component = componentFactory(componentFactoryOptions);

    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
