/**
 * @file   Img test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-30 11:02:23
 */

import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[Component] Img', () => {
  it.each([
    [
      {
        props: {},
      },
    ],
    [
      {
        props: {
          url: 'path/to/img.jpg',
        },
      },
    ],

    [
      {
        props: {
          url: 'path/to/img.jpg',
          alt: 'alt text',
          title: 'img title',
          width: 200,
          height: 100,
        },
      },
    ],
    [
      {
        props: {
          url: 'path/to/img.jpg',
          alt: 'alt text',
          width: 100,
          height: 100,
          addClass: 'addClass',
        },
      },
    ],
    [
      {
        props: {
          url: 'path/to/img.jpg',
          alt: 'alt text',
          width: 200,
          height: 100,
          cropped: true,
        },
      },
    ],
  ])('Should match snapshot with given props %#', (testCase) => {
    const { container } = render(<Component {...testCase.props} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render with children', async () => {
    const props = {
      url: 'path/to/img.jpg',
    };

    const { container } = render(
      <Component {...props}>
        <div>my children</div>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });
});
