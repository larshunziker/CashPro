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

describe('[Screen] LandingPage', () => {
  let initialProps = {};
  let initialState = {};

  beforeEach(() => {
    initialProps = {
      landingPage: JSON.parse(JSON.stringify(mockData)),
      locationState: routeInitialState,
      location: {
        pathname: '/',
      },
    };
    initialState = {};
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = getHost('beobachter');
  });

  it('Should render LandingPageHome correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('landingpage-home')).not.toBeNull();
    expect(queryByTestId('landingpage-default-wrapper')).toBeNull();
  });

  it('Should render LandingPageDefault correctly', () => {
    // @ts-ignore
    initialProps.location.pathname = 'somethingelsethanHome';
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          <SSRContextProvider>
            <HelmetProvider>
              <Component {...initialProps} />
            </HelmetProvider>
          </SSRContextProvider>
        </MockedProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('landingpage-default-wrapper')).not.toBeNull();
    expect(queryByTestId('landingpage-linklist-wrapper')).toBeNull();
  });
});

describe('[SGE] LandingPage - Schema Tests', () => {
  let initialProps = {};
  let initialState = {};

  beforeEach(() => {
    initialProps = {
      landingPage: JSON.parse(JSON.stringify(mockData)),
      locationState: routeInitialState,
      location: {
        pathname: mockData.preferredUri,
      },
    };
    initialState = {};
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = getHost('beobachter');
  });

  it('Should render correct schema markup for the landing page', async () => {
    render(
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          <SSRContextProvider>
            <HelmetProvider>
              <Component {...initialProps} />
            </HelmetProvider>
          </SSRContextProvider>
        </MockedProvider>
      </ReduxProvider>,
    );

    await waitFor(() => {
      const scriptTags = document.head.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      expect(scriptTags).not.toBeNull();
      expect(scriptTags.length).toBeGreaterThan(0);

      const schemaData = Array.from(scriptTags).map((scriptTag) =>
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
        JSON.parse(scriptTag.textContent),
      );

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

      const expImageObjects = [
        {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          '@id': expect.stringContaining('sites/default/files'),
          url: expect.stringContaining('sites/default/files'),
          contentUrl: expect.stringContaining('sites/default/files'),
          width: '1200',
          height: '1200',
          caption: null,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          '@id': expect.stringContaining('android-icon-96x96.png'),
          url: expect.stringContaining('android-icon-96x96.png'),
          contentUrl: expect.stringContaining('android-icon-96x96.png'),
          width: '192',
          height: '192',
          caption: null,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          '@id': expect.stringContaining('apple-icon.png'),
          url: expect.stringContaining('apple-icon.png'),
          contentUrl: expect.stringContaining('apple-icon.png'),
          width: '192',
          height: '192',
          caption: null,
        },
      ];

      const graphArray = schemaData[0]['@graph'];

      const organizationSchema = graphArray.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'schema' implicitly has an 'any' type. */
        (schema) =>
          schema['@type'] === 'Organization' && schema.name === 'Ringier',
      );

      expect(organizationSchema).toBeDefined();
      if (organizationSchema) {
        expect(organizationSchema).toMatchObject(expOrganization);
      }

      const imageSchemas = schemaData.filter(
        (schema) => schema['@type'] === 'ImageObject',
      );
      expect(imageSchemas.length).toBeGreaterThanOrEqual(3);
      imageSchemas.forEach((imageSchema, index) => {
        expect(imageSchema).toMatchObject(expImageObjects[index]);
      });
    });
  });

  it('Should render Organization schema with publisher logo on the home page', async () => {
    const homeLandingPage = JSON.parse(JSON.stringify(mockData));
    homeLandingPage.preferredUri = '/home';
    homeLandingPage.metaDescription =
      'Wir publizieren täglich über Recht und Gerechtigkeit.';

    render(
      <ReduxProvider initialState={initialState}>
        <MockedProvider>
          <SSRContextProvider>
            <HelmetProvider>
              <Component
                {...initialProps}
                landingPage={homeLandingPage}
                location={{ pathname: '/' }}
              />
            </HelmetProvider>
          </SSRContextProvider>
        </MockedProvider>
      </ReduxProvider>,
    );

    await waitFor(() => {
      const scriptTags = document.head.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      const schemaData = Array.from(scriptTags).map((scriptTag) =>
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
        JSON.parse(scriptTag.textContent),
      );

      const graphArray = schemaData[0]['@graph'];
      const newsMediaOrganization = graphArray.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'schema' implicitly has an 'any' type. */
        (schema) =>
          schema['@type'] === 'NewsMediaOrganization' &&
          schema.name === 'Beobachter',
      );

      expect(newsMediaOrganization).toBeDefined();
      expect(newsMediaOrganization.logo).toMatchObject({
        '@type': 'ImageObject',
        width: 600,
        height: 122,
        url: expect.stringContaining('logo-beobachter'),
      });
    });
  });
});
