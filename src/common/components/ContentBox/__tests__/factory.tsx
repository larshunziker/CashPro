import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import componentFactory from '../factory';
import mockData from './mockData.json';
import SSRContextProvider from '../../SSRContext';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
let componentFactoryOptions;

const TeaserGrid = () => () => <div data-testid="mocked-teasergrid" />;

beforeEach(() => {
  componentFactoryOptions = {
    TeaserGridRenderer: TeaserGrid,
    getContentBoxRowGridOptions: () => null,
    teaserLayout: 'teaser-layout/text',
    Skeleton: () => <div data-testid="teaser-skeleton"></div>,
    publication: 'HZ',
    styles: {
      Wrapper: 'WrapperClassName',
      Title: 'TitleClassName',
    },
  };
  initialState = {
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
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
  /* @ts-ignore TODO: TS2345 ->  Argument of type '{ TeaserGridRenderer */
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] ContentBox Factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component />
        </SSRContextProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
