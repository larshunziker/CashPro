import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { apolloConfig } from '../apolloConfig';
import mockData from './mockData.json';
import { ROUTE_HOROSCOPE } from '../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte */
import { GET_HOROSCOPE_PAGE } from '../queries';

let initialProps = {};
let initialState = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'mocks' implicitly has type 'any' in some locations where its type cannot be determined. */
let mocks;

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.schweizer-illustrierte.ch';

  initialState = {
    route: routeInitialState,
  };

  initialProps = {
    data: mockData.data,
    location: {
      query: {
        path: `/${ROUTE_HOROSCOPE}`,
      },
    },
  };
  mocks = [
    {
      request: {
        query: GET_HOROSCOPE_PAGE,
        //@ts-ignore
        variables: apolloConfig.options().variables,
      },
      result: mockData,
      loading: false,
    },
  ];
});

describe('[Screen] Horoscope', () => {
  test('Should render horoscope screen with Breadcrumbs and Paragraphs', async () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    //@ts-ignore
    expect(queryByTestId('horoscope-container')).not.toBeNull() &&
      expect(queryByTestId('horoscope-breadcrumbs-container')).not.toBeNull() &&
      expect(queryByTestId('paragraphs-container')).not.toBeNull();
  });

  test('Should render horoscope screen without Breadcrumbs if preferredUri is empty', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mocks' implicitly has an 'any' type. */
    mocks[0].result.data.environment.routeByPath.object.preferredUri = null;

    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('horoscope-breadcrumbs-container')).toBeNull();
  });

  test('Should render horoscope screen without Breadcrumbs if activeMenuTrail is empty', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mocks' implicitly has an 'any' type. */
    mocks[0].result.data.environment.routeByPath.object.activeMenuTrail = null;

    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('horoscope-breadcrumbs-container')).toBeNull();
  });

  test('Should render horoscope screen without Paragraphs if body is empty', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mocks' implicitly has an 'any' type. */
    mocks[0].result.data.environment.routeByPath.object.body = null;

    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('paragraphs-container')).toBeNull();
  });

  test('should render webpage schema on the Horoscope page', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mocks' implicitly has an 'any' type. */
    mocks[0].result.data.environment.routeByPath.object.body = null;

    render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.schweizer-illustrierte.ch',
      '@type': 'WebPage',
      breadcrumb: {
        '@id': 'https://www.schweizer-illustrierte.ch/#/schema/BreadcrumbList',
        '@type': 'BreadcrumbList',
      },
      isPartOf: {
        '@id': 'https://www.schweizer-illustrierte.ch/#/schema/WebSite/1',
        '@type': 'WebSite',
      },
      name: 'Schweizer Illustrierte',
      url: 'https://www.schweizer-illustrierte.ch',
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
