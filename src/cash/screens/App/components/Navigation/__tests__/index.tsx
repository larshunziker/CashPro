import React from 'react';
import { render } from '@testing-library/react';
import { navigationInitialState } from '../../../../../../shared/reducers/navigation';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { NavigationMenuType } from '../../../../../shared/constants/enums';

jest.mock(
  '../../../screens/MyCash/components/Musterportfolio/MusterportfolioTable',
);

let initialState = { navigation: navigationInitialState };
const menuByName = {
  links: {
    edges: [
      {
        node: {
          link: '/ratgeber',
          label: 'Ratgeber',
        },
      },
      {
        node: {
          link: '/beratung',
          label: 'Beratung',
        },
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
    visibleNavigation          | testid
    ${NavigationMenuType.USER} | ${'navigation-navigationusermenu-wrapper'}
  `('Should render Navigation correctly', ({ visibleNavigation, testid }) => {
    initialState.navigation.visibleNavigation = visibleNavigation;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component
          // @ts-ignore
          navigationPrimaryMenu={menuByName}
          navigationUserMenu={menuByName}
        />
      </ReduxProvider>,
    );

    expect(queryByTestId(testid)).not.toBeNull();
  });
});
