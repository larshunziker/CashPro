import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component, { AutocompleteItems } from '../index';
import { AUTOCOMPLETE_ITEMS } from '../../../shared/logic';
import MockedProvider from '../../../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
} from '../../../../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './../queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/ */
import { GET_AUTOCOMPLETE_RESULTS } from './../queries';

jest.mock('Icon');
jest.mock('Link');
jest.mock('../../../../SearchIcon', () => {
  return () => {
    return <div />;
  };
});

// Added this to avoid the "Missing Translation" error being logged
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

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
    debouncedSearchQuery: 'Gra',
  };
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const mockTermOccurrences = (customMockData, props) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: GET_AUTOCOMPLETE_RESULTS,
          variables: {
            char:
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

describe('[Component] DefaultSearchForm', () => {
  it('Should render correctly if all dependencies are given', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockTermOccurrences({}, initialProps));

    await waitFor(() => {
      expect(queryByTestId('default-search-form-wrapper')).not.toBeNull();
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
  //     expect(queryByTestId('default-search-form-wrapper')).not.toBeNull();
  //     const searchField = queryByTestId('default-search-form-input-field');
  //     fireEvent.change(searchField, { target: { value: 'Gran' } });
  //
  //     expect(
  //       queryAllByTestId('default-search-form-autocomplete-item').length,
  //     ).toBe(2);
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
      expect(queryByTestId('default-search-form-wrapper')).not.toBeNull();
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.submit(queryByTestId('default-search-form-wrapper'));
    });
  });

  it('Should not render AutocompleteItems if item is null', async () => {
    const { queryByTestId } = render(
      <AutocompleteItems index={1} item={null} />,
    );
    expect(queryByTestId('default-search-form-autocomplete-item')).toBeNull();
  });

  it('Should not render AutocompleteItems if no title is given', async () => {
    const item = JSON.parse(JSON.stringify(mockData)).data.globalSearch
      .edges[0];
    delete item.node.title;

    const { queryByTestId } = render(
      <AutocompleteItems index={1} item={item} />,
    );
    expect(queryByTestId('default-search-form-autocomplete-item')).toBeNull();
  });

  it('Should not render AutocompleteItems if no preferedUri is given', async () => {
    const item = JSON.parse(JSON.stringify(mockData)).data.globalSearch
      .edges[0];
    delete item.node.preferredUri;

    const { queryByTestId } = render(
      <AutocompleteItems index={1} item={item} />,
    );
    expect(queryByTestId('default-search-form-autocomplete-item')).toBeNull();
  });

  it('Should render AutocompleteItems correctly if all fields are there', async () => {
    const item = JSON.parse(JSON.stringify(mockData)).data.globalSearch
      .edges[0];

    const { queryByTestId } = render(
      <MemoryRouter>
        <AutocompleteItems
          index={1}
          item={item}
          props={{ onBeforeNavigate: () => null }}
        />
      </MemoryRouter>,
    );
    expect(
      queryByTestId('default-search-form-autocomplete-item'),
    ).not.toBeNull();
  });
});
