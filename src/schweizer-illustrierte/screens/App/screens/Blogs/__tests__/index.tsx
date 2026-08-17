/**
 * @file   Blogs test
 * @author  Damian Bucki <damian.bucki@dreamlab.pl>
 * @date    2018-11-22
 */

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

let initialProps = {};
let initialState = {};

beforeEach(() => {
  initialState = {
    route: routeInitialState,
  };

  initialProps = {
    data: mockData.data,
    location: {
      action: 'POP',
      hash: '',
      key: null,
      pathname: '/blogs',
      query: {},
      search: '',
    },
  };
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.schweizer-illustrierte.ch';
});

describe('[Screen] Blogs', () => {
  test('Should render blogs screen', async () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    await waitFor(() =>
      expect(queryByTestId('blogs-container')).not.toBeNull(),
    );
  });

  test('should render webpage schema on the blog page', async () => {
    render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    const expwebPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://www.schweizer-illustrierte.ch/blogs/blog',
      url: 'https://www.schweizer-illustrierte.ch/blogs/blog',
      name: 'Schweizer Illustrierte',
      description:
        'Die Blogs von Gülsha Adilji, Chris von Rohr, Susanne Hochuli, Natascha Knecht, Onur Ogul und Peter Rothenbühler',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.schweizer-illustrierte.ch/#/schema/WebSite/1',
      },
      publisher: {
        '@type': 'NewsMediaOrganization',
        '@id': 'https://www.schweizer-illustrierte.ch/#/schema/Organization/1',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        '@id':
          '/fp/1200/1200/1000/1000/sites/default/files/2019-03/schweizer_illustrierte_fallback_alt.jpg',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        '@id':
          'https://www.schweizer-illustrierte.ch/#/schema/BreadcrumbList/blogs/blog',
      },
    };

    await waitFor(() => {
      const scriptTags = document.head.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      /* @ts-ignore TODO: TS7034 ->  Variable 'webPageSchema' implicitly has type 'any' in some locations where its type cannot be determined. */
      /* @ts-ignore TODO: TS7034 ->  Variable 'imageObject' implicitly has type 'any' in some locations where its type cannot be determined. */
      let webPageSchema, imageObject;

      scriptTags.forEach((tag) => {
        const schemaData = JSON.parse(tag.innerHTML);
        const schemaItems = schemaData['@graph']
          ? schemaData['@graph']
          : [schemaData];

        /* @ts-ignore TODO: TS7005 ->  Variable 'webPageSchema' implicitly has an 'any' type. */
        if (!webPageSchema) {
          webPageSchema = schemaItems.find(
            /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
            (item) =>
              item['@type'] === 'WebPage' &&
              item.name === 'Schweizer Illustrierte',
          );
        }

        /* @ts-ignore TODO: TS7005 ->  Variable 'imageObject' implicitly has an 'any' type. */
        if (!imageObject) {
          imageObject = schemaItems.find(
            /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
            (item) =>
              item['@type'] === 'ImageObject' &&
              item.url.includes(
                '/2019-03/schweizer_illustrierte_fallback_alt.jpg',
              ),
          );
        }
      });

      // Assertions for WebPage
      expect(webPageSchema).toBeDefined();
      expect(webPageSchema).toMatchObject(expwebPageSchema);

      // Assertions for ImageObject
      expect(imageObject).toBeDefined();
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      expect(imageObject.url).toContain(
        '/2019-03/schweizer_illustrierte_fallback_alt.jpg',
      );
    });
  });
});
