/**
 * @file   Renders an inline image
 * @date   2016-07-11
 */

import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import ImageCaption from '../ImageCaption';
import { STYLE_INLINE_IMAGE_1200 } from '../../../../../../../shared/constants/images';
import { MULTI_COLUMNS_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  TRACKING_CLASS_IMAGE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { ImageParagraphProps } from './typings';

export type ImageParagraphPropsInner = ImageParagraphProps;

const ImageParagraphComponent = ({
  imageParagraph,
  plainImage = false,
  origin,
  hideCaption,
  heroMediaParagraph,
}: ImageParagraphPropsInner): ReactElement => {
  if (!imageParagraph || !imageParagraph.image) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  const originalUrl =
    (imageParagraph.image?.showOriginal &&
      imageParagraph.image?.file?.origin) ||
    null;

  let imgComp: ReactElement = (
    <Picture
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      url={originalUrl}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
      showOriginal={imageParagraph.image?.showOriginal}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      relativeOrigin={imageParagraph.image.file.relativeOriginPath}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      focalPointX={imageParagraph.image.file.focalPointX}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      focalPointY={imageParagraph.image.file.focalPointY}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      alt={imageParagraph.image.file.alt}
      style_320={STYLE_INLINE_IMAGE_1200}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      width={imageParagraph?.image?.file?.width}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      height={imageParagraph?.image?.file?.height}
    />
  );

  if (imageParagraph.link && imageParagraph.link.path) {
    /* @ts-ignore TODO: TS2322 ->  Type '{ children */
    imgComp = <Link {...imageParagraph.link}>{imgComp}</Link>;
  }

  imgComp =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    (imageParagraph?.image?.file?.width < imageParagraph?.image?.file?.height &&
      origin !== MULTI_COLUMNS_PARAGRAPH &&
      !imageParagraph.fullWidth && (
        <div
          className={classNames(
            heroMediaParagraph
              ? styles.PortraitWrapperHeroMedia
              : styles.PortraitWrapper,
          )}
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
          styles.ImageWrapper,
        )}
        data-testid="image-paragraph-wrapper"
      >
        {imgComp}
        {!hideCaption && (
          <div className={styles.ImageCaptionWrapper}>
            <ImageCaption
              origin={origin}
              caption={imageParagraph.caption || ''}
              credit={imageParagraph.image?.credit || ''}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              suppressSource={imageParagraph.suppressSource}
            />
          </div>
        )}
      </div>
    );
  }

  return imgComp;
};

export default ImageParagraphComponent;
