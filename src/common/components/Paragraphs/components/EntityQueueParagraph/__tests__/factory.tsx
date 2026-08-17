/**
 * @file   entity queue factory test
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-04-24
 */

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockOptions from './mockData.json';
import { EntityQueueParagraphFactoryOptions } from '../typings';

// @ts-ignore
let componentFactoryOptions: EntityQueueParagraphFactoryOptions = {};
const styles = {
  TitleWrapper: '.SampleTitleWrapperClass',
  InnerContainer: '.SampleInnerContainerClass',
  Title: '.SampleTitleClass',
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'fn' implicitly has an 'any' type. */
let Component = (fn) => fn;

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

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  // @ts-ignore
  componentFactoryOptions = {
    ensureTeaserInterface: () => null,
    TeaserGrid: () => (
      <div data-testid="entity-queue-paragraph-factory-teasergrid" />
    ),
    styles: styles,
  };
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockOptions));
});

describe('[Common] Paragraphs - Entity Queue factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render nothing', () => {
    const store = createStore((state) => state, initialState);
    // @ts-ignore
    componentFactoryOptions.entityQueue = {};
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render no header by default', () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(queryByTestId('entity-queue-paragraph-factory-header')).toBeNull();
  });

  it('Should render a title', () => {
    const store = createStore((state) => state, initialState);
    // @ts-ignore
    initialProps.entityQueue.landingPage = null;
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render a title with a link', () => {
    const store = createStore((state) => state, initialState);
    // @ts-ignore
    initialProps.entityQueue.landingPage.preferredUri = 'lovelyLandingPage';
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </Provider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should also render title if landing page is linked', () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    const elem = queryByTestId('entity-queue-paragraph-title');
    expect(elem).not.toBeNull();
  });
});
