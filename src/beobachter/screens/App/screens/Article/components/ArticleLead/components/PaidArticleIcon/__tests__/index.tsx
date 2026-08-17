import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from './..';

describe('[Component] PaidArticleIcon component', () => {
  it.each([
    {},
    {
      restrictionStatus: null,
    },
    {
      restrictionStatus: 'registered',
    },
    {
      restrictionStatus: 'paid',
    },
  ])('Should match snapshots with given props $#', (input) => {
    const { container } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS2322 ->  Type '{ restrictionStatus? */}
        <Component {...input} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
