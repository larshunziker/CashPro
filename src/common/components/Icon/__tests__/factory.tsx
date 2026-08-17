/**
 * @file   icon component test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-02-06 15:09:00
 */

import React from 'react';
import { render } from '@testing-library/react';
import iconFactory from '../factory';
//@ts-ignore
import iconFont from '@raschFont.legacy.css';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeAll(() => {
  Component = iconFactory({
    iconFont,
  });
});

describe('[Common] icon component', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test.each([
    {
      children: <div>test</div>,
      type: 'IconArrowRight',
      addClass: 'sample-addClass',
    },
    {
      type: 'samleIconType',
      addClass: 'sample-addClass',
      iconsOverride: {},
    },
  ])('Should icon component $# ', (testCase) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component {...testCase} />);
    expect(container).toMatchSnapshot();
  });
});
