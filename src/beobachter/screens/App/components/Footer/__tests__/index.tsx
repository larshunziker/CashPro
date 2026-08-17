import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Logo } from '../index';

jest.mock('../../RefetchGqlDataLink');

describe('[Component] Footer', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
