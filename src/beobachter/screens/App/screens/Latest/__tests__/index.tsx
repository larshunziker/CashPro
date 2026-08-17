import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import { apolloConfig } from '../apolloConfig';
import mockData from './mockData.json';
import { ROUTE_LATEST } from '../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App */
import { LATEST_QUERY } from '../queries';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'mocks' implicitly has type 'any' in some locations where its type cannot be determined. */
let mocks;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

beforeEach(() => {
  initialState = {
    route: {
      ...routeInitialState,
      locationBeforeTransitions: {
        ...routeInitialState.locationBeforeTransitions,
        pathname: ROUTE_LATEST,
      },
    },
  };

  initialProps = {
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ page */
    page: 1,
    data: { ...mockData.data },
  };
  mocks = [
    {
      request: {
        query: LATEST_QUERY,
        variables: apolloConfig.options(initialProps).variables,
      },
      result: mockData,
    },
  ];

  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.beobachter.ch';
});

describe('[Screen] Latest', () => {
  test('Should render latest screen with search results', async () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'mocks' implicitly has an 'any' type. */
      <MockedProvider mocks={mocks}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider state={initialState}>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </ReduxProvider>
      </MockedProvider>,
    );

    await waitFor(() =>
      expect(queryByTestId('latest-container')).not.toBeNull(),
    );
    await waitFor(() =>
      expect(queryByTestId('search-results-container')).not.toBeNull(),
    );
  });

  test('should render correct schema markup for the Latest page', async () => {
    render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'mocks' implicitly has an 'any' type. */
      <MockedProvider mocks={mocks}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider state={initialState}>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </ReduxProvider>
      </MockedProvider>,
    );

    const webSiteSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.beobachter.ch/#/schema/WebSite/1',
      '@type': 'WebSite',
      alternateName: 'Ringier AG | Ringier Medien Schweiz',
      name: 'Beobachter',
      publisher: {
        '@id': 'https://www.beobachter.ch/#/schema/Organization/1',
      },
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: `${global.locationOrigin}/latest`,
    };

    await waitFor(() => {
      const scriptTag = document.head.querySelector(
        'script[type="application/ld+json"]',
      );

      expect(scriptTag).not.toBeNull();
      expect(scriptTag).toBeInTheDocument();

      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const schemaData = JSON.parse(scriptTag.innerHTML);
      expect(schemaData).toEqual(webSiteSchema);
    });
  });
});
