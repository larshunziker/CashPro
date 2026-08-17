import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import Component from '..';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import { ROUTE_LEGAL_DICTIONARY } from '../../../constants';

let initialProps;
let initialState;

/* @ts-ignore TODO: TS7006 ->  Parameter 'mockedData' implicitly has an 'any' type. */
const mockedComponent = (mockedData, loading = false) => {
  initialState = {
    route: {
      ...routeInitialState,
      locationBeforeTransitions: {
        ...routeInitialState.locationBeforeTransitions,
        pathname: ROUTE_LEGAL_DICTIONARY,
      },
    },
    loading: loading,
  };

  initialProps = {
    data: mockedData.data,
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
  global.locationOrigin = 'https://www.beobachter.ch';
});

test('should render correct schema markup for the legal dictionary page', async () => {
  render(mockedComponent({}));

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
    url: global.locationOrigin,
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
