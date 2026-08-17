import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component, { getTermSettings } from '../../LandingPage';
import {
  OVERVIEW_PAGE_HEADER_BLOG_KEY,
  OVERVIEW_PAGE_HEADER_VIDEO_BLOG_KEY,
} from '../../../components/OverviewPageHeader';
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import {
  CHANNEL_TYPE_BLOG,
  CHANNEL_TYPE_SPECIAL,
  CHANNEL_TYPE_VIDEO_BLOG,
} from '../../Channel/constants';

jest.mock('../../../components/HeroSlider');

/* @ts-ignore TODO: TS7034 ->  Variable 'landingPageMockData' implicitly has type 'any' in some locations where its type cannot be determined. */
let landingPageMockData;
const location = { pathname: 'null' };

beforeAll(() => {
  //@ts-ignore
  routeInitialState.locationBeforeTransitions = {
    pathname: '/',
  };
  settingsInitialState.activeMainChannel = 'People';
  location.pathname = '/people';
});

beforeEach(() => {
  landingPageMockData = JSON.parse(JSON.stringify(mockData));
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.schweizer-illustrierte.ch';
});

describe('[Screen] LandingPage', () => {
  test('Should render nothing if landingPage is an empty', () => {
    const { queryByTestId } = render(
      <MockedProvider>
        <ReduxProvider state={routeInitialState}>
          <HelmetProvider>
            <Component
              landingPage={{}}
              settingsState={{}}
              location={location}
            />
          </HelmetProvider>
        </ReduxProvider>
      </MockedProvider>,
    );
    expect(queryByTestId('landing-page-wrapper')).toBeNull();
  });

  test('Should render landing page if body is present', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <HelmetProvider>
          <Component
            /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
            landingPage={landingPageMockData}
            settingsState={settingsInitialState}
            location={location}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('landing-page-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-paragraphs')).not.toBeNull();
  });

  test('Should render landing page with header and grid', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.body = null;
    settingsInitialState.activeMainChannel = 'Specials';
    const { queryByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <HelmetProvider>
          <Component
            /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
            landingPage={landingPageMockData}
            settingsState={settingsInitialState}
            location={location}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('landing-page-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-grid')).not.toBeNull();
    expect(queryByTestId('landing-page-paragraphs')).toBeNull();
  });

  test('Should render landing page with special breadcrumbs', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.body = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.channel.channelType = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.channel.sponsors.edges = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.preferredUri = '/specials';
    settingsInitialState.activeMainChannel = 'Specials';
    const { queryByTestId } = render(
      <MockedProvider>
        <ReduxProvider state={routeInitialState}>
          <HelmetProvider>
            <Component
              /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
              landingPage={landingPageMockData}
              settingsState={settingsInitialState}
              location={location}
            />
          </HelmetProvider>
        </ReduxProvider>
      </MockedProvider>,
    );

    expect(queryByTestId('specials-breadcrumbs-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-grid')).not.toBeNull();
    expect(queryByTestId('landing-page-partnerbanner-wrapper')).toBeNull();
    expect(queryByTestId('landing-page-paragraphs')).toBeNull();
  });

  test('Should render landing page with channel breadcrumbs', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.body = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.preferredUri = '/specials/wallis-2019';
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.channel.channelType = CHANNEL_TYPE_SPECIAL;
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.channel.sponsors.edges = '';
    settingsInitialState.activeMainChannel = 'Style';
    const { queryByTestId } = render(
      <MockedProvider>
        <ReduxProvider state={routeInitialState}>
          <HelmetProvider>
            <Component
              /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
              landingPage={landingPageMockData}
              settingsState={settingsInitialState}
              location={location}
            />
          </HelmetProvider>
        </ReduxProvider>
      </MockedProvider>,
    );

    expect(queryByTestId('channel-breadcrumbs-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-grid')).toBeNull();
    expect(queryByTestId('landing-page-partnerbanner-wrapper')).toBeNull();
    expect(queryByTestId('landing-page-paragraphs')).toBeNull();
  });

  test('Should render landing page without grid', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.body = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.preferredUri = '/videosBlogs/video-foo';
    /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
    landingPageMockData.channel.channelType = CHANNEL_TYPE_VIDEO_BLOG;
    settingsInitialState.activeMainChannel = 'VideoBlogs';
    const { queryByTestId } = render(
      <MockedProvider>
        <ReduxProvider state={routeInitialState}>
          <HelmetProvider>
            <Component
              /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
              landingPage={landingPageMockData}
              settingsState={settingsInitialState}
              location={location}
            />
          </HelmetProvider>
        </ReduxProvider>
      </MockedProvider>,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('channel-breadcrumbs-wrapper').innerHTML).toContain(
      '/videos',
    );
    expect(queryByTestId('landing-page-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-partnerbanner-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-grid')).toBeNull();
    expect(queryByTestId('landing-page-paragraphs')).toBeNull();
  });

  test.each`
    channelType                | headerLayout
    ${CHANNEL_TYPE_BLOG}       | ${OVERVIEW_PAGE_HEADER_BLOG_KEY}
    ${CHANNEL_TYPE_VIDEO_BLOG} | ${OVERVIEW_PAGE_HEADER_VIDEO_BLOG_KEY}
    ${CHANNEL_TYPE_SPECIAL}    | ${undefined}
  `(
    'Should return correct termsettings for channel type $channelType',
    ({ channelType, headerLayout }) => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
      const channel = landingPageMockData.channel;
      channel.channelType = channelType;
      const termSettings = getTermSettings(channel);

      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      expect(termSettings.headerLayout).toBe(headerLayout);
    },
  );
});

test('[SGE] Should render correct JSON-LD schema markup', async () => {
  render(
    <MockedProvider>
      <ReduxProvider state={routeInitialState}>
        <HelmetProvider>
          <Component
            /* @ts-ignore TODO: TS7005 ->  Variable 'landingPageMockData' implicitly has an 'any' type. */
            landingPage={landingPageMockData}
            settingsState={settingsInitialState}
            location={location}
          />
        </HelmetProvider>
      </ReduxProvider>
    </MockedProvider>,
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
      '@id': 'https://www.schweizer-illustrierte.ch/#/schema/Organization/2',
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
      '@id': 'https://www.schweizer-illustrierte.ch/#/schema/Organization/1',
      url: 'https://www.schweizer-illustrierte.ch/videos',
      name: 'Schweizer Illustrierte',
      legalName: 'Ringier AG | Ringier Medien Schweiz',
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
  });
});
