/**
 * @file   createVideoObjectJsonLd test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-16 14:16:52
 */

import createVideoObjectJsonLd from '../createVideoObjectJsonLd';

describe('[Function] createVideoObjectJsonLd', () => {
  beforeAll(() => {
    global.locationOrigin = 'https://www.schweizer-illustrierte.ch';
  });
  it.each([
    [{ video: {}, imgUrl: '', thumbUrl: '' }],
    [{ video: null, imgUrl: '', thumbUrl: '' }],
    [
      {
        video: {
          id: 'bm9kZToyNDU3MQ==',
          title: 'Chocolate-Chip-Cookies',
          preferredUri:
            '/videoblogs/frey-style/videos/mmmm-lecker-chocolate-chip-cookies',
          shortTitle: 'Mmmm lecker...',
          changeDate: '2019-09-04T16:46:34',
          metaDescription: 'lecker 🍪',
          metaKeywords: null,
          metaTitle: 'Chocolate-Chip-Cookies | Schweizer Illustrierte',
          caption: 'lecker 🍪',
          publicationDate: '2019-09-04T16:47:17',
          brightcoveId: '6082555596001',
          credit: 'Brightcove',
          teaserImage: {
            id: 'new-stmmf8G1',
            image: {
              file: {
                alt: 'Chocolate-Chip-Cookies',
                relativeOriginPath:
                  '/media/field_image/2019-09/chocolate-chip-cookies.jpg',
                __typename: 'ImageFile',
              },
              __typename: 'Image',
            },
            __typename: 'ImageParagraph',
          },
          __typename: 'Video',
        },
        imgUrl: 'img.jpg',
        thumbUrl: 'thumb.jpg',
      },
    ],
  ])('Should match the snapshot %#', (testData) => {
    expect(
      createVideoObjectJsonLd(
        testData.video,
        testData.imgUrl,
        testData.thumbUrl,
      ),
    ).toMatchSnapshot();
  });

  it('Should include embedUrl when provided', () => {
    expect(
      createVideoObjectJsonLd(
        {
          id: 'bm9kZToyNDU3MQ==',
          title: 'Chocolate-Chip-Cookies',
          jwPlayerId: 'xY9kL2mN',
        },
        'img.jpg',
        'thumb.jpg',
        'https://cdn.jwplayer.com/libraries/xhoEGaS8-xY9kL2mN.js',
      ),
    ).toMatchObject({
      embedUrl: 'https://cdn.jwplayer.com/libraries/xhoEGaS8-xY9kL2mN.js',
    });
  });
});
