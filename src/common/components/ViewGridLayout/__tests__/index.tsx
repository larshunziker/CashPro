import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[Component] ViewGridLayout', () => {
  it('Should return not render grid', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'RASCHGRIDLAYOUT=0',
    });
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });

  it('Should return render grid correctly', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'RASCHDEBUG=1; RASCHGRIDLAYOUT=1',
    });
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
