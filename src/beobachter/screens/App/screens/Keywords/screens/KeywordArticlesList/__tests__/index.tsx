/**
 *
 */

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { cleanup, render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import MockedProvider from '../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';

let initialProps = {};

beforeEach(() => {
  initialProps = {
    keywordPage: JSON.parse(JSON.stringify(mockData)),
  };
});
afterEach(cleanup);

describe('[Screen] Keyword Articles List', () => {
  it('Should render not found if no data given', () => {
    const { queryByTestId } = render(
      <MockedProvider>
        <ReduxProvider>
          <SSRContextProvider>
            <HelmetProvider>
              <Component />
            </HelmetProvider>
          </SSRContextProvider>
        </ReduxProvider>
      </MockedProvider>,
    );

    expect(queryByTestId('keywordarticlelist-not-found')).not.toBeNull();
    expect(queryByTestId('keywordarticlelist-wrapper')).toBeNull();
  });

  it('Should render not found if empty array of data given', () => {
    // @ts-ignore
    initialProps.keywordPage.entities = [];
    const { queryByTestId } = render(
      <MockedProvider>
        <ReduxProvider>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </ReduxProvider>
      </MockedProvider>,
    );
    expect(queryByTestId('keywordarticlelist-not-found')).not.toBeNull();
    expect(queryByTestId('keywordarticlelist-wrapper')).toBeNull();
  });

  it('Should render correctly if data given', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('keywordarticlelist-not-found')).toBeNull();
    expect(queryByTestId('keywordarticlelist-wrapper')).not.toBeNull();
    expect(
      queryByTestId('keywordarticlelist-searchresult-wrapper'),
    ).not.toBeNull();
  });

  it('Should render correctly if not all data given', () => {
    // @ts-ignore
    delete initialProps.keywordPage.label;
    // @ts-ignore
    delete initialProps.keywordPage.entities.count;
    const { queryByTestId } = render(
      <ReduxProvider>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('keywordarticlelist-not-found')).toBeNull();
    expect(queryByTestId('keywordarticlelist-wrapper')).not.toBeNull();
    expect(
      queryByTestId('keywordarticlelist-searchresult-wrapper'),
    ).not.toBeNull();
  });
});
