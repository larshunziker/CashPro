/**
 * @file   Keywords Screen tests
 * @date   2019-05-13
 */

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
import { GET_KEYWORD_LISTING } from '../queries';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialState = {
    route: routeInitialState,
  };
  initialProps = {
    params: {
      searchString: 'A',
    },
    data: {},
  };

  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.handelszeitung.ch';
});
afterEach(cleanup);

const mockedComponent = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
  customMockData,
  q = GET_KEYWORD_LISTING,
  /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
  customInitialProps = initialProps,
  /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
  customInitialState = initialState,
) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: q,
          variables: apolloConfig?.options({ ...customInitialProps }).variables,
        },
        result: customMockData,
      },
    ]}
  >
    <ReduxProvider initialState={customInitialState}>
      <HelmetProvider>
        <Component {...customInitialProps} data={customMockData?.data} />
      </HelmetProvider>
    </ReduxProvider>
  </MockedProvider>
);

describe('[Screen] Keywords', () => {
  it('Should render correctly', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    const { queryByTestId } = render(
      mockedComponent(
        mockData,
        GET_KEYWORD_LISTING,
        customInitialProps,
        customInitialstate,
      ),
    );

    await waitFor(() => {
      expect(queryByTestId('keywords-noresult-wrapper')).toBeNull();
      expect(queryByTestId('keywords-keywordlist-wrapper')).not.toBeNull();
      expect(queryByTestId('keywords-wrapper')).not.toBeNull();
    });
  });

  it('Should render a hint if there is no data', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    const { queryByTestId } = render(
      mockedComponent(
        {},
        GET_KEYWORD_LISTING,
        customInitialProps,
        customInitialstate,
      ),
    );

    await waitFor(() => {
      expect(queryByTestId('keywords-noresult-wrapper')).not.toBeNull();
      expect(queryByTestId('keywords-keywordlist-wrapper')).toBeNull();
      expect(queryByTestId('keywords-wrapper')).not.toBeNull();
    });
  });

  it('Should render corrently if there are no keyword entities', async () => {
    const myMockData = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    myMockData.data.environment.keywordsByChar = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;

    const { queryByTestId } = render(
      mockedComponent(
        myMockData,
        GET_KEYWORD_LISTING,
        customInitialProps,
        customInitialstate,
      ),
    );
    await waitFor(() => {
      expect(queryByTestId('keywords-noresult-wrapper')).not.toBeNull();
      expect(queryByTestId('keywords-keywordlist-wrapper')).toBeNull();
      expect(queryByTestId('keywords-wrapper')).not.toBeNull();
    });
  });

  it('Should render nothing if there is no searchstring', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.searchString = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    customInitialProps.params.searchString = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    const { queryByTestId } = render(
      mockedComponent(
        {},
        WILDCARD_QUERY,
        customInitialProps,
        customInitialstate,
      ),
    );

    await waitFor(() => {
      expect(queryByTestId('keywords-noresult-wrapper')).not.toBeNull();
    });
  });

  it('should render webpage schema on the keywords page', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    render(
      mockedComponent(
        mockData,
        GET_KEYWORD_LISTING,
        customInitialProps,
        customInitialstate,
      ),
    );
    const webPageSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.handelszeitung.ch/stichworte',
      '@type': 'WebPage',
      breadcrumb: {
        '@id':
          'https://www.handelszeitung.ch/#/schema/BreadcrumbList/stichworte',
        '@type': 'BreadcrumbList',
      },
      isPartOf: {
        '@id': 'https://www.handelszeitung.ch/#/schema/WebSite/1',
        '@type': 'WebSite',
      },
      name: 'Handelszeitung',
      url: 'https://www.handelszeitung.ch/stichworte',
    };

    await waitFor(() => {
      const scriptTag = document.head.querySelector(
        'script[type="application/ld+json"]',
      );

      expect(scriptTag).not.toBeNull();
      expect(scriptTag).toBeInTheDocument();

      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const schemaData = JSON.parse(scriptTag.innerHTML);
      expect(schemaData['@graph']).toEqual(
        expect.arrayContaining([expect.objectContaining(webPageSchema)]),
      );
    });
  });
});
