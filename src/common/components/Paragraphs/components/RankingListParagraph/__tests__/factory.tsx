import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import componentFactory from '../factory';
import mockOptions from './mockData.json';
import { RankingListParagraphFactoryOptions } from '../typings';

const styles = {
  Wrapper: '.Wrapper',
};
// @ts-ignores
let componentFactoryOptions: RankingListParagraphFactoryOptions = {};
const initialState = {
  window: {
    height: 886,
    scrollTop: 0,
    viewport: {
      label: 'viewport/xl',
      from: 960,
      to: 1599,
    },
    width: 1038,
  },
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  componentFactoryOptions = {
    ensureTeaserInterface: () => null,
    /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type 'GridConfig | ((props */
    gridConfig: () => null,
    windowStateSelector: (state) => state.window,
    TeaserGrid: () => (
      <div data-testid="entity-queue-paragraph-factory-teasergrid" />
    ),
    styles: styles,
  };
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockOptions));
});

describe('[Common] Paragraphs - Ranking List Paragraph Factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render nothing', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component rankingList={{}} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing when no rankingList given', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing when no ranking given', () => {
    const store = createStore((state) => state, initialState);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.rankingList.rankings = {};

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing when no ranking edges given', () => {
    const store = createStore((state) => state, initialState);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.rankingList.rankings = { edges: [] };

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
