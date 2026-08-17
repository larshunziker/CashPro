import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';
import { getHost } from '../../../../../../../tests-e2e/shared/constants';
import { ROUTE_AUTHORS } from '../../../constants';

describe('[SGE] LandingPage - Schema Tests', () => {
  let initialProps: any = {};
  let initialState = {};

  /* @ts-ignore TODO: TS7006 ->  Parameter 'mockedData' implicitly has an 'any' type. */
  const mockedComponent = (mockedData, loading = false) => {
    initialState = {
      route: {
        ...routeInitialState,
        locationBeforeTransitions: {
          ...routeInitialState.locationBeforeTransitions,
          pathname: ROUTE_AUTHORS,
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
    initialProps = {
      landingPage: JSON.parse(JSON.stringify(mockData)),
      locationState: routeInitialState,
      location: {
        pathname: `/${ROUTE_AUTHORS}`,
      },
    };
    initialState = {};
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = getHost('beobachter');
  });

  it('Should render correct schema markup for the authors page', async () => {
    render(mockedComponent(mockData));

    await waitFor(() => {
      const scriptTag = document.head.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(scriptTag).not.toBeNull();
      expect(scriptTag).toBeInTheDocument();
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
      const schemaData = JSON.parse(scriptTag.textContent);
      const schemaGraph = schemaData['@graph'];

      // Check for Organization with name 'Ringier'
      const organization = schemaGraph.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        (item) => item['@type'] === 'Organization' && item.name === 'Ringier',
      );
      expect(organization).toBeDefined();
      expect(organization.name).toBe('Ringier');

      // Check for NewsMediaOrganization with specific @id
      const newsMediaOrganization = schemaGraph.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        (item) =>
          item['@type'] === 'NewsMediaOrganization' &&
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          item['@id'] === `${global.locationOrigin}/#/schema/Organization/1`,
      );
      expect(newsMediaOrganization).toBeDefined();
      expect(newsMediaOrganization['@id']).toBe(
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        `${global.locationOrigin}/#/schema/Organization/1`,
      );

      // Check for Website with @id
      const websiteSchema = schemaGraph.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        (item) =>
          item['@type'] === 'WebSite' &&
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          item['@id'] === `${global.locationOrigin}/#/schema/WebSite/1`,
      );
      expect(websiteSchema).toBeDefined();
      expect(websiteSchema['@id']).toBe(
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        `${global.locationOrigin}/#/schema/WebSite/1`,
      );
    });
  });
});
