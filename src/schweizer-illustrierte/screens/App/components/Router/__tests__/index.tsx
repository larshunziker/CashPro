import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import getEntityQueueLimitByPath from '../getEntityQueueLimitByPath';
import MockedProvider, {
  WILDCARD_QUERY,
} from '../../../../../../shared/tests/components/MockedProvider';
import { apolloConfig } from '../apolloConfig';
import {
  ARTICLE_CONTENT_TYPE,
  CHANNEL_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../shared/constants/content';
import {
  ROUTE_BODY_HEALTH,
  ROUTE_ENTERTAINMENT,
  ROUTE_FAMILY,
  ROUTE_HOME,
  ROUTE_PEOPLE,
  ROUTE_STYLE,
} from '../../../../App/constants';

jest.mock('../../../screens/ArticlePage');
jest.mock('../../../screens/LandingPage');
jest.mock('../../../screens/StatusPage');
jest.mock('../../../screens/Keyword');
jest.mock('../../../screens/Video');
jest.mock('../../../screens/Channel');
jest.mock('../../../screens/PageScreen');
jest.mock('../../../screens/ImageGalleryArticle');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'gqlDataMock' implicitly has type 'any' in some locations where its type cannot be determined. */
let gqlDataMock;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialState = {
    route: routeInitialState,
  };

  initialProps = {
    loading: true,
    page: 1,
    location: {
      query: {
        page: 1,
      },
      pathname: '/',
      search: '',
    },
  };

  gqlDataMock = {
    loading: true,
    environment: {
      routeByPath: {},
    },
  };

  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.__GRAPHQL_HOST__ = 'https://api.preview.si.com/';
});

afterEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  //@ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

describe('[Component] Router', () => {
  it('Should not handle soft 301 redirect on client if preferred uri is /home-si', () => {
    const preferredUri = '/home-si';

    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    gqlDataMock.environment.routeByPath = {
      object: {},
      preferred: preferredUri,
    };

    const spy = jest.spyOn(window.history, 'replaceState');

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: WILDCARD_QUERY,
              //@ts-ignore
              variables: apolloConfig.options(initialProps).variables,
            },
            result: {},
          },
        ]}
      >
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          <SSRContextProvider>
            <HelmetProvider>
              {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
              {/* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */}
              <Component {...initialProps} data={gqlDataMock} />
            </HelmetProvider>
          </SSRContextProvider>
        </ReduxProvider>
      </MockedProvider>,
    );

    expect(window.history.replaceState).not.toHaveBeenCalled();

    spy.mockReset();
  });

  it('Should not handle soft 301 redirect on client if current uri is /', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.location.pathname = '/';
    /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
    gqlDataMock.environment.routeByPath = {
      object: {},
      preferred: '/abc',
    };

    const spy = jest.spyOn(window.history, 'replaceState');

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: WILDCARD_QUERY,
              //@ts-ignore
              variables: apolloConfig.options(initialProps).variables,
            },
            result: {},
          },
        ]}
      >
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          <SSRContextProvider>
            <HelmetProvider>
              {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
              {/* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */}
              <Component {...initialProps} data={gqlDataMock} />
            </HelmetProvider>
          </SSRContextProvider>
        </ReduxProvider>
      </MockedProvider>,
    );

    expect(window.history.replaceState).not.toHaveBeenCalled();

    spy.mockReset();
  });

  it('Should render nothing while data loading', () => {
    initialProps = {
      /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
      data: gqlDataMock,
      loading: true,
      page: 1,
      location: {
        query: {
          page: 1,
        },
        pathname: '/abc',
        search: '',
      },
    };

    const { queryByTestId, container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
    expect(queryByTestId('mocked-status-page')).toBeNull();
  });

  it('Should not render Statuspage if page is static', () => {
    initialProps = {
      /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
      data: gqlDataMock,
      page: 1,
      location: {
        query: {
          page: 1,
        },
        pathname: '/abc',
        search: '',
        loading: false,
      },
    };

    initialProps.data.isStatic = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.route.loading = false;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('mocked-status-page')).toBeNull();
  });

  it('Should render Statuspage if routeByPath object is empty', () => {
    initialProps = {
      /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
      data: gqlDataMock,
      page: 1,
      location: {
        query: {
          page: 1,
        },
        pathname: '/abc',
        search: '',
        loading: false,
      },
    };

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.route.loading = false;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('mocked-status-page')).not.toBeNull();
  });

  // TODO: fix this OOM issue
  test.each`
    contentType                        | mockId
    ${ARTICLE_CONTENT_TYPE}            | ${'mocked-article-page'}
    ${NATIVE_ADVERTISING_CONTENT_TYPE} | ${'mocked-article-page'}
    ${LANDING_PAGE_CONTENT_TYPE}       | ${'mocked-landing-page'}
    ${KEYWORD_CONTENT_TYPE}            | ${'mocked-keyword-page'}
    ${VIDEO_CONTENT_TYPE}              | ${'mocked-video-page'}
    ${IMAGE_GALLERY_CONTENT_TYPE}      | ${'mocked-image-gallery-article'}
    ${CHANNEL_CONTENT_TYPE}            | ${'mocked-channel-page'}
    ${PAGE_CONTENT_TYPE}               | ${'mocked-page-screen'}
  `('Should render $contentType page', ({ contentType, mockId }) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.data = {
      environment: {
        routeByPath: {
          object: {
            __typename: contentType,
          },
          preferred: `/${mockId}`,
        },
      },
    };

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId(mockId)).not.toBeNull();
    expect(queryByTestId('mocked-status-page')).toBeNull();
  });

  test.each`
    pathname               | itemCount
    ${ROUTE_STYLE}         | ${20}
    ${ROUTE_PEOPLE}        | ${15}
    ${ROUTE_HOME}          | ${18}
    ${ROUTE_ENTERTAINMENT} | ${13}
    ${ROUTE_FAMILY}        | ${7}
    ${ROUTE_BODY_HEALTH}   | ${7}
    ${null}                | ${-1}
    ${''}                  | ${-1}
  `(
    'Should return correct entity queue limit for path $pathname',
    ({ pathname, itemCount }) => {
      const count = getEntityQueueLimitByPath(pathname);
      expect(count).toBe(itemCount);
    },
  );
});
