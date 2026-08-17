/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import CSSPicture from '../../../../../../../common/components/CSSPicture';
import Picture from '../../../../../../../common/components/Picture';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import {
  STYLE_3X2_770,
  STYLE_HEADER_16_9_LARGE,
} from '../../../../../../../shared/constants/images';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_PARALLAX_IMAGE_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import { ARTICLE_TYPE_RATGEBER } from '../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { ParallaxImageParagraphProps } from '../../../../../../../common/components/Paragraphs/components/ParallaxImageParagraph/typings';

type ParallaxImageParagraphPropsInner = ParallaxImageParagraphProps & {
  origin?: string;
};

const ParallaxImageParagraph = ({
  parallaxImageParagraph,
  origin,
}: ParallaxImageParagraphPropsInner) => {
  const paralaxImage = parallaxImageParagraph?.image;
  /* @ts-ignore TODO: TS2339 ->  Property 'credit' does not exist on type 'Maybe<Image> | undefined'. */
  /* @ts-ignore TODO: TS2339 ->  Property 'file' does not exist on type 'Maybe<Image> | undefined'. */
  const { credit, file } = paralaxImage;

  if (!file?.relativeOriginPath) {
    return null;
  }

  const isRatgeberArticle = origin === ARTICLE_TYPE_RATGEBER;

  const creditElement = (
    <span className={styles.CreditsTitle}>Foto: {credit}</span>
  );

  const pictureProps = {
    focalPointX: file?.focalPointX,
    focalPointY: file?.focalPointY,
    style_320: STYLE_3X2_770,
    style_960: STYLE_HEADER_16_9_LARGE,
  };

  return (
    <>
      <div
        className={classNames({
          [grid.HiddenMdUp]: !isRatgeberArticle,
        })}
      >
        <TestFragment data-testid="mobile-parallax-image">
          <Picture
            relativeOrigin={file.relativeOriginPath}
            alt={file?.alt || ''}
            className={styles.ImageDefault}
            {...pictureProps}
          />
          {credit && creditElement}
        </TestFragment>
      </div>
      <div
        className={classNames({
          [grid.HiddenMdDown]: !isRatgeberArticle,
          [styles.ParallaxContainer]: isRatgeberArticle,
        })}
      >
        <CSSPicture
          relativeOriginPath={file.relativeOriginPath}
          {...pictureProps}
        >
          {({ className }) => {
            return (
              <>
                <div
                  data-testid="desktop-parallax-image"
                  className={classNames(
                    TRACKING_CLASS_PARAGRAPH,
                    TRACKING_CLASS_PARALLAX_IMAGE_PARAGRAPH,
                    styles.Parallax,
                    className,
                  )}
                />
                {credit &&
                  (isRatgeberArticle ? (
                    <div>{creditElement}</div>
                  ) : (
                    <div className={grid.Container}>
                      <div className={grid.Row}>{creditElement}</div>
                    </div>
                  ))}
              </>
            );
          }}
        </CSSPicture>
      </div>
    </>
  );
};

export default ParallaxImageParagraph;
