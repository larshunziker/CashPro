import React from 'react';
import { waitFor } from '@testing-library/react';
import Component from '../index';
import { render } from '../../../../../shared/customRenderer';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens */
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import { apolloConfig } from '../apolloConfig';
import mockData from './mockData.json';
/*@ts-ignore*/
import { LATEST_QUERY } from '../queries';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

/* @ts-ignore TODO: TS7034 ->  Variable 'mocks' implicitly has type 'any' in some locations where its type cannot be determined. */
let mocks;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.handelszeitung.ch';

  initialProps = {
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ page */
    page: 1,
    data: { ...mockData.data },
  };
  mocks = [
    {
      request: {
        query: LATEST_QUERY,
        variables: apolloConfig.options(initialProps).variables,
      },
      result: mockData,
    },
  ];
});

describe('[Screen] Latest', () => {
  test('should render correct schema markup for the Latest page', async () => {
    render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'mocks' implicitly has an 'any' type. */
      <MockedProvider mocks={mocks}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MockedProvider>,
    );

    const webSiteSchema = {
      '@context': 'https://schema.org',
      '@id': 'https://www.handelszeitung.ch/#/schema/WebSite/1',
      '@type': 'WebSite',
      alternateName: 'Ringier AG | Ringier Medien Schweiz',
      name: 'Handelszeitung',
      publisher: {
        '@id': 'https://www.handelszeitung.ch/#/schema/Organization/1',
      },
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: `${global.locationOrigin}/latest`,
    };

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
