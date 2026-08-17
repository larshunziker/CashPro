/**
 * @file   AlertItem tests
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-10-23 18:02:45
 */

import React from 'react';
import { render } from '@testing-library/react';
import alertItemFactory from '../factory';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';

jest.mock('Link');

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
const initialState = {
  window: {
    height: 886,
    scrollTop: 0,
    viewport: {
      label: 'viewport/xl',
      from: 960,
      to: 1599,
    },
    imageBreakpoint: {
      label: '450',
    },
    width: 1038,
  },
};

const factoryOptions = {
  styles: {
    AlertItemWrapper: 'AlertItemWrapperClassName',
    AlertItemImageWrapper: 'AlertItemImageWrapperClassName',
    AlertItemImage: 'AlertItemImageClassName',
    Text: 'TextClassName',
    ChildWrapper: 'ChildWrapperClassName',
  },
};

beforeEach(() => {
  Component = alertItemFactory(factoryOptions);
});

describe('[Common] AlertItem', () => {
  it.each([
    [{ label: 'label', url: '/home' }],
    [{ label: 'label', url: '' }],
    [{ label: '', url: '' }],
    [{ label: '', url: '/contact' }],
    [{ label: 'label', url: '/home', relativeOriginPath: '' }],
    [
      {
        label: 'label',
        url: '/home',
        relativeOriginPath: '/roger_federer.jpg',
      },
    ],
  ])('Should render and match snapshot %#', (testCase: any) => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component
          label={testCase.label}
          url={testCase.url}
          relativeOriginPath={testCase.relativeOriginPath || ''}
          focalPointX={1000}
          focalPointY={1000}
          imageStyles={{ style_320: 'small' }}
        >
          <div>child element</div>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        </Component>
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
