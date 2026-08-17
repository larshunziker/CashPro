import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    article: mockData,
  };
  initialState = {
    window: windowInitialState,
  };
});
afterEach(cleanup);

describe('[Component] Article Head Ratgeber', () => {
  it('Should render article head correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('article-head-ratgeber-wrapper')).not.toBeNull();
    expect(queryByTestId('article-head-ratgeber-sponsor')).not.toBeNull();
    expect(queryByTestId('article-head-ratgeber-hero')).not.toBeNull();
  });

  it('Should not render sponsor section if no sponsor available', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.channel.landingPage.sponsor = {};
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('article-head-ratgeber-wrapper')).not.toBeNull();
    expect(queryByTestId('article-head-ratgeber-sponsor')).toBeNull();
  });

  it('Should not render article hero if there is no heroImageBody', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.article.heroImageBody;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('article-head-ratgeber-wrapper')).not.toBeNull();
    expect(queryByTestId('article-head-ratgeber-hero')).toBeNull();
  });
});
