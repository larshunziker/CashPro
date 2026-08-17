import React from 'react';
import { IntlProvider } from 'react-intl';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { AUTOCOMPLETE_ITEMS } from '../../../shared/logic';
import MockedProvider from '../../../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
} from '../../../../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './../queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/ */
import { GET_RESTAURANT_AUTOCOMPLETE_RESULTS } from './../queries';

// Added this to avoid the "Missing Translation" error being logged
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

jest.mock('Link');
jest.mock('Icon');
jest.mock('Search/components/SearchIcon');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialState = {
    settings: { language: 'de' },
  };
  initialProps = {
    searchQuery: 'Grand',
    initialQuery: 'Grand',
    isAutocompleteVisible: true,
    isInitialQueryValid: true,
    debouncedSearchQuery: 'Grand',
  };
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const mockTermOccurrences = (customMockData, props) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: GET_RESTAURANT_AUTOCOMPLETE_RESULTS,
          variables: {
            query:
              /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
              initialProps.debouncedSearchQuery &&
              /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
              `${initialProps.debouncedSearchQuery}*`,
            pageSize: AUTOCOMPLETE_ITEMS,
            /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
            language: initialState.settings.language || '',
            publication:
              /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
              initialState.settings.language === 'fr'
                ? PUBLICATION_ID_FR
                : PUBLICATION_ID_DE,
          },
        },
        result: customMockData,
      },
    ]}
  >
    {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
    <ReduxProvider state={initialState}>
      <IntlProvider locale="de-CH">
        <Component {...props} />
      </IntlProvider>
    </ReduxProvider>
  </MockedProvider>
);

describe('[Component] RestaurantSearchForm', () => {
  it('Should render correctly if all dependencies are given', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockTermOccurrences({}, initialProps));

    await waitFor(() => {
      expect(queryByTestId('restaurant-search-form-wrapper')).not.toBeNull();
    });
  });

  // TODO: adjust this test to work without graphql hoc
  // it('Should render correctly with autocomplete results', async () => {
  //   initialProps.data = JSON.parse(JSON.stringify(mockData)).data;
  //   const { queryByTestId, queryAllByTestId } = render(
  //     mockTermOccurrences(JSON.parse(JSON.stringify(mockData)), initialProps),
  //   );
  //
  //   await waitFor(() => {
  //     expect(queryByTestId('restaurant-search-form-wrapper')).not.toBeNull();
  //     const searchField = queryByTestId('restaurant-search-form-input-field');
  //     fireEvent.change(searchField, { target: { value: 'Gran' } });
  //
  //     expect(
  //       queryAllByTestId('restaurant-search-form-autocomplete-city').length,
  //     ).toBe(2);
  //     expect(
  //       queryAllByTestId('restaurant-search-form-autocomplete-organization')
  //         .length,
  //     ).toBe(1);
  //   });
  // });

  it('Should handle submit correctly', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.data = JSON.parse(JSON.stringify(mockData)).data;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      mockTermOccurrences(JSON.parse(JSON.stringify(mockData)), initialProps),
    );

    await waitFor(() => {
      expect(queryByTestId('restaurant-search-form-wrapper')).not.toBeNull();
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.submit(queryByTestId('restaurant-search-form-wrapper'));
    });
  });
});
