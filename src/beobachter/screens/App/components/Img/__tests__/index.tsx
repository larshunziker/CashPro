import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
          cover: true,
          noWrap: false,
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
          itemProp: 'item-prop-string',
          addClass: 'addClass',
          cover: true,
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

  it('Should render with children and run the onload fn', async () => {
    const onLoadFn = jest.fn();
    const props = {
      url: 'path/to/img.jpg',
      onLoadHandler: onLoadFn,
    };

    const { container } = render(
      // @ts-ignore
      <Component {...props}>
        <div>my children</div>
      </Component>,
    );

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLImageElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.load(container.querySelector('img'));

    expect(onLoadFn).toBeCalledTimes(1);
    expect(container).toMatchSnapshot();
  });
});
