import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[Common] - screens - Logout', () => {
  it('Should render correctly', () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
