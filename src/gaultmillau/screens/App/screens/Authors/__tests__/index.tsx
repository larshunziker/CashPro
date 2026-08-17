import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import Component from '..';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import { ROUTE_AUTHORS } from '../../../constants';

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
        pathname: `/${ROUTE_AUTHORS}`,
      },
    },
    loading: loading,
  };

  initialProps = {
    data: mockedData.data,
    location: {
      pathname: `/${ROUTE_AUTHORS}`,
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
});

describe('[Screen] Authors', () => {
  test('should render webpage schema on the authors page', async () => {
    render(mockedComponent({}));

    const webSiteSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.gaultmillau.ch/#/schema/WebSite/1',
      '@type': 'WebSite',
      alternateName: 'Ringier AG | Ringier Medien Schweiz',
      name: 'Gault Millau',
      potentialAction: {
        '@type': 'SearchAction',
        'query-input': 'required name=search_term_string',
        target: {
          '@type': 'EntryPoint',
          urltemplate: 'https://www.gaultmillau.ch/suche/{search_term_string}',
        },
      },
      publisher: {
        '@id': 'https://www.gaultmillau.ch/#/schema/Organization/1',
      },
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
        expect.arrayContaining([expect.objectContaining(webSiteSchema)]),
      );
    });
  });
});
