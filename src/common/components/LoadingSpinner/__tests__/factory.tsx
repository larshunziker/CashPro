/**
 * @file   LoadingSpinner test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-13 10:18:08
 */

import { cleanup, render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

let componentFactoryOptions: any = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  componentFactoryOptions = {
    styles: {
      SpinnerWrapper: 'SpinnerWrapperClassName',
      Spinner: 'SpinnerClassName',
      Path: 'PathClassName',
    },
  };
});

afterEach(cleanup);

describe('[Common] LoadingSpinner', () => {
  test('Should return component from factory', () => {
    Component = componentFactory(componentFactoryOptions);
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
