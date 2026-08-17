import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import swipeInteractionButtonFactory from '../factory';
import { windowInitialState } from '../../../../shared/reducers/window';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
let initialProps = {
  onClickHandler: jest.fn(),
  isHidden: false,
  children: null,
};
const factoryOptions = {
  styles: {
    Button: 'ButtonClassName',
    HideButton: 'HideButtonClassName',
    InViewAnimation: 'InViewAnimationClassName',
  },
};

beforeEach(() => {
  Component = swipeInteractionButtonFactory(factoryOptions);
  initialState = {
    window: windowInitialState,
    route: {
      screenReady: true,
      isInitialPage: true,
      locationBeforeTransitions: {
        pathname: '/',
      },
    },
  };
  initialProps = {
    ...initialProps,
  };
});

describe('[Common] SwipeInteractionButton', () => {
  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if isHidden', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} isHidden />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
