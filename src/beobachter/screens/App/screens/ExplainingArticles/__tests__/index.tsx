import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component, { renderEntriesList } from '../index';
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import { apolloConfig } from '../apolloConfig';
import mockData from './mockData.json';
import { EXPLAINING_TYPE_LEGAL_DICTIONARY } from '../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App */
import { GET_EXPLAINING_PAGE } from '../queries';

let initialProps = {};
let initialState = {};

beforeEach(() => {
  initialState = {
    route: routeInitialState,
  };

  initialProps = {
    data: mockData.data,
    params: {
      char: 'A',
      category: 'symptom',
      publication: 'BEO',
    },
  };
});
afterEach(cleanup);

/* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
const mockedComponent = (customMockData) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: GET_EXPLAINING_PAGE,
          // @ts-ignore
          variables: apolloConfig.options(initialProps).variables,
        },
        result: customMockData,
      },
    ]}
  >
    <ReduxProvider state={initialState}>
      <HelmetProvider>
        <Component {...initialProps} />
      </HelmetProvider>
    </ReduxProvider>
  </MockedProvider>
);

it('Should render correctly', async () => {
  const customMockData = { ...mockData.data };
  const { queryByTestId } = render(mockedComponent(customMockData));

  await waitFor(() => {
    expect(queryByTestId('onmeda-wrapper')).not.toBeNull();
    expect(queryByTestId('onmeda-entrieslist-wrapper')).not.toBeNull();
  });
});

it('Should render legal dictionary correctly', async () => {
  const customMockData = { ...mockData };
  // @ts-ignore
  initialProps.category = EXPLAINING_TYPE_LEGAL_DICTIONARY;
  const { queryByTestId } = render(mockedComponent(customMockData));

  await waitFor(() => {
    expect(queryByTestId('onmeda-wrapper')).not.toBeNull();
    expect(queryByTestId('onmeda-entrieslist-wrapper')).not.toBeNull();
  });
});

it('Should render entrieslist', () => {
  const customMockData = { ...mockData };
  const { queryByTestId } = render(
    <MemoryRouter>
      {renderEntriesList(customMockData.data.environment, null)}
    </MemoryRouter>,
  );
  expect(queryByTestId('onmeda-entrieslist-wrapper')).not.toBeNull();
});

it('Should render information when no articles are available for a certain letter', () => {
  expect(renderEntriesList({}, null)).toMatchSnapshot();
});
