import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import Component from '..';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';

let initialProps;
let initialState;

/* @ts-ignore TODO: TS7006 ->  Parameter 'mockedData' implicitly has an 'any' type. */
const mockedComponent = (mockedData, loading = false) => {
  initialState = {
    route: {
      ...routeInitialState,
      locationBeforeTransitions: {
        ...routeInitialState.locationBeforeTransitions,
        pathname: '/suche/*',
      },
    },
    loading: loading,
  };

  initialProps = {
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
      <HelmetProvider>
        <Component {...initialProps} />
      </HelmetProvider>
    </ReduxProvider>
  );
};

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.handelszeitung.ch';
});

describe('[Screen] Search', () => {
  test('should render webpage schema on the search page', async () => {
    render(mockedComponent({}));

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.handelszeitung.ch',
      '@type': 'WebPage',
      breadcrumb: {
        '@id': 'https://www.handelszeitung.ch/#/schema/BreadcrumbList',
        '@type': 'BreadcrumbList',
      },
      isPartOf: {
        '@id': 'https://www.handelszeitung.ch/#/schema/WebSite/1',
        '@type': 'WebSite',
      },
      name: 'Handelszeitung',
      url: 'https://www.handelszeitung.ch',
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
