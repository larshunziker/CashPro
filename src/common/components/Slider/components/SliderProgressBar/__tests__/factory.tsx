import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import componentFactory from '../factory';

let Component: any = () => null;

const componentFactoryOptions = {
  styles: {
    Wrapper: 'Wrapper',
    ProgressBar: 'ProgressBar',
  },
};

let initialState = {};

const initialLocationState = {
  locationBeforeTransitions: {
    pathname: '/',
    search: '',
    hash: '',
    action: 'POP',
    key: null,
    query: {},
  },
  screenReady: false,
  isReferrerFullscreen: false,
  isInitialPage: true,
};

beforeEach(() => {
  // @ts-ignore
  Component = componentFactory(componentFactoryOptions);

  initialState = {
    route: initialLocationState,
  };
});

describe('[Common] SliderProgressBar', () => {
  test('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  test('Should render slide label', () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId, queryAllByTestId } = render(
      <Provider store={store}>
        <Component activeIndex={0} slideInterval={5000} />,
      </Provider>,
    );

    expect(queryAllByTestId('slider-progress-factory-wrapper')).toHaveLength(1);
    // @ts-ignore
    expect(queryByTestId('slider-progress-factory-wrapper')).toHaveClass(
      componentFactoryOptions.styles.Wrapper,
    );
    // @ts-ignore
    expect(queryByTestId('slider-progress-factory-progress-bar')).toHaveClass(
      componentFactoryOptions.styles.ProgressBar,
    );
  });
});
