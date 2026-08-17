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

describe('[Component] Article Lead Default', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const channelTitle = queryByTestId(
      'articleleaddefault-channeltitle-wrapper',
    );
    // @ts-ignore
    const shortTitle = queryByTestId('articleleaddefault-shorttitle-wrapper');

    expect(shortTitle).not.toBeNull();
    expect(shortTitle).toMatchSnapshot();
    expect(channelTitle).toBeNull();
  });

  it('Should render channel title if no short title given', () => {
    // @ts-ignore
    initialProps.article.shortTitle = '';
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const channelTitle = queryByTestId(
      'articleleaddefault-channeltitle-wrapper',
    );
    const shortTitle = queryByTestId('articleleaddefault-shorttitle-wrapper');

    expect(channelTitle).not.toBeNull();
    expect(channelTitle).toMatchSnapshot();
    expect(shortTitle).toBeNull();
  });
});
