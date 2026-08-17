import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../../../common/components/Picture';
import FullscreenButton from '../../../../../FullscreenButton';
import ImageCaption from '../../../ImageCaption';
import {
  IMAGE_FORMAT_DEFAULT,
  IMAGE_FORMAT_LANDSCAPE,
  IMAGE_FORMAT_PORTRAIT,
  IMAGE_FORMAT_SQUARE,
  STYLE_1X1_410,
  STYLE_1X1_495,
  STYLE_1X1_640,
  STYLE_2X3_360,
  STYLE_2X3_960,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../../../shared/constants/images';
import {
  TRACKING_CLASS_IMAGE_GALLERY_DETAIL_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import { IMAGE_GALLERY_DETAIL_SCREEN } from '../../../../../../screens/ImageGalleryArticle/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../../../common/assets/styles/sections.legacy.css';
import helpers from '../../../../../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import { ImageParagraphProps } from '../../typings';

type GalleryDetailImageParagraphPropsInner = ImageParagraphProps;

// Drupal image style mappings for all image formats
const FORMAT_STYLE_MAPPING = {
  [IMAGE_FORMAT_LANDSCAPE]: {
    style_320: STYLE_3X2_440,

    style_540: STYLE_3X2_770,
  },
  [IMAGE_FORMAT_PORTRAIT]: {
    style_320: STYLE_2X3_360,
    style_480: STYLE_2X3_960,
  },
  [IMAGE_FORMAT_SQUARE]: {
    style_320: STYLE_1X1_410,
    style_480: STYLE_1X1_495,
    style_540: STYLE_1X1_640,
    style_760: STYLE_1X1_495,
  },
};

const getFormatClasses = (format: string) => {
  switch (format) {
    case IMAGE_FORMAT_PORTRAIT:
    case IMAGE_FORMAT_SQUARE:
      return grid.ColXl12;

    default:
      return grid.ColXl19;
  }
};

const GalleryDetailImageParagraph = ({
  imageParagraph,
  origin,
  heroMediaParagraph,
}: GalleryDetailImageParagraphPropsInner): ReactElement => {
  if (!imageParagraph || !imageParagraph.image) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const imageFormat = imageParagraph.format || IMAGE_FORMAT_DEFAULT;
  const originalUrl =
    (imageParagraph.image?.showOriginal &&
      imageParagraph.image?.file?.origin) ||
    null;

  return (
    <div
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_IMAGE_GALLERY_DETAIL_PARAGRAPH,
        grid.Row,
      )}
      data-testid="gallerydetail-imageparagraph-wrapper"
    >
      <figure
        className={classNames(styles.Wrapper, {
          [styles.WrapperWithMargins]: !heroMediaParagraph,
        })}
      >
        <div
          className={classNames(
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
            getFormatClasses(imageParagraph.format),
            helpers.TextLineHeightZero,
          )}
        >
          <div className={styles.ImageInnerWrapper}>
            {!heroMediaParagraph && (
              <FullscreenButton
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                imageId={imageParagraph.id}
                origin={IMAGE_GALLERY_DETAIL_SCREEN}
              />
            )}

            {((imageParagraph?.image?.file?.relativeOriginPath ||
              originalUrl) && (
              <Picture
                /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
                url={originalUrl}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
                showOriginal={imageParagraph.image?.showOriginal}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                relativeOrigin={imageParagraph.image.file.relativeOriginPath}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointX={imageParagraph?.image?.file?.focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointY={imageParagraph?.image?.file?.focalPointY}
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                style_320={FORMAT_STYLE_MAPPING[imageFormat]?.style_320}
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                style_480={FORMAT_STYLE_MAPPING[imageFormat]?.style_480}
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                style_540={FORMAT_STYLE_MAPPING[imageFormat]?.style_540}
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                style_760={FORMAT_STYLE_MAPPING[imageFormat]?.style_760}
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                style_960={FORMAT_STYLE_MAPPING[imageFormat]?.style_960}
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                style_1680={FORMAT_STYLE_MAPPING[imageFormat]?.style_1680}
                alt={imageParagraph.image?.file?.alt || ''}
                className={classNames(sections.Section, {
                  [styles.ImageGalleryDetailMargin]:
                    origin === IMAGE_GALLERY_DETAIL_SCREEN,
                })}
              />
            )) ||
              null}
          </div>
        </div>

        <div
          className={classNames(grid.ColXs24, grid.ColXl5)}
          data-testid="gallerydetail-imageparagraph-caption-wrapper"
        >
          {!heroMediaParagraph &&
            (imageParagraph.caption || imageParagraph.image?.credit) && (
              <ImageCaption
                addClass={helpers.Margin0}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                caption={imageParagraph.caption}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                credit={imageParagraph.image?.credit}
                origin={origin}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
                suppressSource={imageParagraph.suppressSource}
              />
            )}
        </div>
      </figure>
    </div>
  );
};

export default GalleryDetailImageParagraph;
