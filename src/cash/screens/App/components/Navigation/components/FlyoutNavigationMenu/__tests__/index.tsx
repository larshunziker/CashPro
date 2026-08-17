import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { navigationInitialState } from '../../../../../../../shared/reducers/navigation';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockGraphQlData from './mockGraphQlData.json';
import { NavigationMenuType } from '../../../../../../../shared/constants/enums';

jest.mock(
  '../../../../../screens/MyCash/components/Musterportfolio/MusterportfolioTable',
);

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

describe('[Component] FlyoutMenu', () => {
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

  it('Should render correctly, should render 16 title links and 6 links', () => {
    initialState = {
      navigation: { visibleNavigation: NavigationMenuType.FLYOUT_NAVI_MENU },
    };

    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
      </ReduxProvider>,
    );

    screen.debug();

    const flyouTitletLinks = container.querySelectorAll(
      '[data-testid^="flyout-menu-title-link"]',
    );

    const flyouLinks = container.querySelectorAll(
      '[data-testid^="flyout-menu-link"]',
    );

    expect(container.innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('flyout-menu-items-wrapper').innerHTML).not.toBe('');

    expect(flyouTitletLinks.length).toEqual(16);
    expect(flyouLinks.length).toEqual(6);
  });

  it('Should render correctly and not execute the handleClickOutside function in case navigation is not visible', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.navigation.visibleNavigation = '';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
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

  it('Should render correctly and execute the handleClickOutside function', () => {
    initialState = {
      navigation: { visibleNavigation: NavigationMenuType.FLYOUT_NAVI_MENU },
    };

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </MockedProvider>
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

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
