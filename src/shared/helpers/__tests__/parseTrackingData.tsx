/**
 * @file   parseTrackingData test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-17 13:33:55
 */

import parseTrackingData from '../parseTrackingData';

jest.mock('../../../common/components/Auth0Provider');

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.olid = '0';
});

describe('[Function] parseTrackingData', () => {
  it.each([
    [
      {
        input: {
          data: {
            environment: {
              routeByPath: {
                object: null,
              },
            },
          },
        },
      },
    ],
    [
      {
        input: {
          data: {
            environment: {
              routeByPath: {
                canonical: '/group/10/content/236426',
                preferred: '/people',
                statusCode: 200,
                object: {
                  id: 'bm9kZToyMjI1MDQ=',
                  paragraphsSubsetSize: '2',
                  title: 'People',
                  preferredUri: '/people',
                  channel: {
                    id: 'dGF4b25vbXlfdGVybTo4MTQwNg==',
                    channelType: null,
                    settings: {
                      mainChannel: {
                        id: 'dGF4b25vbXlfdGVybTo4MTQwNg==',
                        title: 'People',
                        __typename: 'Channel',
                      },
                      __typename: 'TermSettings',
                    },
                    sponsors: { edges: [], __typename: 'SponsorConnection' },
                    __typename: 'Channel',
                  },
                  teaserImage: {
                    id: '999137',
                    image: {
                      file: {
                        relativeOriginPath: '/si_slogan.png',
                        __typename: 'ImageFile',
                      },
                      __typename: 'Image',
                    },
                    __typename: 'ImageParagraph',
                  },
                  __typename: 'LandingPage',
                },
                __typename: 'Route',
              },
              __typename: 'Environment',
            },
          },
        },
      },
    ],
    [
      {
        input: {
          data: {
            environment: {
              routeByPath: {
                canonical: '/group/10/content/245642',
                preferred: '/latest',
                object: {
                  id: 'bm9kZToyMjQzMzE=',
                  title: 'Latest',
                  preferredUri: '/latest',
                  channel: null,
                  createDate: '2019-02-20T09:48:21',
                  metaKeywords: null,
                  __typename: 'LandingPage',
                },
                __typename: 'Route',
              },
              __typename: 'Environment',
            },
          },
        },
      },
    ],
    [
      {
        input: {
          data: {
            environment: {
              routeByPath: {
                canonical: '/group/10/content/245642',
                preferred: '/latest',
                object: {
                  id: 'bm9kZToyMjQzMzE=',
                  title: 'Latest',
                  preferredUri: '/latest',
                  channel: null,
                  createDate: '2019-02-20T09:48:21',
                  metaKeywords: null,
                  __typename: 'Keyword',
                },
                __typename: 'Route',
              },
              __typename: 'Environment',
            },
          },
        },
      },
    ],
    [
      {
        input: {
          data: {
            environment: {
              routeByPath: {
                canonical: '/group/9/content/22802',
                preferred:
                  '/family/durfen-wir-kinder-durch-die-wiese-laufen-lassen',
                statusCode: 200,
                object: {
                  id: 'bm9kZToyMTg3OQ==',
                  nid: '21879',
                  title: 'Dürfen wir Kinder durch die Wiese laufen lassen?',
                  lead: 'Die Frühlingssonne lockt uns wieder nach draussen in die Natur, und gerade Kinder lieben es, barfuss durch die Wiesen zu hüpfen. Dürfen sie das noch oder sollten wir sie besser vor Zecken schützen? Wir haben bei der Expertin im Ostschweizer Kinderspital nachgefragt.',
                  shortTitle: ' ZECKENALARM',
                  changeDate: '2019-09-11T12:02:02',
                  publicationDate: '2002-02-02T02:02:02',
                  preferredUri:
                    '/family/durfen-wir-kinder-durch-die-wiese-laufen-lassen',
                  createDate: '2019-05-27T10:25:54',
                  metaKeywords:
                    'Zecken, Sommer, Wald, Naturschutzgebiete, Natur, Kinder, Sicherheit, Infektion, Insekten',
                  sponsor: {
                    id: 'bm9kZToxOTUzNg==',
                    title: 'Ochsner Sport',
                    __typename: 'Sponsor',
                  },
                  channel: {
                    id: 'dGF4b25vbXlfdGVybToyNTgx',
                    title: 'Family',
                    channelType: null,
                    settings: {
                      mainChannel: {
                        id: 'dGF4b25vbXlfdGVybToyNTgx',
                        title: 'Family',
                        __typename: 'Channel',
                      },
                      __typename: 'TermSettings',
                    },
                    subtypeValue: null,
                    authorPrefix: 'by',
                    showAuthorBox: false,
                    authors: {
                      edges: [],
                      __typename: 'AuthorConnection',
                    },
                    __typename: 'Article',
                  },
                  __typename: 'Article',
                },
                __typename: 'Environment',
              },
            },
          },
        },
      },
    ],
    [
      {
        input: {
          data: {
            routeByPath: {
              object: null,
            },
          },
        },
      },
    ],
    [
      {
        input: {
          data: {
            environment: null,
          },
        },
      },
    ],
    [
      {
        input: {
          data: {
            environment: {
              routeByPath: {
                object: null,
              },
            },
          },
        },
      },
    ],
    [
      {
        input: {
          articleId: '1',
          articleType: 'news',
          contentType: 'Article',
        },
      },
    ],
    [
      {
        input: {
          articleId: '1',
          articleType: 'news',
        },
      },
    ],
  ])('Should match the snapshot %#', (testData) => {
    // @ts-ignore
    expect(parseTrackingData(testData.input)).toMatchSnapshot();
  });
});
