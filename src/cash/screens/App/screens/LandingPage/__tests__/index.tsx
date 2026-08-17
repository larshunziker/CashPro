import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';
import { getHost } from '../../../../../../../tests-e2e/shared/constants';

jest.mock('../../MyCash/components/Musterportfolio/MusterportfolioTable');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps = null;
const initialState = {};

beforeEach(() => {
  jest.clearAllMocks();
  initialProps = { ...JSON.parse(JSON.stringify(mockData)), page: 1 };
});

describe('[Screen] LandingPage', () => {
  it('Should render LandingPageHome correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.grid = null;
    const { queryByTestId, container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} location={{ pathname: '/' }} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('landingpage-home')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render LandingPagePullout squareBanner correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.grid = null;
    const { queryByTestId, container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} location={{ pathname: '/notHome' }} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('landingpage-pullout')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render LandingPageDefault correctly', () => {
    const { queryByTestId, container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} location={{ pathname: '/notHome' }} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('landingpage-default')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});

describe('[SGE] LandingPage - Schema Tests', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps = null;
  let initialState = {};

  beforeEach(() => {
    initialProps = {
      landingPage: JSON.parse(JSON.stringify(mockData.landingPage)),
      locationState: routeInitialState,
      location: {
        pathname: mockData.landingPage.preferredUri,
      },
    };
    initialState = {};
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = getHost('cash');
  });

  it('Should render correct schema markup for the landing page', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.grid = null;

    render(
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          <SSRContextProvider>
            <HelmetProvider>
              {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
              <Component {...initialProps} />
            </HelmetProvider>
          </SSRContextProvider>
        </MockedProvider>
      </ReduxProvider>,
    );

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
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        '@id': `${global.locationOrigin}/#/schema/Organization/1`,
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        url: `${global.locationOrigin}${mockData.landingPage.preferredUri}`,
        name: 'Cash',
        legalName: 'Ringier AG | Ringier Medien Schweiz',
        description: `${mockData.landingPage.metaDescription}`,
      };

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
      expect(newsMediaOrganization).toMatchObject(expNewsMediaOrganization);

      // check for no image in website schema
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      const website = schemaGraph.find((item) => item['@type'] === 'WebSite');
      expect(website).toBeDefined();

      // no image in website schema
      expect(website).not.toHaveProperty('image');
    });
  });
});
