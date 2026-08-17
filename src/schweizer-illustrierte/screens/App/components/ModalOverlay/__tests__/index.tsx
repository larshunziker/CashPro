import { render } from '@testing-library/react';
import React from 'react';
import Component from '../index';

describe('[Components] ModalOverlay', () => {
  it('Should render correctly', () => {
    const { container } = render(<Component isVisible={true} />);
    expect(container).not.toBeNull();
  });
});
