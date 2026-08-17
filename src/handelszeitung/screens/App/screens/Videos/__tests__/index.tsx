import React from 'react';
import { waitFor } from '@testing-library/react';
import Component from '../index';
import { render } from '../../../../../shared/customRenderer';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens */
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import { apolloConfig } from '../apolloConfig';
import environmentMockedData from './mockData.json';
import { ROUTE_VIDEOS } from '../../../constants';
/*@ts-ignore*/
import { GET_VIDEO_PAGE } from '../queries';

/* @ts-ignore TODO: TS7034 ->  Variable 'gqlDataMock' implicitly has type 'any' in some locations where its type cannot be determined. */
let gqlDataMock;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

beforeEach(() => {
  initialProps = {
    page: 1,
    loading: true,
    location: {
      pathname: `/${ROUTE_VIDEOS}`,
    },
  };

  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://localhost:3000';

  gqlDataMock = JSON.parse(JSON.stringify(environmentMockedData));
});

describe('[Screen] Videos', () => {
  test('should render webpage schema on the videos page', async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_VIDEO_PAGE,
              variables:
                apolloConfig &&
                apolloConfig.options &&
                // @ts-ignore
                apolloConfig.options(initialProps).variables,
            },
            /* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */
            result: gqlDataMock,
          },
        ]}
      >
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'gqlDataMock' implicitly has an 'any' type. */}
        <Component {...initialProps} data={gqlDataMock.data} />
      </MockedProvider>,
    );

    const webSiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/WebSite/1`,
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: `${global.locationOrigin}/videos`,
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
