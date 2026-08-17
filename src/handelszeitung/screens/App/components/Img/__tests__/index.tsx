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
          allowUpscaling: true,
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
          title: 'img title',
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
          title: 'img title',
          width: 200,
          height: 100,
          cropped: true,
        },
      },
    ],
  ])('Should match snapshot with given props %#', (testCase) => {
    // @ts-ignore
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
