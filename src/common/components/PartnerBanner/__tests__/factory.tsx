import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { cleanup, render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockdata.json';
import { PartnerBannerFactoryOptions, PartnerBannerProps } from '../typings';

// @ts-ignore
let componentFactoryOptions: PartnerBannerFactoryOptions = {};
// @ts-ignore
let initialProps: PartnerBannerProps = {};
let initialState = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
// @ts-ignore
const windowInitialState: WindowState = {
  height: 1080,
  viewport: {
    label: 'viewport/xl',
    from: 1680,
    to: 9999999,
  },
  width: 1680,
  imageBreakpoint: {
    // @ts-ignore
    label: 1680,
  },
};
const routeInitialState: LocationState = {
  locationBeforeTransitions: {
    pathname: '/home',
    search: '',
    hash: '',
    action: 'PUSH',
    key: 'b86ozif',
    query: {},
  },
  screenReady: true,
  // @ts-ignore
  isReferrerFullscreen: false,
};

jest.mock('Link');
beforeEach(() => {
  componentFactoryOptions = {
    styles: {
      ImageContainer: 'ClassNameImageContainer',
      BackgroundImageWrapper: 'ClassNameBackgroundImageWrapper',
      BackgroundImage: 'ClassNameBackgroundImage',
      PartnerLogo: 'ClassNamePartnerLogo',
      Caption: 'ClassNameCaption',
    },
  };
  initialProps = JSON.parse(JSON.stringify(mockData));

  initialState = {
    route: routeInitialState,
    window: windowInitialState,
  };
});

afterEach(cleanup);

describe('[Common] PartnerBanner', () => {
  test('Should return component from factory', () => {
    Component = componentFactory(componentFactoryOptions);
    expect(Component).not.toBeNull();
  });

  it.each([
    [{ sponsors: [], locationState: [] }],
    [{ sponsors: 1, locationState: [] }],
    [{ sponsors: null, locationState: null }],
    [{ sponsors: [1, 2, 3] }],
  ])('Should render according to passed props (%#)', (testCase) => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component sponsors={testCase.sponsors} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);

    // remove two entries from the array, because the component always chooses a random sponsor
    initialProps.sponsors.splice(0, 2);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render existing sponsor', () => {
    const store = createStore((state) => state, initialState);

    initialProps.sponsors = JSON.parse(JSON.stringify(mockData.sponsors));
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
