import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { navigationInitialState } from '../../../../../../../../shared/reducers/navigation';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, { SubMenu, SubMenus } from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
jest.mock('Link', () => ({ children }) => <>{children}</>);

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const toggleNavigation = () => null;

beforeEach(() => {
  initialProps = {
    doSetNavigationMenuEl: () => null,
    setNavigationVisible: () => null,
    navigationMenuHZ: mockData,
    navigationMenuBIL: mockData,
    navigationMenuSV: mockData,
    withRouter: () => null,
  };

  initialState = {
    navigation: {
      ...navigationInitialState,
      visibleNavigation: 'navigation-menu-type/default',
    },
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

  it('Should close when clicking on Escape', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const spy = jest.spyOn(console, 'log');
    const wrapper = queryByTestId('navigation-wrapper');
    expect(spy).toHaveBeenCalledTimes(0);
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.keyDown(wrapper, {
      key: 'Escape',
      keyCode: 27,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });

  it('Should not close when clicking on other key than Escape', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const spy = jest.spyOn(console, 'log');
    const wrapper = queryByTestId('navigation-wrapper');

    expect(spy).toHaveBeenCalledTimes(0);
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.keyDown(wrapper, {
      key: 'tab',
      keyCode: 9,
    });
    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockClear();
  });

  it('Should close the Navigation on button click', () => {
    const { getByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const spy = jest.spyOn(console, 'log');
    const buttonEl = getByTestId('navigation-close-button');

    expect(spy).toHaveBeenCalledTimes(0);
    fireEvent.click(buttonEl);
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockClear();
  });

  it('Should not render HZ menu', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.navigationMenuHZ;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('navigation-menu-sv-wrapper')).not.toBeNull();
    expect(queryByTestId('navigation-menu-hz-wrapper')).toBeNull();
  });

  it('Should not render SV menu', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.navigationMenuSV;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('navigation-menu-sv-wrapper')).toBeNull();
    expect(queryByTestId('navigation-menu-hz-wrapper')).not.toBeNull();
  });

  it('Should render submenu', () => {
    const { queryByTestId } = render(
      <SubMenu // @ts-ignore MenuTreeItemConnection type has required pageinfo and count attributes
        entry={mockData.data.menuByName.links.edges[0].node}
        closeNavigation={toggleNavigation}
      />,
    );
    expect(queryByTestId('navigation-menu-submenu')).not.toBeNull();
  });

  it('Should not render submenu when there are no subnodes', () => {
    const { queryByTestId } = render(
      <SubMenu // @ts-ignore MenuTreeItemConnection type has required pageinfo and count attributes
        entry={mockData.data.menuByName.links.edges[1].node}
        closeNavigation={toggleNavigation}
      />,
    );
    expect(queryByTestId('navigation-menu-submenu')).toBeNull();
  });

  it('Should render submenu as list with and without subtree', () => {
    // mockData.data.menuByName.links.edges.pop();
    const { queryByTestId, queryAllByText } = render(
      <SubMenus // @ts-ignore MenuTreeItemConnection type has required pageinfo and count attributes
        menu={{ ...mockData.data.menuByName }}
        closeNavigation={toggleNavigation}
      />,
    );

    expect(queryAllByText('navigation-menu-submenu')).not.toBeNull();
    expect(queryByTestId('navigation-menu-without-submenu')).not.toBeNull();
  });

  it('Should render submenu as list without subtree', () => {
    delete mockData.data.menuByName.links.edges[1];
    // mockData.data.menuByName.links.edges.pop();
    const { queryByTestId, queryAllByText } = render(
      <SubMenus // @ts-ignore MenuTreeItemConnection type has required pageinfo and count attributes
        menu={{ ...mockData.data.menuByName }}
        closeNavigation={toggleNavigation}
      />,
    );

    expect(queryAllByText('navigation-menu-submenu')).not.toBeNull();
    expect(queryByTestId('navigation-menu-without-submenu')).toBeNull();
  });
});
