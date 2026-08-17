import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../../Search';
import mockData from './mockData.json';

let initialProps;
let initialState;

jest.mock('Link');
jest.mock('../../../components/Pager');
jest.mock('../../../components/TeaserGrid');
jest.mock('../../../components/Helmet');
jest.mock('../../../components/SearchForm/themes/SearchFormResultPage');

jest.mock('react-router-dom', () => {
  return {
    useNavigationType: jest.fn(() => 'PUSH'),
    useInRouterContext: jest.fn(() => true),
    useMatch: jest.fn(() => true),
    useParams: jest.fn(() => ({
      query: 'test',
    })),
    useNavigate: jest.fn(() => jest.fn()),
    useLocation: jest.fn(() => {
      return {
        pathname: '/suche/*',
        search: '',
      };
    }),
  };
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'mockedData' implicitly has an 'any' type. */
const mockedComponent = (mockedData, loading = false) => {
  initialState = {
    route: routeInitialState,
  };
  initialState.route.loading = loading;

  initialProps = {
    loading: loading,
    data: mockedData.data,
    page: 1,
    params: {
      query: '*',
    },
    location: {
      query: {
        page: 1,
      },
      pathname: '/suche/*',
      search: '',
    },
  };
  return (
    <ReduxProvider state={initialState}>
      <SSRContextProvider>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </SSRContextProvider>
    </ReduxProvider>
  );
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

describe('[Screen] Search', () => {
  test('Should render search screen with loading info', () => {
    const mockDataCopy = JSON.parse(JSON.stringify(mockData));
    mockDataCopy.data.globalSearch = null;
    const { queryByTestId } = render(mockedComponent(mockDataCopy, true));
    expect(queryByTestId('search-container')).not.toBeNull();
    expect(queryByTestId('search-loading-container')).not.toBeNull();
    expect(queryByTestId('search-results-containter')).toBeNull();
    expect(queryByTestId('search-no-results-container')).toBeNull();
  });

  test('Should render search screen with no results info', async () => {
    const { queryByTestId } = render(
      mockedComponent({ data: { globalSearch: { count: 0, edges: [] } } }),
    );

    await waitFor(() => {
      expect(queryByTestId('search-loading-container')).toBeNull();
      expect(queryByTestId('search-results-container')).toBeNull();
      expect(queryByTestId('search-no-results-container')).not.toBeNull();
    });
  });

  test('Should render search screen with results', async () => {
    const { queryByTestId } = render(mockedComponent(mockData));

    await waitFor(() => {
      expect(queryByTestId('search-loading-container')).toBeNull();
      expect(queryByTestId('search-results-container')).not.toBeNull();
      expect(queryByTestId('search-no-results-container')).toBeNull();
    });
  });
});
