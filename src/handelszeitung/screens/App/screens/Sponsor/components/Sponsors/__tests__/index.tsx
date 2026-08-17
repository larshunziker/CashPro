import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { ROUTE_BRAND_REPORT } from '../../../../../constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const initialState = {};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

beforeEach(() => {
  initialProps = {
    page: 1,
    loading: true,
    location: {
      pathname: `/${ROUTE_BRAND_REPORT}`,
    },
  };

  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://handelszeitung.ch';
});

describe('[Screen] Sponsors', () => {
  test('should render website schema on the brand reports page', async () => {
    render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    const webSiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/WebSite/1`,
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: global.locationOrigin,
      alternateName: 'Ringier AG | Ringier Medien Schweiz',
      name: 'Handelszeitung',
      publisher: {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        '@id': `${global.locationOrigin}/#/schema/Organization/1`,
      },
    };

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
