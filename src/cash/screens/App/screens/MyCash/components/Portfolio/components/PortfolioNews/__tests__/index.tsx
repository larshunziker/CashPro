import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import Component from '../index';
// @ts-ignore
import data from './mockData.json';

const mockedSetSearchParams = jest.fn();
let mockData = {};

jest.mock(
  '../../../../../../../components/Teaser/components/TeaserPortfolioNews/components/TeaserPortfolioNewsSkeleton',
);
jest.mock('../../../../../../../components/TeaserGrid');

jest.mock('@apollo/client', () => {
  return {
    __esModule: true,
    useQuery: jest.fn(() => ({ ...mockData })),
  };
});

jest.mock('react-router', () => {
  return {
    useNavigationType: jest.fn(() => 'PUSH'),
    useInRouterContext: jest.fn(() => true),
    useMatch: jest.fn(() => true),
    useParams: jest.fn(() => ({
      query: 'test',
    })),
    useNavigate: jest.fn(() => jest.fn()),
    useSearchParams: () => [null, mockedSetSearchParams],
    useLocation: jest.fn(() => {
      return {
        pathname: '/suche/*',
        search: '',
      };
    }),
  };
});

let initialProps: any = {};

beforeEach(() => {
  initialProps = {
    valorList: [],
  };
});

describe('[Component] PortfolioNews', () => {
  it('Should render PortfolioNews with fallback message "Keine Nachrichten"', async () => {
    // @ts-ignore
    const { container } = render(
      <MockedProvider>
        <Component {...initialProps}></Component>
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();
  });
  it('Should render PortfolioNews with 16 items', async () => {
    initialProps.valorList = ['234-4-1'];
    mockData = {
      data: JSON.parse(JSON.stringify(data)),
      loading: true,
    };
    // @ts-ignore
    const { container, rerender } = render(
      <MockedProvider>
        <Component {...initialProps}></Component>
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();

    mockData = {
      data: JSON.parse(JSON.stringify(data)),
      loading: false,
    };
    rerender(
      <MockedProvider>
        <Component {...initialProps}></Component>
      </MockedProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render PortfolioNews with 4 items', async () => {
    initialProps.valorList = ['234-4-1'];
    data.environment.globalSearch.count = 4;
    mockData = {
      data: JSON.parse(JSON.stringify(data)),
      loading: true,
    };
    // @ts-ignore
    const { container } = render(
      <MockedProvider>
        <Component {...initialProps}></Component>
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();
  });
  it('Should render PortfolioNews error', async () => {
    initialProps.valorList = ['234-4-1'];
    data.environment.globalSearch.count = 4;
    mockData = {
      data: JSON.parse(JSON.stringify(data)),
      loading: true,
      error: 'could not fetch data',
    };
    // @ts-ignore
    const { container } = render(
      <MockedProvider>
        <Component {...initialProps}></Component>
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
