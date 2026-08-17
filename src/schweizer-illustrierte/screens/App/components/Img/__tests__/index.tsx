import { render } from '@testing-library/react';
import React from 'react';
import Component from '../index';
import imageMock from './mockData.json';

describe('[Components] Img', () => {
  test('Should render image wrapper', () => {
    const { container } = render(
      <Component url={imageMock.url} alt={imageMock.alt} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('Should render image wrapper with its children', () => {
    const { container } = render(
      <Component url={imageMock.url} alt={imageMock.alt}>
        {imageMock.caption}
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });
  test('Should render image without alt', () => {
    const { container } = render(<Component url={imageMock.url} />);

    expect(container).toMatchSnapshot();
  });

  test('Should render an img tag with all provided props', () => {
    const { container } = render(
      <Component
        height={imageMock.height}
        url={imageMock.url}
        alt={imageMock.alt}
        addClass={'Someclass'}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
