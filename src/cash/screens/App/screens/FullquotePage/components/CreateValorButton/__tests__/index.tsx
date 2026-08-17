import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[COMPONENT] CreateValorButton', () => {
  it('should render nothing if fullquoteParam is empty', () => {
    const { container } = render(<Component fullquoteParam="" />);
    expect(container.innerHTML).toBe('');
  });

  it('should render CreateValorButton', () => {
    const { container } = render(<Component fullquoteParam="/aktien/ubs" />);
    expect(container.innerHTML).toContain('Create Valor in CMS');
  });
});
