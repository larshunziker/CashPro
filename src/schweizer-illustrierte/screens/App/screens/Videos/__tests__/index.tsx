import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import environmentMockedData from './mockData.json';
import { ROUTE_VIDEOS } from '../../../constants';

jest.mock('../../../components/Pager');
jest.mock('../../../components/VideoStage');
jest.mock('../../../components/AppNexus');
jest.mock('../../../components/Breadcrumbs');
jest.mock('../../../components/Recommendations');
jest.mock('../../StatusPage', () => {
  return () => <div />;
});

/* @ts-ignore TODO: TS7034 ->  Variable 'gqlDataMock' implicitly has type 'any' in some locations where its type cannot be determined. */
let gqlDataMock;
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://localhost:3000';

  // reset test data on each run
  initialState = {
    route: {
      ...routeInitialState,
      locationBeforeTransitions: {
        ...routeInitialState.locationBeforeTransitions,
        pathname: ROUTE_VIDEOS,
      },
    },
  };

  gqlDataMock = JSON.parse(JSON.stringify(environmentMockedData));
  gqlDataMock.loading = true;
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'mockData' implicitly has an 'any' type. */
const mockedComponent = (mockData) => {
  initialProps = {
    data: mockData.data,
    page: 1,
    location: {
      query: {
        page: 1,
      },
      pathname: `/${ROUTE_VIDEOS}`,
      search: '',
    },
  };
  return (
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    <ReduxProvider initialState={initialState}>
      <HelmetProvider>
        <Component {...initialProps} />
      </HelmetProvider>
    </ReduxProvider>
  );
};

describe('[Screen] Videos', () => {
  test('Should render nothing', async () => {
    const { queryByTestId } = render(mockedComponent({}));

    // return null is rendering an empty div `<div />` so innerhtml is empty
    expect(queryByTestId('videos-wrapper')).toBeNull();
  });

  test('Should render nothing if landingpage is not delivered', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    gqlDataMock.data.environment.routeByPath = null;

    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(gqlDataMock));

    // return null is rendering an empty div `<div />` so innerhtml is empty
    expect(queryByTestId('videos-wrapper')).toBeNull();
  });

  test('Should render nothing if globalSearch is not delivered', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    gqlDataMock.data.environment.globalSearch = null;

    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(gqlDataMock));

    // return null is rendering an empty div `<div />` so innerhtml is empty
    expect(queryByTestId('videos-wrapper')).toBeNull();
  });

  test('Should not render video blogs if termsByVocabulary is not present', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    gqlDataMock.data.environment.termsByVocabulary = null;

    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(gqlDataMock));

    expect(queryByTestId('video-blogs-wrapper')).toBeNull();
  });

  test('Should render video blogs if termsByVocabulary is present', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(gqlDataMock));

    expect(queryByTestId('video-blogs-wrapper')).not.toBeNull();
  });

  test('Should not render breadcrums if preferredUri is not present', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    gqlDataMock.data.environment.routeByPath.object.preferredUri = null;

    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(gqlDataMock));

    expect(queryByTestId('videos-breadcrumbs-wrapper')).toBeNull();
  });

  test('should render webpage schema on the videos page', async () => {
    render(mockedComponent({}));

    const webPageSchema = {
      '@context': 'https://schema.org',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': global.locationOrigin,
      '@type': 'WebPage',
      breadcrumb: {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        '@id': `${global.locationOrigin}/#/schema/BreadcrumbList`,
        '@type': 'BreadcrumbList',
      },
      isPartOf: {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        '@id': `${global.locationOrigin}/#/schema/WebSite/1`,
        '@type': 'WebSite',
      },
      name: 'Schweizer Illustrierte',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: global.locationOrigin,
    };

    await waitFor(() => {
      const scriptTag = document.head.querySelector(
        'script[type="application/ld+json"]',
      );

      expect(scriptTag).not.toBeNull();

      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const schemaData = JSON.parse(scriptTag.innerHTML);

      expect(schemaData['@graph']).toEqual(
        expect.arrayContaining([expect.objectContaining(webPageSchema)]),
      );
    });
  });
});
