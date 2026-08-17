/**
 *
 */

import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

let initialProps = {};

beforeEach(() => {
  initialProps = {
    article: mockData.article,
  };
});
afterEach(cleanup);

describe('[Component] Article Lead Ratgeber', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const page = queryByTestId('article-lead-ratgeber-wrapper');
    const shortTitle = queryByTestId(
      'article-lead-ratgeber-short-title-wrapper',
    );

    expect(page).not.toBeNull();
    expect(shortTitle).not.toBeNull();
    // @ts-ignore
    expect(shortTitle.innerHTML).toBe(initialProps.article.shortTitle);
  });

  it('Should render channel title if no short title given', () => {
    // @ts-ignore
    initialProps.article.shortTitle = '';
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const page = queryByTestId('article-lead-ratgeber-wrapper');
    const shortTitle = queryByTestId(
      'article-lead-ratgeber-short-title-wrapper',
    );

    expect(page).not.toBeNull();
    expect(shortTitle).not.toBeNull();
    // @ts-ignore
    expect(shortTitle.innerHTML).toBe(initialProps.article.channel.title);
  });

  it('Should render no shortTitle if shortTitle and channel title are not set', () => {
    // @ts-ignore
    initialProps.article.shortTitle = '';
    // @ts-ignore
    initialProps.article.channel.title = '';
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const page = queryByTestId('article-lead-ratgeber-wrapper');
    const shortTitle = queryByTestId(
      'article-lead-ratgeber-short-title-wrapper',
    );

    expect(page).not.toBeNull();
    expect(shortTitle).toBeNull();
  });
});
