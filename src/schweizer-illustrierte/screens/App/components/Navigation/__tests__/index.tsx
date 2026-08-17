import React from 'react';
import { render } from '@testing-library/react';
import { navigationInitialState } from '../../../../../../shared/reducers/navigation';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import {
  TYPE_NAVIGATION_MENU_DEFAULT,
  TYPE_NAVIGATION_MENU_USER,
} from '../constants';

jest.mock('../components/NavigationMenu');

let initialState = { navigation: navigationInitialState };
const menuByName = {
  links: {
    edges: [
      {
        link: '/people',
        label: 'People',
      },
      {
        link: '/family',
        label: 'Family',
      },
      {
        link: '/body-health',
        label: 'Body & Health',
      },
    ],
  },
};

beforeEach(() => {
  initialState = {
    navigation: navigationInitialState,
  };
});

describe('[Components] Navigation', () => {
  test.each`
    visibleNavigation               | testid
    ${TYPE_NAVIGATION_MENU_USER}    | ${'navigation-navigationusermenu-wrapper'}
    ${TYPE_NAVIGATION_MENU_DEFAULT} | ${'navigation-navigationmenu-wrapper'}
    ${null}                         | ${'navigation-navigationmenu-wrapper'}
  `(
    'Should render Navigation $visibleNavigation properly',
    ({ visibleNavigation, testid }) => {
      initialState.navigation.visibleNavigation = visibleNavigation;
      const { queryByTestId } = render(
        <ReduxProvider initialState={initialState}>
          <Component
            navigationPrimaryMenu={menuByName}
            navigationUserMenu={menuByName}
          />
        </ReduxProvider>,
      );

      expect(queryByTestId(testid)).not.toBeNull();
    },
  );
});
