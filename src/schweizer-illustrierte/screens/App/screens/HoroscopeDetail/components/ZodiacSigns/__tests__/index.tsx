import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from '../index';
import { ZODIAC_SIGNS_DATA } from '../../../../../../../shared/helpers/zodiacSigns';

describe('[Component] ZodiacSigns', () => {
  test('Should render zodiac signs component with items', () => {
    const { queryAllByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore */}
        <Component />
      </MemoryRouter>,
    );

    expect(queryAllByTestId('zodiac-sign')).toHaveLength(
      ZODIAC_SIGNS_DATA.length,
    );
  });

  test('Should render zodiac sign with Active class', () => {
    const { queryAllByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore */}
        <Component current={ZODIAC_SIGNS_DATA[0]} />
      </MemoryRouter>,
    );

    expect(queryAllByTestId('routed-link')[0].getAttribute('class')).toContain(
      'Active',
    );
  });
});
