import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import { mergeClasses } from '../../../../../../../shared/helpers/mergeClasses';
import FullscreenButton from '../../../FullscreenButton';
import ImageCaption from '../ImageCaption';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import {
  TRACKING_CLASS_IMAGE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import { MULTI_COLUMNS_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  STYLE_16X9_1180,
  STYLE_3X4_960,
  STYLE_INLINE_IMAGE_1200,
} from '../../../../../../../shared/constants/images';
import { CANNOT_SHOW_IMAGE_MESSAGE, FALLBACK_IMAGE_URL } from './constants';
import { ARTICLE_TYPE_RATGEBER } from '../../../../../../../shared/constants/content';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ImageParagraphProps } from './typings';

export type ImageParagraphPropsInner = ImageParagraphProps & {
  heroMediaParagraph?: boolean;
};

const ImageParagraph = ({
  imageParagraph,
  plainImage = false,
  origin = '',
  heroMediaParagraph,
  ...props
}: ImageParagraphPropsInner): ReactElement => {
  if (!imageParagraph || !imageParagraph.image) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  const originalUrl =
    (imageParagraph.image?.showOriginal &&
      imageParagraph.image?.file?.origin) ||
    null;

  const isPortrait =
    imageParagraph.format === 'portrait' ||
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    (imageParagraph?.image?.file?.width < imageParagraph?.image?.file?.height &&
      !imageParagraph.fullWidth);

  const isInLongFormArticle = isInLongFormArticleBody(origin);

  const landscapeFormat = isInLongFormArticle
    ? STYLE_16X9_1180
    : STYLE_INLINE_IMAGE_1200;

  const imgStyle = isPortrait ? STYLE_3X4_960 : landscapeFormat;
  let imgComp = imageParagraph.image.credit ? (
    <Picture
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      url={originalUrl}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
      showOriginal={imageParagraph.image?.showOriginal}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      relativeOrigin={imageParagraph.image?.file?.relativeOriginPath}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
      alt={imageParagraph.image?.file?.alt}
      style_320={imgStyle}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      width={imageParagraph?.image?.file?.width}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      height={imageParagraph?.image?.file?.height}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      focalPointX={imageParagraph.image?.file?.focalPointX}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      focalPointY={imageParagraph.image?.file?.focalPointY}
    />
  ) : (
    <Picture
      url={FALLBACK_IMAGE_URL}
      alt={CANNOT_SHOW_IMAGE_MESSAGE}
      style_320={imgStyle}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      width={imageParagraph?.image?.file?.width}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      height={imageParagraph?.image?.file?.height}
    />
  );

  if (!heroMediaParagraph) {
    imgComp = (
      <div
        className={classNames(styles.ImageWrapper, {
          [styles.LongReadLandscapeImage]: isInLongFormArticle && !isPortrait,
        })}
      >
        {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */}
        <FullscreenButton imageId={imageParagraph.id} origin={origin} />{' '}
        {imgComp}
      </div>
    );
  }

  if (imageParagraph.link && imageParagraph.link.path) {
    /* @ts-ignore TODO: TS2322 ->  Type '{ children */
    imgComp = <Link {...imageParagraph.link}>{imgComp}</Link>;
  }

  const isPortraitImage = isPortrait && origin !== MULTI_COLUMNS_PARAGRAPH;

  imgComp =
    (isPortraitImage && (
      <div
        className={classNames(styles.PortraitWrapper, {
          [styles.PortraitWrapperHeroMedia]: heroMediaParagraph,
          [styles.LongReadImage]: isInLongFormArticle,
        })}
      >
        {imgComp}
      </div>
    )) ||
    imgComp;

  if (!plainImage) {
    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_IMAGE_PARAGRAPH,
          styles.Wrapper,
          {
            [mergeClasses([grid.ColXl18, grid.ColOffsetXl3])]:
              origin === ARTICLE_TYPE_RATGEBER,
            [mergeClasses([grid.ColSm20, grid.ColOffsetSm2])]:
              !isPortrait && isInLongFormArticle,
            [mergeClasses([
              grid.ColXs18,
              grid.ColOffsetXs3,
              grid.ColOffsetSm4,
              grid.ColSm16,
              grid.ColOffsetMd6,
              grid.ColMd12,
            ])]: isPortrait && isInLongFormArticle,
          },
        )}
      >
        {imageParagraph.title && (
          <h2 className={styles.Title}>{imageParagraph.title}</h2>
        )}
        <div
          className={classNames(styles.ImageWrapper, {
            [styles.LongReadLandscapeImage]: isInLongFormArticle && !isPortrait,
          })}
        >
          {imgComp}
          {!props.hideCaption && imageParagraph.image?.credit && (
            <ImageCaption
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              caption={imageParagraph.caption}
              credit={imageParagraph.image?.credit || ''}
              origin={origin}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              suppressSource={imageParagraph.suppressSource}
              addClass={classNames({
                [styles.LongReadImageCaption]: isInLongFormArticle,
                [styles.PortraitCaption]: isPortraitImage,
              })}
            />
          )}
        </div>
      </div>
    );
  }

  return imgComp;
};

export default ImageParagraph;
