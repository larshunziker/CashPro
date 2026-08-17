import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[Components] ContentBoxTab - ContentBoxSkeleton', () => {
  it('Should render correctly', async () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
