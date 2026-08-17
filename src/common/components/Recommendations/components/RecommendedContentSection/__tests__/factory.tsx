import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';

const RelatedContent = () => null;
/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const windowStateSelector = (state) => state;
/* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
const ensureTeaserInterface = (node) => node;
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getGridConfig = (props) => props;
const windowState = { viewport: { label: 'viewport/xs' } };

/* @ts-ignore TODO: TS7006 ->  Parameter 'fn' implicitly has an 'any' type. */
let Component = (fn) => fn;
let initialState = {};

const componentFactoryOptions = {
  RelatedContent,
  windowStateSelector,
  ensureTeaserInterface,
  hasTitleContainer: true,
  getGridConfig,
  gridLayout: 'layout',
  publication: 'BEO',
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  componentFactoryOptions.windowStateSelector = () =>
    windowStateSelector(windowState);

  initialState = {
    window: {
      height: 886,
      scrollTop: 0,
      viewport: {
        label: 'viewport/xl',
        from: 960,
        to: 1599,
      },
      imageBreakpoint: {
        label: '450',
      },
      width: 1038,
    },
    route: {
      screenReady: true,
      isInitialPage: true,
      locationBeforeTransitions: {
        pathname: '/',
      },
    },
  };
});

describe('[Component] RecommendedContentSection Factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render nothing without data', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render nothing on SSR', () => {
    // @ts-ignore
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    // @ts-ignore
    expect(container.innerHTML).toBe('');
  });
});
