/**
 * @file   Comment Set Username Form Test
 * @author Andrea Reber <andrea.reber@ringieraxelspringer.ch>
 * @date   2019-05-24
 */

import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

const componentFactoryOptions = {
  styles: {
    Button: 'Button',
    ButtonWrapper: 'ButtonWrapper',
    Message: 'Message',
  },
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] CommentSetUsernameForm', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render without crashing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
