import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { cleanup, render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import MockedProvider, {
  WILDCARD_QUERY,
} from '../../../../../../shared/tests/components/MockedProvider';
import { apolloConfig } from '../apolloConfig';
import mockData from './mockData.json';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens */
import { GET_ONMEDA_LISTING } from '../queries';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.handelszeitung.ch';

  initialState = {
    route: routeInitialState,
  };

  initialProps = {
    char: 'A',
    location: {
      action: 'POP',
      hash: '',
      key: null,
      pathname: '/finanzlexikon/list',
      query: {},
      search: '',
    },
  };
});
afterEach(cleanup);

const mockedComponent = (
  query = WILDCARD_QUERY,
  customMockData = {},
  /* @ts-ignore TODO: TS7006 ->  Parameter 'initialProps' implicitly has an 'any' type. */
  initialProps,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'initialState' implicitly has an 'any' type. */
  initialState,
) => {
  return (
    <MockedProvider
      mocks={[
        {
          request: {
            ...apolloConfig.options({
              location: {},
              params: { char: initialProps.char },
            }),
            query: query,
          },
          result: customMockData,
        },
      ]}
    >
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          <Component
            {...initialProps}
            data={
              // @ts-ignore
              customMockData?.data
            }
          />
        </HelmetProvider>
      </ReduxProvider>
    </MockedProvider>
  );
};

describe('[Screen] Finance Dictionary', () => {
  it('Should render correctly if data is given', () => {
    const customMockData = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    const { queryByTestId } = render(
      mockedComponent(
        GET_ONMEDA_LISTING,
        customMockData,
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
        JSON.parse(JSON.stringify(initialProps)),
        customInitialstate,
      ),
    );

    expect(
      queryByTestId('finance-dictionary-termsoverview-wrapper'),
    ).not.toBeNull();
    expect(queryByTestId('finance-dictionary-entry-wrapper')).not.toBeNull();
    expect(
      queryByTestId('finance-dictionary-entries-list-wrapper'),
    ).not.toBeNull();
    expect(queryByTestId('finance-dictionary-no-entry-wrapper')).toBeNull();
  });

  it('Should render correctly if no onmeda data is given', () => {
    const customMockData = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    customMockData.data.environment = {
      onmedaByChar: null,
      __typename: 'Environment',
    };

    const { queryByTestId } = render(
      mockedComponent(
        GET_ONMEDA_LISTING,
        customMockData,
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
        initialProps,
        customInitialstate,
      ),
    );

    expect(
      queryByTestId('finance-dictionary-termsoverview-wrapper'),
    ).not.toBeNull();
    expect(queryByTestId('finance-dictionary-entry-wrapper')).not.toBeNull();
    expect(queryByTestId('finance-dictionary-entries-list-wrapper')).toBeNull();
    expect(queryByTestId('finance-dictionary-no-entry-wrapper')).not.toBeNull();
  });

  it('Should render the status page if there is a wrong char', () => {
    // if an invalid char is provided, we render the status page witch also renders
    // the home

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.char = 'AB';

    const { queryByTestId } = render(
      mockedComponent(
        WILDCARD_QUERY,
        {},
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
        initialProps,
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
        JSON.parse(JSON.stringify(initialState)),
      ),
    );

    expect(queryByTestId('finance-dictionary-no-entry-wrapper')).toBeNull();
    expect(queryByTestId('status-page-title-wrapper')).not.toBeNull();
    expect(
      queryByTestId('finance-dictionary-termsoverview-wrapper'),
    ).toBeNull();
  });

  it('should render website schema markup for the dictionary page', async () => {
    const customMockData = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    render(
      mockedComponent(
        GET_ONMEDA_LISTING,
        customMockData,
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
        JSON.parse(JSON.stringify(initialProps)),
        customInitialstate,
      ),
    );

    const webSiteSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.handelszeitung.ch/#/schema/WebSite/1',
      '@type': 'WebSite',
      alternateName: 'Ringier AG | Ringier Medien Schweiz',
      name: 'Handelszeitung',
      publisher: {
        '@id': 'https://www.handelszeitung.ch/#/schema/Organization/1',
      },
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: `${global.locationOrigin}/finanzlexikon`,
    };

    await waitFor(() => {
      const scriptTag = document.head.querySelector(
        'script[type="application/ld+json"]',
      );

      expect(scriptTag).not.toBeNull();
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const schemaData = JSON.parse(scriptTag.innerHTML);
      expect(schemaData).toEqual(webSiteSchema);
    });
  });
});
