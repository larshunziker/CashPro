import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../ImageCaption'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/scree */
import ImageCaption from '../ImageCaption';
import {
  STYLE_3X2_1000,
  STYLE_INLINE_IMAGE_1200,
} from '../../../../../../../shared/constants/images';
import { INFOBOX_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  TRACKING_CLASS_IMAGE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { ImageParagraphProps } from './typings';

const ImageParagraphComponent = ({
  imageParagraph,
  plainImage = false,
  origin = '',
  hideCaption = false,
}: ImageParagraphProps) => {
  if (!imageParagraph || !imageParagraph.image) {
    return null;
  }
  const originalUrl =
    (imageParagraph.image?.showOriginal &&
      imageParagraph.image?.file?.origin) ||
    null;

  const imgComp = (
    <Picture
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      url={originalUrl}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
      showOriginal={imageParagraph.image?.showOriginal}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      relativeOrigin={imageParagraph?.image?.file?.relativeOriginPath}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      focalPointX={imageParagraph?.image?.file?.focalPointX}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
      focalPointY={imageParagraph?.image?.file?.focalPointY}
      style_320={
        origin === INFOBOX_PARAGRAPH ? STYLE_3X2_1000 : STYLE_INLINE_IMAGE_1200
      }
      alt={imageParagraph?.image?.file?.alt || ''}
    />
  );

  const imgCompWithLink = imageParagraph.link && imageParagraph.link.path && (
    <Link path={imageParagraph.link.path} rel="noopener noreferrer">
      {imgComp}
    </Link>
  );

  if (!plainImage) {
    return (
      <>
        <div
          className={classNames(
            TRACKING_CLASS_PARAGRAPH,
            TRACKING_CLASS_IMAGE_PARAGRAPH,
            styles.ImageWrapper,
            {
              [styles.PortraitWrapper]:
                imageParagraph.image &&
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                imageParagraph.image.file.width &&
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                imageParagraph.image.file.height &&
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                imageParagraph.image.file.width <
                  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                  imageParagraph.image.file.height,
            },
          )}
        >
          {imgCompWithLink || imgComp}
        </div>
        {!hideCaption && imageParagraph.caption && (
          <ImageCaption
            caption={imageParagraph.caption}
            suppressSource={imageParagraph.suppressSource}
          />
        )}
      </>
    );
  }

  return imgCompWithLink || imgComp;
};

export default ImageParagraphComponent;
