import { render } from '@testing-library/react';
import React from 'react';
import ModalOverlay from '../index';

describe('[Component] - Modal Overlay', () => {
  it('should render', () => {
    const { container } = render(<ModalOverlay isVisible={true} />);
    expect(container).not.toBeNull();
  });
});
