import React from 'react';
import { render } from '@testing-library/react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import styles from '../styles.legacy.css';

const menuLinks = [
  {
    node: {
      link: {
        path: '/first',
        label: 'First',
        isMainChannel: true,
      },
    },
  },
  {
    node: {
      link: {
        path: '/second',
        label: 'Second',
        isMainChannel: true,
      },
    },
  },
  {
    node: {
      link: {
        path: '/third',
        label: 'Third',
        isMainChannel: true,
      },
    },
  },
  {
    node: {
      link: { path: '/invalid' },
    },
  },
  {
    node: {
      link: {},
    },
  },
  {
    node: {},
  },
  {},
];

describe('[Component] NavigationBar', () => {
  test('Should render the navigation wrapper and all valid items', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component menuLinks={menuLinks} />
      </ReduxProvider>,
    );

    expect(queryByTestId('navigation-container')).not.toBeNull();

    const navigationItemsCount =
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('navigation-container').getElementsByTagName('li').length ||
      0;
    // we want the navigation items with missing information to not be rendered
    expect(navigationItemsCount).toBe(3);
  });

  test('Should render nothing because no navigation items are provided', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MenuTreeItemEdge[]'. */}
        <Component menuLinks={null} />
      </ReduxProvider>,
    );

    expect(queryByTestId('navigation-container')).toBeNull();
  });

  test('Should show the currently active main channel as active', () => {
    const initialState = {
      settings: settingsInitialState,
    };
    initialState.settings.activeMainChannel = 'First';
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component menuLinks={menuLinks} />
      </ReduxProvider>,
    );

    const activeLinksCount =
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('navigation-container').getElementsByClassName(
        styles.Active,
      ).length || 0;

    expect(activeLinksCount).toEqual(1);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('navigation-menu-item-0').className).toContain(
      styles.Active,
    );
  });
});
