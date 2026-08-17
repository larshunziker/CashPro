import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import Component from '..';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import { BLOG_DATA } from '../../../constants';

let initialProps;
let initialState;

/* @ts-ignore TODO: TS7006 ->  Parameter 'mockedData' implicitly has an 'any' type. */
const mockedComponent = (mockedData, loading = false) => {
  initialState = {
    route: {
      ...routeInitialState,
      locationBeforeTransitions: {
        ...routeInitialState.locationBeforeTransitions,
        pathname: `/${BLOG_DATA['blog_a_de'].url}`,
      },
    },
    loading: loading,
  };

  initialProps = {
    data: mockedData.data,
    location: {
      pathname: `/${BLOG_DATA['blog_a_de'].url}`,
    },
  };

  return (
    <ReduxProvider state={initialState}>
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </IntlProvider>
    </ReduxProvider>
  );
};

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.gaultmillau.ch';
});

describe('[Screen] Blog A', () => {
  test('should render webpage schema on the Blog A page', async () => {
    render(mockedComponent({}));

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.gaultmillau.ch',
      '@type': 'WebPage',
      isPartOf: {
        '@id': 'https://www.gaultmillau.ch/#/schema/WebSite/1',
        '@type': 'WebSite',
      },
      name: 'Gault Millau',
      url: 'https://www.gaultmillau.ch',
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
