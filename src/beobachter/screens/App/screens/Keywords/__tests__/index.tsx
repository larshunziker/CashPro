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
import { ROUTE_KEYWORDS } from '../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App */
import { GET_KEYWORDS } from '../queries';

let initialProps = {};
let initialState = {};

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
  global.locationOrigin = 'https://www.beobachter.ch';
});
afterEach(cleanup);

const mockedComponent = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
  customMockData,
  q = GET_KEYWORDS,
  customInitialProps = initialProps,
  customInitialState = initialState,
) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: q,
          // @ts-ignore
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
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    // @ts-ignore
    initialProps.data.keywordsByChar = 'A';
    const { queryByTestId } = render(
      mockedComponent(
        mockData,
        GET_KEYWORDS,
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

  it('Should render hint if there is no data', async () => {
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;
    const { queryByTestId } = render(
      mockedComponent({}, GET_KEYWORDS, customInitialProps, customInitialstate),
    );
    await waitFor(() => {
      expect(queryByTestId('keywords-noresult-wrapper')).not.toBeNull();
      expect(queryByTestId('keywords-keywordlist-wrapper')).toBeNull();
      expect(queryByTestId('keywords-wrapper')).not.toBeNull();
      expect(queryByTestId('keywords-noresult-wrapper')).toMatchSnapshot();
    });
  });

  it('Should render corrently if there are no keyword entities', async () => {
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    const myMockData = JSON.parse(JSON.stringify(mockData));
    myMockData.data.environment.keywordsByChar = null;
    const customInitialstate = JSON.parse(JSON.stringify(initialState));
    customInitialstate.route.loading = false;

    const { queryByTestId } = render(
      mockedComponent(
        myMockData,
        GET_KEYWORDS,
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
    const customInitialProps = JSON.parse(JSON.stringify(initialProps));
    customInitialProps.params.searchString = null;
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
    initialState = {
      route: {
        ...routeInitialState,
        locationBeforeTransitions: {
          ...routeInitialState.locationBeforeTransitions,
          pathname: ROUTE_KEYWORDS,
        },
      },
    };

    render(mockedComponent({}));

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.beobachter.ch/stichworte',
      '@type': 'WebPage',
      breadcrumb: {
        '@id': 'https://www.beobachter.ch/#/schema/BreadcrumbList/stichworte',
        '@type': 'BreadcrumbList',
      },
      isPartOf: {
        '@id': 'https://www.beobachter.ch/#/schema/WebSite/1',
        '@type': 'WebSite',
      },
      name: 'Beobachter',
      url: 'https://www.beobachter.ch/stichworte',
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
