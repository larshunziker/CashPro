/**
 * @file   Slider factory test
 * @author Damian Bucki <damian.bucki@dreamlab.pl>
 * @date   2018-07-11
 */

import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import componentFactory from '../factory';
import { SLIDE_ALIGNMENT_CENTER } from '../constants';

const componentFactoryOptions = {
  styles: {
    Wrapper: 'WrapperClassName',
  },
  SliderNavigation: null,
  SlideLabel: null,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'activeIndex' implicitly has an 'any' type. */
  SlideBuffer: ({ children, activeIndex }) =>
    /* @ts-ignore TODO: TS7006 ->  Parameter 'child' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
    children.map((child, index) => child({ key: index, activeIndex })),
};

const componentProps = {
  slideCount: 2,
  slideDimensions: [
    {
      width: 364,
      height: 488,
    },
    {
      width: 732,
      height: 458,
    },
  ],
  sliderWidth: 732,
  preloadCount: 1,
  fadeInactive: true,
  sliderHeight: '488px',
  dynamicWidthSlides: true,
  labels: [],
  // eslint-disable-next-line
  onPositionUpdate: () => {},
  opacityInactive: 0,
  loop: false,
  children: [
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    (props) => (
      <div
        key={props.key}
        data-testid="slide0"
        data-is-active={props.activeIndex === props.key}
      >
        slide0
      </div>
    ),
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    (props) => (
      <div
        key={props.key}
        data-testid="slide1"
        data-is-active={props.activeIndex === props.key}
      >
        slide1
      </div>
    ),
  ],
  slideAlignment: SLIDE_ALIGNMENT_CENTER,
  addClass: '',
  labelClass: '',
  alignArrowsOnTop: false,
  syncParentHeight: false,
  autoPlay: false,
  initialIndex: 0,
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
  /* @ts-ignore TODO: TS2345 ->  Argument of type '{ styles */
  Component = componentFactory(componentFactoryOptions);
  initialState = {
    route: routeInitialState,
  };
});

describe('[Common] Slider', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should not render slider if no slideDimensions are available', () => {
    const props = { ...componentProps };
    props.slideDimensions = [];

    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...props} />
      </Provider>,
    );

    expect(queryByTestId('slider-factory-wrapper')).toBeNull();
  });

  test('Should render slider', () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...componentProps} />
      </Provider>,
    );

    expect(queryByTestId('slider-factory-wrapper')).not.toBeNull();

    expect(queryByTestId('slide0')).not.toBeNull();
    expect(queryByTestId('slide1')).not.toBeNull();

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('slide0').dataset.isActive).toBe('true');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('slide1').dataset.isActive).toBe('false');
  });

  test('Should render slider with custom active slide', () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...componentProps} activeIndex={1} />,
      </Provider>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('slide0').dataset.isActive).toBe('false');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('slide1').dataset.isActive).toBe('true');
  });
});
