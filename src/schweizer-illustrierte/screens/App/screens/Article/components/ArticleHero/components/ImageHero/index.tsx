import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../../../common/components/Picture';
import FullscreenButton from '../../../../../../components/FullscreenButton';
import ImageCaption from '../../../../../../components/Paragraphs/components/ImageCaption';
import {
  IMAGE_FORMAT_DEFAULT,
  IMAGE_FORMAT_LANDSCAPE,
  IMAGE_FORMAT_PORTRAIT,
  IMAGE_FORMAT_SQUARE,
  STYLE_1X1_410,
  STYLE_1X1_495,
  STYLE_1X1_660,
  STYLE_2X3_305,
  STYLE_2X3_360,
  STYLE_2X3_960,
  STYLE_3X2_1000,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../../../shared/constants/images';
import { TRACKING_CLASS_IMAGE_HERO_PARAGRAPH } from '../../../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import helpers from '../../../../../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import { ImageHeroProps } from './typings';

type ImageHeroPropsInner = ImageHeroProps;

// Drupal image style mappings for all image formats
const FORMAT_STYLE_MAPPING = {
  [IMAGE_FORMAT_LANDSCAPE]: {
    style_320: STYLE_3X2_440,
    style_480: STYLE_3X2_770,
    style_1680: STYLE_3X2_1000,
  },
  [IMAGE_FORMAT_PORTRAIT]: {
    style_320: STYLE_2X3_360,
    style_540: STYLE_2X3_960,
    style_760: STYLE_2X3_305,
    style_960: STYLE_2X3_960,
  },
  [IMAGE_FORMAT_SQUARE]: {
    style_320: STYLE_1X1_410,
    style_480: STYLE_1X1_495,
    style_760: STYLE_1X1_660,
  },
};

/**
 * returns the grid classes for an article hero with a given format
 *
 * this has been moved to a helper function because we need it for both the hero
 * image as well as the caption/credit, and each of those is in its own container
 */
export const getFormatClasses = (format: string): string => {
  switch (format) {
    case IMAGE_FORMAT_PORTRAIT:
      return [
        grid.ColSm14,
        grid.ColOffsetSm5,
        grid.ColXl10,
        grid.ColOffsetXl7,
      ].join(' ');

    case IMAGE_FORMAT_SQUARE:
      return [
        grid.ColSm20,
        grid.ColOffsetSm2,
        grid.ColXl14,
        grid.ColOffsetXl5,
      ].join(' ');

    case IMAGE_FORMAT_LANDSCAPE:
      return grid.ColSm24;

    default:
      return grid.ColSm24;
  }
};

const ImageHero = ({
  articleHeroImage,
}: ImageHeroPropsInner): ReactElement | null => {
  if (!articleHeroImage || Object.keys(articleHeroImage).length === 0) {
    return null;
  }

  const heroImageFormat: string =
    articleHeroImage.format || IMAGE_FORMAT_DEFAULT;
  const heroImagePath = articleHeroImage?.image?.file?.relativeOriginPath || '';
  const focalPointX = articleHeroImage?.image?.file?.focalPointX || null;
  const focalPointY = articleHeroImage?.image?.file?.focalPointY || null;
  const heroImageAlt = articleHeroImage?.image?.file?.alt || '';
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
  const imageStyles = FORMAT_STYLE_MAPPING[heroImageFormat];

  return (
    <>
      {heroImagePath && (
        <div
          className={classNames(
            TRACKING_CLASS_IMAGE_HERO_PARAGRAPH,
            grid.Container,
            styles.Wrapper,
          )}
          data-testid="articlehero-image"
        >
          {/* We only need the grid classes on screens larger than the XS viewport
            so we don't get any unwanted paddings or negative margins */}
          <div className={grid.Row}>
            <div className={classNames(getFormatClasses(heroImageFormat))}>
              <div className={styles.ImageWrapper}>
                <FullscreenButton
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                  imageId={articleHeroImage.id}
                  origin={'imageHeroArticleScreen'}
                />
                <Picture
                  relativeOrigin={heroImagePath}
                  focalPointX={focalPointX}
                  focalPointY={focalPointY}
                  alt={heroImageAlt}
                  className={styles.Image}
                  downloadPriority="high"
                  {...imageStyles}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={grid.Container}>
        <div
          className={classNames(
            styles.TextWrapper,
            getFormatClasses(heroImageFormat),
          )}
        >
          {(articleHeroImage.caption || articleHeroImage.image?.credit) && (
            <ImageCaption
              addClass={helpers.Margin0}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              caption={articleHeroImage.caption}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              credit={articleHeroImage.image?.credit}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              suppressSource={articleHeroImage.suppressSource}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ImageHero;
