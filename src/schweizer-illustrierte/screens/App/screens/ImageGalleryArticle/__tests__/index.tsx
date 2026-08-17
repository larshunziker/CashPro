import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../../ImageGalleryArticle';
import imageGalleryArticleMock from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'imageGalleryArticleMockData' implicitly has type 'any' in some locations where its type cannot be determined. */
let imageGalleryArticleMockData;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

jest.mock('../../../components/UtilityBar', () => {
  return () => <div />;
});
jest.mock('../../../components/UtilityBar/components/UtilityOverlay');
jest.mock('../../../components/Recommendations');
jest.mock('../../Article/components/ArticleAlerts');
jest.mock('../../../components/Paragraphs', () => {
  return () => <div />;
});

beforeAll(() => {
  initialState = {
    route: routeInitialState,
    settings: settingsInitialState,
    articleData: {
      title: 'This is the title',
      shortTitle: 'This is the short title',
      lead: 'Lead',
    },
  };

  // mock initialstate pathname
  initialState.route.locationBeforeTransitions = {
    /* @ts-ignore TODO: TS2783 ->  'pathname' is specified more than once, so this usage will be overwritten. */
    pathname: '/',
    /* @ts-ignore TODO: TS2783 ->  'action' is specified more than once, so this usage will be overwritten. */
    action: 'POP',
    ...routeInitialState.locationBeforeTransitions,
  };
  initialState.settings.activeMainChannel = 'People';
});

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.__GRAPHQL_HOST__ = 'https://api.preview.si.com/';

  imageGalleryArticleMockData = JSON.parse(
    JSON.stringify(imageGalleryArticleMock),
  );
});

describe('[Screen] ImageGalleryArticle', () => {
  test('Should render component correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component
            /* @ts-ignore TODO: TS7005 ->  Variable 'imageGalleryArticleMockData' implicitly has an 'any' type. */
            imageGalleryArticle={imageGalleryArticleMockData}
            settingsState={settingsInitialState}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(
      queryByTestId('image-gallery-detail-paragraph-container'),
    ).not.toBeNull();
    expect(queryByTestId('image-gallery-detail-hero-container')).not.toBeNull();
    expect(
      queryByTestId('image-gallery-detail-counter-container'),
    ).not.toBeNull();
  });

  /*  test('Should not render any paragraph wrappers', () => {
    imageGalleryArticleMockData = {};
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component
            imageGalleryArticle={imageGalleryArticleMockData}
            settingsState={settingsInitialState}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('image-gallery-detail-container')).toBeNull();
  }); */

  test('Should not render counter if no body is present', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'imageGalleryArticleMockData' implicitly has an 'any' type. */
    imageGalleryArticleMockData.body = null;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'imageGalleryArticleMockData' implicitly has an 'any' type. */}
          <Component imageGalleryArticle={imageGalleryArticleMockData} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('image-gallery-detail-counter-container')).toBeNull();
  });

  test('Should render hero component and no paragraphs', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'imageGalleryArticleMockData' implicitly has an 'any' type. */
    imageGalleryArticleMockData.body = null;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'imageGalleryArticleMockData' implicitly has an 'any' type. */}
          <Component imageGalleryArticle={imageGalleryArticleMockData} />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(
      queryByTestId('image-gallery-detail-paragraph-container'),
    ).toBeNull();

    expect(queryByTestId('image-gallery-detail-hero-container')).not.toBeNull();
  });

  /*  test('Should render paragraphs wrappers and no hero', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component
            imageGalleryArticle={{ body: imageGalleryArticleMock.body }}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('image-gallery-detail-hero-container')).toBeNull();
    expect(
      queryByTestId('image-gallery-detail-paragraph-container'),
    ).not.toBeNull();
  }); */
});
