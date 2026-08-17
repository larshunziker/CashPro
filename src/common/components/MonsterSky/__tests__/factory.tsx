import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import monsterSkyFactory from '../factory';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import scrollStateSelector from '../../../../shared/selectors/scrollStateSelector';
import windowStateSelector from '../../../../shared/selectors/windowStateSelector';
import { SBA_1 } from '../../../../shared/constants/adZone';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
const initialState = {
  scroll: {
    scrollTop: 0,
  },
  window: {
    height: 886,
    scrollTop: 0,
    viewport: {
      label: 'viewport/xxl',
      from: 960,
      to: 1599,
    },
    imageBreakpoint: {
      label: '450',
    },
    width: 1938,
  },
  route: {
    screenReady: true,
    vertical: 'vertical/home',
    pathname: '/',
    locationBeforeTransitions: { pathname: '/camindada' },
  },
};

const AppNexus = jest.fn((props) => (
  <div data-testid="appnexus-wrapper">{JSON.stringify(props, null, 2)}</div>
));

beforeAll(() => {
  Component = monsterSkyFactory({
    AppNexus,
    scrollStateSelector,
    windowStateSelector,
    locationStateSelector,
    slot: SBA_1,
    monsterSkyMinWindowWidth: 1200,
    monsterSkyMinMarginTop: 120,
    styles: {
      Wrapper: 'WrapperClassName',
      WrapperInner: 'WrapperInnerClassName',
      AdWrapper: 'AdWrapperClassName',
      Ad: 'AdClassName',
      Sticky: 'StickyClassName',
    },
  });
});

describe('[Common] Monstersky', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render component correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render component', () => {
    initialState.window.width = 959;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
