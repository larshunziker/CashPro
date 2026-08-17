import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import componentFactory from '../factory';

const initialState = {
  route: {
    locationBeforeTransitions: {
      pathname: '/home',
      search: '',
      hash: '',
      action: 'PUSH',
      key: 'b86ozif',
      query: {},
    },
    screenReady: true,
  },
};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

const componentFactoryOptions = {
  Icon: () => <div className="Icon"></div>,
  LoadingSpinner: () => <div className="LoadingSpinner"></div>,
  styles: {
    PullTip: 'PullTipClass',
    Spinner: 'SpinnerClass',
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] Pull2Refresh', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
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
