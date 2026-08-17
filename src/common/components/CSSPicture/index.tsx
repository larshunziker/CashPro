import React from 'react';
import { useSelector } from 'react-redux';
import {
  assembleAkamaiImgUrl,
  getWidthAndHeightByImageStyle,
} from '../Picture/helpers';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { CSSPictureProps } from './typings';

// generate a hash from input, prefixed with "css-" to make sure its a valid css className
export const getCssClassNameFromString = (string: string) => {
  let h = 0;
  for (let i = 0; i < string.length; i++)
    h = (Math.imul(31, h) + string.charCodeAt(i)) | 0;
  return `css-${h}`;
};

type GetCssOptions = {
  style_320: string;
  style_480: string;
  style_540: string;
  style_760: string;
  style_960: string;
  style_1680: string;
  classNameIdentifier: string;
  relativeOriginPath: string;
  clientUrl?: string;
  focalPointX?: number;
  focalPointY?: number;
};

const getCss = ({
  style_320,
  style_480,
  style_540,
  style_760,
  style_960,
  style_1680,
  classNameIdentifier,
  relativeOriginPath,
  clientUrl,
  focalPointX,
  focalPointY,
}: GetCssOptions) => {
  const initialImageStyles = {
    320: style_320,
    480: style_480,
    540: style_540,
    760: style_760,
    960: style_960,
    1680: style_1680,
  };

  // filter out all falsy image style values
  const imageStyles = {};
  for (const style in initialImageStyles) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 320 */
    if (Boolean(initialImageStyles[style])) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 320 */
      imageStyles[style] = initialImageStyles[style];
    }
  }

  let mediaQueryCss = '';

  Object.keys(imageStyles).forEach((item) => {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
    const { width, height } = getWidthAndHeightByImageStyle(imageStyles[item]);
    if (item === '320') {
      return;
    }

    mediaQueryCss += `
    @media (min-width: ${item}px) {
      .${classNameIdentifier} {
        background-image: url(${assembleAkamaiImgUrl({
          relativeOriginPath,
          width,
          height,
          focalPointX: focalPointX || 0,
          focalPointY: focalPointY || 0,
          clientUrl,
        })})
      }
    }
    `;
  });

  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"320"' can't be used to index type '{}'. */
  const { width, height } = getWidthAndHeightByImageStyle(imageStyles['320']);
  const css = `
  .${classNameIdentifier} {
    background-image: url(${assembleAkamaiImgUrl({
      relativeOriginPath,
      width,
      height,
      focalPointX: focalPointX || 0,
      focalPointY: focalPointY || 0,
      clientUrl,
    })})
  }
    ${mediaQueryCss}
  `;

  return css;
};

const CSSPicture = ({
  children,
  relativeOriginPath,
  style_320,
  style_480 = '',
  style_540 = '',
  style_760 = '',
  style_960 = '',
  style_1680 = '',
  focalPointX,
  focalPointY,
}: CSSPictureProps) => {
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );
  if (!relativeOriginPath) {
    return children({ className: '' });
  }

  const className = getCssClassNameFromString(
    relativeOriginPath +
      style_320 +
      style_480 +
      style_540 +
      style_760 +
      style_960 +
      style_1680,
  );

  return (
    <>
      <style>
        {getCss({
          style_320,
          style_480,
          style_540,
          style_760,
          style_960,
          style_1680,
          classNameIdentifier: className,
          relativeOriginPath,
          clientUrl,
          focalPointX,
          focalPointY,
        })}
      </style>
      {children({ className })}
    </>
  );
};

export default CSSPicture;
