import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import Component from '..';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

let initialProps;
let initialState;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'mockedData' implicitly has an 'any' type. */
const mockedComponent = (mockedData, loading = false) => {
  initialState = {
    route: {
      ...routeInitialState,
      locationBeforeTransitions: {
        ...routeInitialState.locationBeforeTransitions,
        pathname: `/`,
      },
    },
    loading: loading,
  };

  initialProps = {
    landingPage: mockedData,
    location: {
      pathname: '/',
    },
  };

  return (
    <ReduxProvider state={initialState}>
      <SSRContextProvider>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </IntlProvider>
      </SSRContextProvider>
    </ReduxProvider>
  );
};

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.gaultmillau.ch';

  initialProps = {
    authors: JSON.parse(JSON.stringify(mockData)),
    locationState: routeInitialState,
  };
});

describe('[Screen] LandingPage', () => {
  test('[SGE] should log JSON-LD schema on the LandingPage page', async () => {
    render(mockedComponent({}));

    await waitFor(() => {
      const scriptTag = document.head.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(scriptTag).not.toBeNull();
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const schemaData = JSON.parse(scriptTag.innerHTML);
      const schemaGraph = schemaData['@graph'];

      const expOrganization = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        '@id': `${global.locationOrigin}/#/schema/Organization/2`,
        url: 'https://www.ringier.com/',
        name: 'Ringier',
        legalName: 'Ringier AG',
        alternateName: 'ringier.com',
        description:
          'Ringier is a family-owned media group with brands in Europe and Africa that focus on media, e-commerce, marketplaces and entertainment.',
        email: 'info@ringier.ch',
        telephone: '+41442596111',
      };

      // Check for Organization that matches expected expOrganization
      const organization = schemaGraph.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        (item) => item['@type'] === 'Organization' && item.name === 'Ringier',
      );
      expect(organization).toBeDefined();
      expect(organization).toMatchObject(expOrganization);

      const expNewsMediaOrganization = {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        '@id': 'https://www.gaultmillau.ch/#/schema/Organization/1',
        url: 'https://www.gaultmillau.ch',
        name: 'Gault Millau',
        legalName: 'Ringier AG | Ringier Medien Schweiz',
      };

      // Check for NewsMediaOrganization that matches expected expNewsMediaOrganization
      const newsMediaOrganization = schemaGraph.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        (item) =>
          item['@type'] === 'NewsMediaOrganization' &&
          item.name === 'Gault Millau',
      );
      expect(newsMediaOrganization).toBeDefined();
      expect(newsMediaOrganization).toMatchObject(expNewsMediaOrganization);
    });
  });
});
