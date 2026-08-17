/**
 * @file   inView test
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-03-11
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import Component from '../index';

const initialProps = {
  isInView: false,
  config: {
    rootMargin: '200px',
    threshold: 0,
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

const initialState = {
  window: windowInitialState,
  route: {
    screenReady: true,
    isInitialPage: true,
    locationBeforeTransitions: {
      pathname: '/',
    },
  },
};

describe('[Component] InView', () => {
  test('Should render correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps}>
          {({ isInView }) => isInView && <p>Component</p>}
        </Component>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
