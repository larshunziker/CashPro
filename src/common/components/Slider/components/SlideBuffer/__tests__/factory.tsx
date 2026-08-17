import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import componentFactory from '../factory';

let activeIndex = 0;

const componentFactoryOptions = {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
  Slide: ({ index }) => (
    <div
      key={index}
      data-testid={`slide${index}`}
      data-is-active={activeIndex === index}
    >
      slide
      {index}
    </div>
  ),
};

const componentProps = {
  activeIndex,
  animate: true,
  fadeInactive: true,
  keyMappingList: [0, 1, 2, 3],
  opacityInactive: 0,
  positions: [-583, 0, 583],
  slideDimensions: [
    {
      width: 583,
      height: 388.6666666666667,
    },
    {
      width: 583,
      height: 388.6666666666667,
    },
    {
      width: 583,
      height: 388.6666666666667,
    },
    {
      width: 583,
      height: 388.6666666666667,
    },
  ],
  sliderHeight: '388.6666666666667px',
  syncParentHeight: false,
  viewport: [3, 0, 1],
  locationState: {
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
  },
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
let initialState = {};

const routeInitialState = {
  locationBeforeTransitions: {
    pathname: '/home',
    search: '',
    hash: '',
    action: 'PUSH',
    key: 'b86ozif',
    query: {},
  },
  screenReady: true,
  isReferrerFullscreen: false,
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialState = {
    route: routeInitialState,
  };
});

describe('[Common] SlideBuffer', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should render slide buffer', () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...componentProps} />
      </Provider>,
    );

    expect(queryByTestId('slider-buffer-factory-wrapper')).not.toBeNull();

    expect(queryByTestId('slide0')).not.toBeNull();
    expect(queryByTestId('slide1')).not.toBeNull();
  });

  test('Should render active slide with index 0', async () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...componentProps} />
      </Provider>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('slide0').dataset.isActive).toBe('true');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('slide1').dataset.isActive).toBe('false');
  });

  test('Should render active slide with index 1', async () => {
    componentProps.activeIndex = 1;
    activeIndex = 1;
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...componentProps} />
      </Provider>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('slide0').dataset.isActive).toBe('false');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('slide1').dataset.isActive).toBe('true');
  });
});
