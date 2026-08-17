import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

jest.mock('../../Header');

describe('[Component] HeaderArea', () => {
  it('Should render correctly', () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
