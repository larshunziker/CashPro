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

describe('[Component] Article Lead LegalAdvice', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render subtypeValue fallback if no shortTitle given', () => {
    // @ts-ignore
    initialProps.article.shortTitle = '';
    const { container } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render no shortTitle if shortTitle and subtypeValue are not set', () => {
    // @ts-ignore
    initialProps.article.shortTitle = '';
    // @ts-ignore
    initialProps.article.subtypeValue = '';
    const { container } = render(
      <ReduxProvider>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
