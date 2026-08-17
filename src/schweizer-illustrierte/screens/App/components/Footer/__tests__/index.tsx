import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component, { socials, socialsSY } from '../index';
import { MAIN_CHANNEL_STYLE } from '../../../constants';

const menuByName = {
  links: {
    edges: [
      {
        link: { path: '/foo', label: 'foo' },
        id: 'foo',
      },
      {
        link: { path: '/foo', label: 'foo2' },
        id: 'foo2',
      },
      {
        link: { path: '/foo', label: 'foo3' },
        id: 'foo3',
      },
    ],
  },
};

describe('[Components] Footer', () => {
  test('Should render no navigation wrapper nor items', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component />
      </ReduxProvider>,
    );

    expect(queryByTestId('footer-navigation-items-wrapper')).toBeNull();
  });

  test('Should render navigation wrapper and 3 items', () => {
    const { getByTestId } = render(
      <ReduxProvider>
        <Component menuByName={menuByName} />
      </ReduxProvider>,
    );

    const navigationItemsCount =
      getByTestId('footer-navigation-items-wrapper').getElementsByTagName('li')
        .length || 0;

    expect(navigationItemsCount).toBe(menuByName.links.edges.length);
  });

  test('Should render correct amount of SI social options', () => {
    const { getByTestId } = render(
      <ReduxProvider>
        <Component />
      </ReduxProvider>,
    );

    const socialsItemsCount =
      getByTestId('footer-socials-wrapper').getElementsByTagName('li').length ||
      0;

    expect(socialsItemsCount).toBe(socials.length);
  });

  test('Should render correct amount of SY social options', () => {
    const initialState = {
      settings: {
        activeMainChannel: MAIN_CHANNEL_STYLE,
      },
    };

    const { getByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component />
      </ReduxProvider>,
    );

    const socialsItemsCount =
      getByTestId('footer-socials-wrapper').getElementsByTagName('li').length ||
      0;

    expect(socialsItemsCount).toBe(socialsSY.length);
  });

  test('Should render copy right', () => {
    const { getByTestId } = render(
      <ReduxProvider>
        <Component />
      </ReduxProvider>,
    );

    expect(getByTestId('footer-copyright').innerHTML).toMatch(
      `${new Date().getFullYear()} Schweizer Illustrierte`,
    );
  });
});
