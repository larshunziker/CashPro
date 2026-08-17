import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { navigationInitialState } from '../../../../../../../shared/reducers/navigation';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockGraphQlData from './mockGraphQlData.json';
import { NavigationMenuType } from '../../../../../../../shared/constants/enums';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

beforeEach(() => {
  initialProps = {
    primaryMenuLinks: JSON.parse(JSON.stringify(mockGraphQlData)),
  };

  initialState = {
    route: routeInitialState,
    navigation: navigationInitialState,
  };

  /* @ts-ignore TODO: TS2739 ->  Type '{ pathname */
  initialState.route.locationBeforeTransitions = {
    pathname: '/ratgeber',
  };
});
afterEach(cleanup);

describe('[Component] NavigationMenu', () => {
  it('Should render nothing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.primaryMenuLinks = [];
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly, should render 25 items', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.navigation.visibleNavigation = NavigationMenuType.DEFAULT;
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    const menuItems = container.querySelectorAll('[data-testid^="menu-item-"]');

    expect(container.innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('menu-items-wrapper-primary').innerHTML).not.toBe('');
    expect(menuItems.length).toEqual(25);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(container.querySelector('.ActiveLink').textContent).toBe(
      'Alle Ratgeber Themen',
    );
  });

  it('Should render correctly and not execute the closeMenuHandler function in case navigation is not visible', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.navigation.visibleNavigation = '';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    const spy = jest.spyOn(console, 'log');

    fireEvent(
      container,
      new KeyboardEvent('keydown', {
        key: 'Escape',
        // @ts-ignore
        keyCode: 27,
        // @ts-ignore
        which: 27,
        bubbles: true,
      }),
    );

    expect(spy).toHaveBeenCalledTimes(0);
  });

  // it('Should render correctly and execute the closeMenuHandler function', () => {
  //   initialState = {
  //     navigation: { visibleNavigation: NavigationMenuType.DEFAULT },
  //   };

  //   const { container } = render(
  //     <ReduxProvider initialState={initialState}>
  //       <Component {...initialProps} />
  //     </ReduxProvider>,
  //   );

  //   const spy = jest.spyOn(console, 'log');

  //   fireEvent(
  //     container,
  //     new KeyboardEvent('keydown', {
  //       key: 'Escape',
  //       // @ts-ignore
  //       keyCode: 27,
  //       // @ts-ignore
  //       which: 27,
  //       bubbles: true,
  //     }),
  //   );

  //   expect(spy).toHaveBeenCalledTimes(1);
  // });
});
