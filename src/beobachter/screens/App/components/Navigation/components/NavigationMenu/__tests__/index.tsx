import React from 'react';
import { render } from '@testing-library/react';
import { noop } from '../../../../../../../../shared/helpers/utils';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import PrimaryMenu from '../components/PrimaryMenu';
import Component from '../index';
import mockedNavigationPrimary from './mockedNavigationPrimary.json';
import mockedNavigationSecondary from './mockedNavigationSecondary.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    links: {},
    navigationPrimaryMenu: mockedNavigationPrimary,
    navigationSecondaryMenu: mockedNavigationSecondary,
    navigationQuickAccessMenu: {},
    visibleNavigation: 'navigation-menu-type/default',
    locationStatePathname: '/',
  };
  initialState = {
    route: routeInitialState,
  };
});

describe('[Component] NavigationMenu', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('navigation-wrapper')).not.toBeNull();
  });

  it('Should render submenus', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    const primary = queryByTestId('primary-navigation-menu-navigation-wrapper');

    expect(primary).not.toBeNull();

    const secondary = queryByTestId(
      'secondary-navigation-menu-navigation-wrapper',
    );

    expect(secondary).not.toBeNull();
  });

  it('Should render at least one link in Primary navigation', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore MenuTreeItemConnection type has required pageinfo and count attributes */}
        <PrimaryMenu menu={mockedNavigationPrimary} closeNavigation={noop} />
      </ReduxProvider>,
    );
    const container = queryByTestId(
      'primary-navigation-menu-navigation-wrapper',
    );

    expect(container).not.toBeNull();

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    const linksList = container.querySelectorAll('li');

    expect(linksList).not.toBeNull();
    expect(linksList.length).toBeGreaterThan(1);
  });
});
