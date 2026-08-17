import { enrichBody, getFullquoteHelmetNode } from '../helpers';

const items = [
  {
    __typename: 'test_item',
    link: {
      __typename: 'link',
      path: `${__FI_BOX_SERVICE_ENDPOINT__}/services/esi-widgets/fullquote-header?p=aktien/{widgetParams}`,
    },
    sponsor: {
      key: 'VT',
      teaserImage: {
        image: {
          file: {
            relativeOriginPath: 'sponsor-logos/VT.png',
          },
        },
      },
    },
  },
  {
    __typename: 'test_item',
    link: {
      __typename: 'link',
      path: `${__FI_BOX_SERVICE_ENDPOINT__}/services/esi-widgets/master-data/{valorNr}-{mMarketId}-{mCurrencyId}`,
    },
    sponsor: {
      key: 'VT',
      teaserImage: {
        image: {
          file: {
            relativeOriginPath: 'sponsor-logos/VT.png',
          },
        },
      },
    },
  },
  {
    __typename: 'test_item',
    link: {
      __typename: 'link',
      path: `${__FI_BOX_SERVICE_ENDPOINT__}/services/esi-widgets/market-places/{valorNr}`,
    },
    sponsor: {
      key: 'VT',
      teaserImage: {
        image: {
          file: {
            relativeOriginPath: 'sponsor-logos/VT.png',
          },
        },
      },
    },
  },
  {
    __typename: 'test_item',
    link: {
      __typename: 'link',
      path: `${__FI_BOX_SERVICE_ENDPOINT__}/services/esi-widgets/master-data/{valorNr}-{mMarketId}-{mCurrencyId}`,
    },
    sponsor: {
      key: 'VT',
      teaserImage: {
        image: {
          file: {
            relativeOriginPath: 'sponsor-logos/VT.png',
          },
        },
      },
    },
  },
];

describe('[COMPONENT] FullquotePage', () => {
  test('Test WidgetUrlParams replacement', () => {
    expect(
      enrichBody({
        body: items[0],
        data: {
          valorName: 'UBS1234-Test1--YES-123456789',
          market: 'CH987',
          currency: 'CHF',
        },
        replacements: '{}',
      }),
    ).toMatchSnapshot();
  });
  test('Test WidgetUrlParams replace if valorname is null', () => {
    expect(
      enrichBody({
        body: items[1],
        data: {
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
          valorName: null,
          market: 'CH987',
          currency: 'USD',
          mCurrencyId: 23,
          mMarketId: 343,
        },
        replacements: '{}',
      }),
    ).toMatchSnapshot();
  });
  test('Test WidgetUrlParams replace if market is null', () => {
    expect(
      enrichBody({
        body: items[2],
        data: {
          valorName: 'test-valor1',
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
          market: null,
          currency: 'USD',
        },
        replacements: '{}',
      }),
    ).toMatchSnapshot();
  });
  test('Test WidgetUrlParams replace if currency is null', () => {
    expect(
      enrichBody({
        body: items[2],
        data: {
          valorName: 'test-4',
          market: 'CH987',
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
          currency: null,
        },
        replacements: '{}',
      }),
    ).toMatchSnapshot();
  });
  test('Test WidgetUrlParams replace if items is null', () => {
    expect(
      enrichBody({
        body: null,
        data: {
          valorName: 'test-3',
          market: 'CH987',
          currency: 'USD',
        },
        replacements: '{}',
      }),
    ).toMatchSnapshot();
  });
  test('Test WidgetUrlParams replace valorNr, market and currency ids', () => {
    expect(
      enrichBody({
        body: items[3],
        data: {
          valorName: '23479',
          market: 'CH987',
          currency: 'USD',
          mCurrencyId: 1,
          mMarketId: 4,
        },
        replacements: '{}',
      }),
    ).toMatchSnapshot();
  });

  test('uses the fullquote canonical URL for helmet meta links', () => {
    const originalLocationOrigin = (global as any).locationOrigin;
    (global as any).locationOrigin = 'https://localhost:3333';

    try {
      const helmetNode = getFullquoteHelmetNode({
        valorName: 'abb-n-1222171',
        location: {
          href: '/aktien/abb-n-1222171',
        },
        data: {
          getFullquotePage: {
            title: 'ABB N',
            canonicalUrl: 'aktien/abb-n-1222171',
            mMarket: 'SWX',
            mCur: 'CHF',
          },
          environment: {
            routeByPath: {
              object: {
                title: 'Aktien',
                metaLinks: [
                  {
                    rel: 'canonical',
                    href: 'https://localhost:3333/aktien/abb-n-1222171/swx/chf',
                  },
                ],
              },
            },
          },
        },
      });

      expect(helmetNode.metaCanonicalUrl).toBe(
        'https://localhost:3333/aktien/abb-n-1222171',
      );
      expect(helmetNode.metaLinks).toEqual([
        {
          rel: 'canonical',
          href: 'https://localhost:3333/aktien/abb-n-1222171',
        },
      ]);
    } finally {
      (global as any).locationOrigin = originalLocationOrigin;
    }
  });
});

// TODO: fix tests
