/**
 * @file   AppNexus factory test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2018-09-04 08:57:42
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import ReduxProvider from '../../../../handelszeitung/shared/tests/components/ReduxProvider';

/* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
global.Ads = {
  config: {
    platform: 'MobileWeb|Desktop',
    publisher: 'rasch',
  },
};

const windowInitialState: WindowState = {
  height: 886,
  viewport: {
    label: 'viewport/xl',
    from: 960,
    to: 1599,
  },
  imageBreakpoint: {
    label: '540',
    from: 0,
    to: 540,
  },
  width: 1038,
};
const routeInitialState: LocationState = {
  locationBeforeTransitions: {
    pathname: '/',
    search: '',
    hash: '',
    action: 'POP',
    key: null,
    query: {},
  },
  vertical: 'vertical/home',
  screenReady: false,
  isInitialPage: true,
};

const mapViewportToAdViewport = (viewportLabel: ViewportLabel) => viewportLabel;
let Component: React.FC<any> = () => null;
const initialState = {
  route: routeInitialState,
  window: windowInitialState,
};
let initialProps = {
  slot: '',
  deviceType: 'tabletDesktop',
};
const componentFactoryOptions = {
  mapViewportToAdViewport,
  styles: {
    AdSlot: 'ClassNameAdSlot',
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    slot: 'WB1',
    deviceType: 'tabletDesktop',
  };
});

describe('[Component] AppNexus', () => {
  test('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should not render if no slot is present', () => {
    const store = createStore((state) => state, initialState);
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    initialProps.slot = null;
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with same container check', () => {
    const store = createStore((state) => state, initialState);
    const { container, rerender } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    initialProps = {
      slot: 'WB1',
      deviceType: 'tabletDesktop',
    };
    initialState.route.isInitialPage = false;
    rerender(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with not same container check', () => {
    const { container, rerender } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();

    initialProps = {
      slot: 'WB2',
      deviceType: 'tabletDesktop',
    };
    initialState.route.isInitialPage = false;
    initialState.route.screenReady = true;
    initialState.window.viewport.label = 'viewport/lg';
    rerender(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
