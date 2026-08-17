/**
 * @file   keyword articles list screen tests
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-05-13
 *
 */

import React from 'react';
import { cleanup } from '@testing-library/react';
import Component, { KeywordArticlesListPropsInner } from '../index';
import { render } from '../../../../../../../shared/customRenderer';
import MockedProvider from '../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';

let initialProps: Partial<KeywordArticlesListPropsInner> = {};

beforeEach(() => {
  initialProps = {
    keywordPage: JSON.parse(JSON.stringify(mockData)),
    location: {
      hash: '',
      pathname: '/finanzlexikon/list',
      query: {},
      search: '',
    },
  };
});
afterEach(cleanup);

describe('[Screen] Keyword Articles List', () => {
  it('Should render not found if no data given', () => {
    const { queryByTestId } = render(
      <MockedProvider>
        <Component />
      </MockedProvider>,
    );

    expect(queryByTestId('keywordarticlelist-not-found')).not.toBeNull();
    expect(queryByTestId('keywordarticlelist-searchresult-wrapper')).toBeNull();
  });

  it('Should render not found if empty array of data given', () => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    initialProps.keywordPage.entities = {};
    const { queryByTestId } = render(
      <MockedProvider>
        <Component {...initialProps} />
      </MockedProvider>,
    );
    expect(queryByTestId('keywordarticlelist-not-found')).not.toBeNull();
    expect(queryByTestId('keywordarticlelist-searchresult-wrapper')).toBeNull();
  });

  it('Should render correctly if data given', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('keywordarticlelist-not-found')).toBeNull();
    expect(
      queryByTestId('keywordarticlelist-searchresult-wrapper'),
    ).not.toBeNull();
  });

  it('Should render correctly if not all data given', () => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    delete initialProps.keywordPage.label;
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    delete initialProps.keywordPage.entities.count;
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    delete initialProps.location.pathname;
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('keywordarticlelist-not-found')).toBeNull();
    expect(
      queryByTestId('keywordarticlelist-searchresult-wrapper'),
    ).not.toBeNull();
  });
});
