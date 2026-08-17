import {
  createImgHostUrl,
  matchesLocalOrPRUrl,
} from '../../../shared/helpers/createImgHostUrl';
import { imageStylesMapping } from './imageStylesMapping';
import { DEFAULT_FOCALPOINT } from '../../../shared/constants/images';

/* @ts-ignore TODO: TS7006 ->  Parameter 'style' implicitly has an 'any' type. */
export const getWidthAndHeightByImageStyle = (style) => {
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ '16x9_1130' */
  const { width = 0, height = 0 } = imageStylesMapping?.[style] || {};
  return { width, height };
};

interface AkamaiUrlProps {
  relativeOriginPath: string;
  width?: number;
  height?: number;
  focalPointX?: number;
  focalPointY?: number;
  ignoreFocalPoint?: boolean;
  clientUrl?: string;
  enforceAbsoluteUrl?: boolean;
}

export const assembleAkamaiImgUrl = ({
  relativeOriginPath,
  clientUrl,
  width,
  height,
  focalPointX = DEFAULT_FOCALPOINT,
  focalPointY = DEFAULT_FOCALPOINT,
  ignoreFocalPoint = false,
  enforceAbsoluteUrl = false,
}: AkamaiUrlProps): string => {
  if (!relativeOriginPath) {
    return '';
  }

  let hostURL = clientUrl ? createImgHostUrl(clientUrl, __DOT_ENV__) : '';
  if (clientUrl && enforceAbsoluteUrl && !matchesLocalOrPRUrl(clientUrl)) {
    hostURL = clientUrl;
  }

  const relativeOriginWithPrefix = `/sites/default/files${relativeOriginPath}`;
  let url = '';

  if (
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    width > 0 &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    height > 0 &&
    !Number.isNaN(focalPointX) &&
    !Number.isNaN(focalPointY) &&
    focalPointX !== null &&
    focalPointY !== null &&
    focalPointX !== undefined &&
    focalPointY !== undefined
  ) {
    url = `${hostURL}/fp/${width}/${height}/${focalPointX}/${focalPointY}${relativeOriginWithPrefix}`;
  }
  // this is needed for the uploaded icons in the advantages item Paragraph
  else if (ignoreFocalPoint) {
    url = `${hostURL}${relativeOriginWithPrefix}`;
  } else {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    if (width > 0) {
      url = `${hostURL}/sw/${width}${relativeOriginWithPrefix}`;
    } else {
      url = `${hostURL}/sh/${height}${relativeOriginWithPrefix}`;
    }
  }
  return url;
};

export type ImageStylesConfigObject = {
  320?: string;
  480?: string;
  540?: string;
  760?: string;
  960?: string;
  1680?: string;
};

export type ImageInfo = {
  src: string;
  width: number;
};

export type ImageObject = {
  [key: string]: ImageInfo;
  // 320?: ImageInfo;
  // 480?: ImageInfo;
  // 540?: ImageInfo;
  // 760?: ImageInfo;
  // 960?: ImageInfo;
  // 1680?: ImageInfo;
};

type ImageObjects = {
  sources: ImageObject;
};

type generateImageObjectOptions = {
  imageStyles: ImageStylesConfigObject;
  relativeOrigin: string;
  focalPointX?: number;
  focalPointY?: number;
  hasUrl: boolean;
  clientUrl?: string;
};

export const generateImageObject = ({
  imageStyles,
  relativeOrigin,
  focalPointX,
  focalPointY,
  hasUrl,
  clientUrl,
}: generateImageObjectOptions): ImageObjects => {
  const imageObjects: ImageObjects = {
    sources: {},
  };

  if (!relativeOrigin || hasUrl) {
    return imageObjects;
  }

  for (const style in imageStyles) {
    const { width = 0, height = 0 } =
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ '16x9_1130' */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ImageObject'. */
      imageStylesMapping?.[imageStyles[style]] || {};

    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ImageObject'. */
    imageObjects.sources[style] = {
      src: assembleAkamaiImgUrl({
        relativeOriginPath: relativeOrigin,
        width,
        height,
        focalPointX,
        focalPointY,
        clientUrl,
      }),
      width,
    };
  }

  return imageObjects;
};

export const getImageStyles = (
  imageFormat: string,
  FORMAT_STYLE_MAPPING: Record<string, any>,
) => {
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  const newImageStyles: ImageStylesObject = { style_320: null };
  const imageStyles = [
    'style_320',
    'style_480',
    'style_540',
    'style_760',
    'style_960',
    'style_1680',
  ];

  if (!FORMAT_STYLE_MAPPING[imageFormat]) {
    if (__DEVELOPMENT__) {
      // eslint-disable-next-line no-console
      console.log(
        `getImageStyles: imageFormat "${imageFormat}" not found in FORMAT_STYLE_MAPPING`,
      );
    }
    return;
  }

  FORMAT_STYLE_MAPPING[imageFormat].forEach(
    (imageStyle: string, index: number) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ImageStylesObject */
      newImageStyles[imageStyles[index]] = imageStyle;
    },
  );
  return newImageStyles;
};

type GetImageFormatForPlaceholderCssReturnType =
  | '1x1'
  | '1x2'
  | '2x1'
  | '2x3'
  | '3x2'
  | '8x3'
  | '16x9'
  | undefined;

/**
 *
 * @param format string of image style
 * @description This function returns an aspect ratio in form of (1x1, 2x3, etc) if a substring of the passed imageStyle matches a key in the whitelistedFormats object. There is probably be an easier way to achive this, but since there are some legacy imageStyle names, it makes it hard to parse them.
 * @returns imageFomart (which is an aspect ratio e.g. 16x9 or 1x1)
 */
export const getImageFormatForPlaceholderCss = (imageStyle: string) => {
  const whitelistedFormats = {
    '1x1_': '1x1',
    teaser_1_1: '1x1',
    '2x3_': '2x3',
    '3x2_': '3x2',
    teaser_3_2: '3x2',
    '8x3_': '8x3',
    '1x2_': '1x2',
    '16x9_': '16x9',
    header_16_9: '16x9',
    '2x1_': '2x1',
  };

  const foundKey = Object.keys(whitelistedFormats).find((key) =>
    imageStyle.includes(key),
  );

  if (!foundKey) {
    return undefined; // because of line 110 in this file
  }

  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ '1x1_' */
  return whitelistedFormats[
    foundKey
  ] as GetImageFormatForPlaceholderCssReturnType;
};
