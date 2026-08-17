import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ZODIAC_SIGNS_DATA from '../../../../../../../shared/helpers/zodiacSigns';
import Component from '../index';

jest.mock('ModalOverlay');

describe('[Component] ZodiacSignsOverlay', () => {
  test('Should render zodiac signs component with correct items', () => {
    const { queryAllByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore */}
        <Component isVisible={true} />
      </MemoryRouter>,
    );

    expect(queryAllByTestId('zodiac-sign')).toHaveLength(12);
    expect(queryAllByTestId('zodiac-sign-icon')[0]).not.toBeNull();
    //@ts-ignore
    expect(queryAllByTestId('zodiac-sign-title')[0]).toHaveTextContent(
      ZODIAC_SIGNS_DATA[0].title,
    );
  });

  test('Should render title and subtitle', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component
          //@ts-ignore
          isVisible={true}
          title="Title"
          subtitle="Subtitle"
        />
      </MemoryRouter>,
    );
    //@ts-ignore
    expect(queryByTestId('title')).toHaveTextContent('Title');
    //@ts-ignore
    expect(queryByTestId('subtitle')).toHaveTextContent('Subtitle');
  });

  test('Should render zodiac sign with Active class', () => {
    const { queryAllByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore */}
        <Component isVisible={true} current={ZODIAC_SIGNS_DATA[0]} />
      </MemoryRouter>,
    );

    expect(queryAllByTestId('routed-link')[0].getAttribute('class')).toContain(
      'Active',
    );
  });
});
