import React from 'react';
import { render } from '@testing-library/react';
import Component from '..';

describe('[Component] Error', () => {
  it('Should match the snapshot', () => {
    const { container } = render(<Component msg="Error Component" />);
    expect(container).toMatchSnapshot();
  });
});
