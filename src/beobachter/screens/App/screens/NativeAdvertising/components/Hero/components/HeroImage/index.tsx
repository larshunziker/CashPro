/**
 *
 */

import React from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../../../common/components/Picture';
import FullscreenButton from '../../../../../../components/FullscreenButton';
import ImageCaption from '../../../../../../components/Paragraphs/components/ImageCaption';
import {
  IMAGE_FORMAT_PORTRAIT,
  STYLE_16X9_1130,
  STYLE_16X9_560,
  STYLE_16X9_700,
  STYLE_16X9_890,
  STYLE_3X4_960,
} from '../../../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import { HeroImageProps } from './typings';

const HeroImage = ({ node }: HeroImageProps) => {
  const heroImageBody = node?.heroImageBody?.[0] as ImageParagraph;
  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Image> | undefined' is not assignable to type 'Image'. */
  const heroImage: Image = heroImageBody?.image;

  const relativeOriginPath =
    node?.heroImageBody &&
    Array.isArray(node.heroImageBody) &&
    heroImage?.credit &&
    heroImage?.file?.relativeOriginPath;

  const caption = heroImageBody?.caption || '';
  const credit =
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    (node.heroImageBody &&
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      Array.isArray(node.heroImageBody) &&
      heroImage?.credit) ||
    '';

  const focalPointX = heroImage?.file?.focalPointX || null;
  const focalPointY = heroImage?.file?.focalPointY || null;
  const altText = heroImage?.file?.alt || node?.title || '';
  const suppressSource = heroImageBody?.suppressSource;
  const isPortrait = heroImageBody?.format === IMAGE_FORMAT_PORTRAIT;

  if (!relativeOriginPath) {
    return null;
  }

  return (
    <>
      <div className={styles.Wrapper}>
        <div className={grid.Row}>
          <div
            className={classNames({
              [grid.ColXs24]: !isPortrait,
              [grid.ColMd16]: isPortrait,
              [grid.ColOffsetMd4]: isPortrait,
              [grid.ColSm20]: isPortrait,
              [grid.ColOffsetSm2]: isPortrait,
            })}
          >
            <div className={styles.ImageWrapper}>
              <FullscreenButton
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                imageId={heroImageBody.id}
                origin="imageHeroArticleScreen"
              />

              <Picture
                relativeOrigin={relativeOriginPath}
                alt={altText}
                className={styles.Image}
                style_320={isPortrait ? STYLE_3X4_960 : STYLE_16X9_560}
                style_480={isPortrait ? STYLE_3X4_960 : STYLE_16X9_560}
                style_540={isPortrait ? STYLE_3X4_960 : STYLE_16X9_560}
                style_760={isPortrait ? STYLE_3X4_960 : STYLE_16X9_700}
                style_960={isPortrait ? STYLE_3X4_960 : STYLE_16X9_890}
                style_1680={isPortrait ? STYLE_3X4_960 : STYLE_16X9_1130}
                title={node?.teaserImage?.title || ''}
                /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                focalPointX={focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                focalPointY={focalPointY}
                downloadPriority="high"
                useIntrinsicSizes
              />

              {credit && (
                <div className={styles.CaptionContainer}>
                  <ImageCaption
                    credit={credit}
                    caption={caption}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
                    suppressSource={suppressSource}
                    sourceDescription="Bild:"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const HeroImageWrapper = (props) => <HeroImage {...props} />;

export default HeroImageWrapper;
