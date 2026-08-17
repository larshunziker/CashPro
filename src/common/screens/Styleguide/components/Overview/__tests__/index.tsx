import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[Common] Styleguide Overview', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <Component />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
