import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
// @ts-ignore
import data from './mockData.json';

let mockData = { data: {}, loading: true };

jest.mock('../../../../../../common/components/Link');
jest.mock('../../Icon');

jest.mock('@apollo/client', () => {
  return {
    __esModule: true,
    useQuery: jest.fn(() => ({ ...mockData })),
  };
});

let initialProps: any = {};
let initialState: any = {};

beforeEach(() => {
  initialProps = {
    instrumentKeys: undefined,
    fallbackNames: {
      '274702-176-333': 'Fallback name for inactive instrument',
    },
  };

  initialState = {};
});

describe('[Component] MarketTable', () => {
  it('Should render MarketTable with skeletons and fallback set of listingKeys. And with data, if loading is done', async () => {
    // @ts-ignore
    const { container, rerender } = render(
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          <Component {...initialProps}></Component>
        </MockedProvider>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();

    mockData = {
      loading: false,
      data: data,
    };

    rerender(
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          <Component {...initialProps}></Component>
        </MockedProvider>
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
