import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider/index';
import { HoroscopeDetailWrapper as HoroscopeDetail } from '../../HoroscopeDetail';
import mockData from './mockData.json';

let initialProps = {};
let initialState = {};
let webSiteSchema = {};

jest.mock('../components/LatestStories');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.schweizer-illustrierte.ch';
  webSiteSchema = {
    '@context': 'https://schema.org',
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    '@id': `${global.locationOrigin}/#/schema/WebSite/1`,
    '@type': 'WebSite',
    alternateName: 'Ringier AG | Ringier Medien Schweiz',
    name: 'Schweizer Illustrierte',
    publisher: {
      '@id': 'https://www.schweizer-illustrierte.ch/#/schema/Organization/1',
    },
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    url: global.locationOrigin,
  };
  initialState = {
    route: routeInitialState,
  };

  initialProps = {
    data: mockData.data,
    location: {
      query: {
        path: '/horoskop/tageshoroskop/skorpion',
      },
    },
    zodiacSlug: 'skorpion',
    params: {
      zodiacSlug: 'skorpion',
    },
  };
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
const mockedDailyComponent = (customMockData) => {
  initialProps = {
    data: customMockData.data,
    location: {
      query: {
        path: '/horoskop/tageshoroskop/skorpion',
      },
    },
    zodiacSlug: 'skorpion',
    params: {
      zodiacSlug: 'skorpion',
    },
  };
  return (
    <ReduxProvider state={initialState}>
      <HelmetProvider>
        <HoroscopeDetail {...initialProps} />
      </HelmetProvider>
    </ReduxProvider>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
const mockedYearlyComponent = (customMockData) => {
  initialProps = {
    data: customMockData.data,
    location: {
      query: {
        path: '/horoskop/jahreshoroskop/skorpion',
      },
    },
    zodiacSlug: 'skorpion',
    params: {
      zodiacSlug: 'skorpion',
    },
  };
  return (
    <ReduxProvider state={initialState}>
      <HelmetProvider>
        <HoroscopeDetail {...initialProps} isYearly />
      </HelmetProvider>
    </ReduxProvider>
  );
};

describe('[Screen] Daily Horoscope', () => {
  it('Should render nothing if there is no data', async () => {
    const { queryByTestId } = render(mockedDailyComponent({}));

    expect(queryByTestId('not-found-wrapper')).not.toBeNull();
  });

  it('Should not render paragraphs if there is no data object returned from api', async () => {
    const customMockData = { ...mockData };
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '{ environment */
    customMockData.data = null;
    const { queryByTestId } = render(mockedDailyComponent(customMockData));

    await waitFor(() => expect(queryByTestId('paragraphs-wrapper')).toBeNull());
  });

  it('Should render daily horoscope screen if all data dependencies are present', async () => {
    const { queryByTestId, queryAllByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <HoroscopeDetail {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('horoscope-detail-wrapper')).not.toBeNull();
    expect(queryByTestId('horoscope-container')).not.toBeNull();
    expect(queryAllByTestId('paragraphs-wrapper').length).toBeGreaterThan(0);
    expect(
      queryAllByTestId('daily-horoscope-short-title').length,
    ).toBeGreaterThan(0);
    expect(queryAllByTestId('daily-horoscope-title').length).toBeGreaterThan(0);
  });

  it('Should not render horoscope decades if there is no dailyHoroscope object returned from api', async () => {
    const customMockData = { ...mockData };
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    customMockData.data.dailyHoroscope = null;
    const { queryByTestId } = render(mockedDailyComponent(customMockData));

    expect(queryByTestId('daily-horoscope-wrapper')).toBeNull();
  });

  it('should render website schema on the DailyHoroscope page', async () => {
    render(mockedDailyComponent({}));

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
});

describe('[Screen] Yearly Horoscope', () => {
  it('Should render nothing if there is no data', async () => {
    const { queryByTestId } = render(mockedYearlyComponent({}));

    expect(queryByTestId('not-found-wrapper')).not.toBeNull();
  });

  it('Should render yearly horoscope screen if all data dependencies are present', async () => {
    const { queryByTestId, queryAllByTestId } = render(
      mockedYearlyComponent(mockData),
    );

    expect(queryByTestId('horoscope-detail-wrapper')).not.toBeNull();
    expect(queryByTestId('horoscope-container')).not.toBeNull();
    expect(queryAllByTestId('paragraphs-wrapper').length).toBeGreaterThan(0);
    expect(queryAllByTestId('daily-horoscope-short-title').length).toBe(0);
    expect(queryAllByTestId('daily-horoscope-title').length).toBe(0);
  });

  it('Should not render paragraphs if there is no data object returned from api', async () => {
    const customMockData = { ...mockData };
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '{ environment */
    customMockData.data = null;
    const { queryByTestId } = render(mockedYearlyComponent(customMockData));

    expect(queryByTestId('paragraphs-wrapper')).toBeNull();
  });

  it('should render website schema on the YearlyHoroscope page', async () => {
    render(mockedYearlyComponent({}));

    await waitFor(() => {
      const scriptTag = document.head.querySelector(
        'script[type="application/ld+json"]',
      );

      expect(scriptTag).not.toBeNull();
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const schemaData = JSON.parse(scriptTag.innerHTML);
      expect(schemaData).toEqual(webSiteSchema);
    });
  });
});
