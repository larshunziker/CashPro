import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { HERO_VIDEO } from '../../../../ArticleHero';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    article: mockData,
  };
});
afterEach(cleanup);

describe('[Component] Article Lead Default', () => {
  it('Should render article with heroImageBody correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('article-head-default-wrapper')).not.toBeNull();
    expect(queryByTestId('article-head-default-hero-wrapper')).not.toBeNull();
    expect(queryByTestId('article-head-default-guide-wrapper')).toBeNull();
  });

  it('Should render article with video heroImageBody correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.heroImageBody[0].__typename = HERO_VIDEO;
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('article-head-default-wrapper')).not.toBeNull();
    expect(queryByTestId('article-head-default-guide-wrapper')).not.toBeNull();
    expect(
      queryByTestId('article-head-default-guide-shorttitle'),
    ).not.toBeNull();
    expect(
      queryByTestId('article-head-default-guide-shorttitle'),
    ).toMatchSnapshot();
  });

  it('Should render channel title as backup shortTitle', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.heroImageBody[0].__typename = HERO_VIDEO;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.shortTitle = '';
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('article-head-default-guide-shorttitle'),
    ).toMatchSnapshot();
  });

  it('Should render no shortitle, if neither shortitle nor channeltitle are given', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.heroImageBody[0].__typename = HERO_VIDEO;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.shortTitle = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.article.channel.title = '';

    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('article-head-default-guide-shorttitle'),
    ).toMatchSnapshot();
  });
});
