import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[Components] SearchIcon', () => {
  test('Should render svg correctly', () => {
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  test('Should render svg correctly with props', () => {
    const { container } = render(<Component classNames={'HelloSVG'} />);

    expect(container).toMatchSnapshot();
  });
});
