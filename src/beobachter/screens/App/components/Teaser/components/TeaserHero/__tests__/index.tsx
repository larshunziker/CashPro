import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import TeaserHero from '../index';
import mockData from '../../../../Teaser/__tests__/mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    node: mockData.node,
  };
  initialState = {};
});

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
  // 2021-12-20T15:21:27+01:00
  Date.now = jest.fn(() => 1640010087000);
});

afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line

  // @ts-ignore
  Date.now = new Date();
});

describe('[Component] Teaser - TeaserHero', () => {
  it('Should render TeaserHeroDefault', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.subtypeValue = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.__typename = 'Article';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <TeaserHero {...initialProps.node} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HeroBrandReport', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.subtypeValue = 'brandreport';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <TeaserHero {...initialProps.node} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HeroOpinion', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.subtypeValue = 'opinion';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <TeaserHero {...initialProps.node} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HeroAdvertorial', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.subtypeValue = 'external';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <TeaserHero {...initialProps.node} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HeroAdvertorial', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.__typename = 'native_article';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <TeaserHero {...initialProps.node} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HeroAdvertorial', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.subtypeValue = 'advertorial';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <TeaserHero {...initialProps.node} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HeroExplaining', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.__typename = 'ExplainingArticle';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <TeaserHero {...initialProps.node} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HeroGuide', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.subtypeValue = 'guide';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <TeaserHero {...initialProps.node} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
