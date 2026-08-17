import {
  assembleAkamaiImgUrl,
  getImageFormatForPlaceholderCss,
} from '../helpers';
import {
  STYLE_1X1_660,
  STYLE_2X1_1280,
  STYLE_3X2_1000,
  STYLE_3X2_440,
  STYLE_BANNER_SMALL,
  STYLE_HEADER_16_9,
  STYLE_HEADER_16_9_LARGE,
  STYLE_SCALEW_800,
  STYLE_TEASER_1_1,
  STYLE_TEASER_3_2_LARGE,
  STYLE_TEASER_S_760,
} from '../../../../shared/constants/images';

describe('[Picture] helpers', () => {
  test.each`
    imageStyle                 | imageFormat
    ${STYLE_1X1_660}           | ${'1x1'}
    ${STYLE_TEASER_1_1}        | ${'1x1'}
    ${STYLE_TEASER_3_2_LARGE}  | ${'3x2'}
    ${STYLE_3X2_1000}          | ${'3x2'}
    ${STYLE_3X2_440}           | ${'3x2'}
    ${STYLE_HEADER_16_9_LARGE} | ${'16x9'}
    ${''}                      | ${undefined}
    ${STYLE_TEASER_S_760}      | ${undefined}
    ${'invalid-image-style'}   | ${undefined}
    ${STYLE_BANNER_SMALL}      | ${undefined}
    ${STYLE_SCALEW_800}        | ${undefined}
    ${STYLE_HEADER_16_9}       | ${'16x9'}
    ${STYLE_2X1_1280}          | ${'2x1'}
  `(
    'Should return the imageformat = $imageFormat for imageStyle = $imageStyle',
    ({ imageStyle, imageFormat }) => {
      expect(getImageFormatForPlaceholderCss(imageStyle)).toBe(imageFormat);
    },
  );

  it('Should return empty image url when there is no relativeOriginPath', () => {
    expect(
      assembleAkamaiImgUrl({
        relativeOriginPath: '',
        width: 200,
        height: 200,
        focalPointX: 500,
        focalPointY: 500,
      }),
    ).toBe('');
  });

  test.each([
    {
      clientUrl: 'https://www.tele.ch',
      result: '/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'htts://stage.cash.ch',
      result: '/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://develop.beobachter.ch',
      result: '/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://master.pme.ch',
      result: '/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://preview.stage.publication.ch',
      result: '/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://preview.gaultimillau.ch',
      result: '/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://performance.handelszeitung.ch',
      result: '/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'http://localhost:3000',
      result:
        'https://cdn.stage.ras.dev/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://nginx.pr-1111.publication-k8s.develop.ras.dev/',
      result:
        'https://cdn.stage.ras.dev/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
  ])(
    'Should return [$result] when client url is [$clientUrl]',
    ({ clientUrl, result }: any) => {
      // @ts-ignore
      __DOT_ENV__ = 'stage';
      expect(
        assembleAkamaiImgUrl({
          clientUrl,
          relativeOriginPath: 'some-photo.jpg',
          width: 200,
          height: 200,
          focalPointX: 500,
          focalPointY: 500,
        }),
      ).toStrictEqual(result);
    },
  );

  test.each([
    {
      clientUrl: 'https://www.tele.ch',
      result:
        'https://www.tele.ch/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'htts://stage.cash.ch',
      result:
        'htts://stage.cash.ch/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://develop.beobachter.ch',
      result:
        'https://develop.beobachter.ch/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://master.pme.ch',
      result:
        'https://master.pme.ch/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://preview.stage.publication.ch',
      result:
        'https://preview.stage.publication.ch/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://preview.gaultimillau.ch',
      result:
        'https://preview.gaultimillau.ch/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://performance.handelszeitung.ch',
      result:
        'https://performance.handelszeitung.ch/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'http://localhost:3000',
      result:
        'https://cdn.dev.ras.dev/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: 'https://nginx.pr-1111.publication-k8s.develop.ras.dev/',
      result:
        'https://cdn.dev.ras.dev/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
    {
      clientUrl: '',
      result: '/fp/200/200/500/500/sites/default/filessome-photo.jpg',
    },
  ])(
    'Should return [$result] when clientUrl is [$clientUrl] and enforceAbsoluteUrl flag is set to true',
    ({ clientUrl, result }: any) => {
      // @ts-ignore
      __DOT_ENV__ = 'develop';
      expect(
        assembleAkamaiImgUrl({
          clientUrl,
          relativeOriginPath: 'some-photo.jpg',
          width: 200,
          height: 200,
          focalPointX: 500,
          focalPointY: 500,
          enforceAbsoluteUrl: true,
        }),
      ).toStrictEqual(result);
    },
  );
});
