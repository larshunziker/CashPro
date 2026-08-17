import React from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import CSSPicture from '../../../CSSPicture';
import Picture from '../../../Picture';
import {
  STYLE_3X2_770,
  STYLE_HEADER_16_9_LARGE,
} from '../../../../../shared/constants/images';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_PARALLAX_IMAGE_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import grid from '../../../../assets/styles/grid.legacy.css';
import {
  ParallaxImageParagraphFactoryOptions,
  ParallaxImageParagraphFactoryOptionsStyles,
  ParallaxImageParagraphProps,
} from './typings';

type ParallaxImageParagraphPropsInner = ParallaxImageParagraphProps;

export default ({
  styles: appStyles,
  language = 'de',
}: ParallaxImageParagraphFactoryOptions) => {
  const ParallaxImageParagraph = (props: ParallaxImageParagraphPropsInner) => {
    const {
      parallaxImageParagraph,
      isSplittedPageLayout = false,
      hasWiderGrid = false,
    } = props;
    if (!parallaxImageParagraph?.image?.file?.relativeOriginPath) {
      return null;
    }

    const suppressSource = !!parallaxImageParagraph?.suppressSource;
    const defaultStyles = {
      CreditsTitle: '',
      ImageDefault: '',
      Parallax: '',
    };

    const getStyles = (): ParallaxImageParagraphFactoryOptionsStyles => {
      const styles: ParallaxImageParagraphFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;
      return styles;
    };

    const styles = getStyles();

    const creditElement = (
      <span className={styles.CreditsTitle}>
        {language === 'de' ? 'Foto' : 'Photo'}:{' '}
        {parallaxImageParagraph?.image?.credit}
      </span>
    );

    return (
      <>
        <div className={grid.HiddenMdUp}>
          <TestFragment data-testid="mobile-parallax-image">
            <Picture
              relativeOrigin={
                parallaxImageParagraph.image.file.relativeOriginPath
              }
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={parallaxImageParagraph.image.file.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={parallaxImageParagraph.image.file.focalPointY}
              alt={parallaxImageParagraph?.image?.file?.alt || ''}
              className={styles.ImageDefault}
              style_320={
                (hasWiderGrid && STYLE_HEADER_16_9_LARGE) || STYLE_3X2_770
              }
              style_960={STYLE_HEADER_16_9_LARGE}
            />
            {parallaxImageParagraph?.image?.credit &&
              !suppressSource &&
              creditElement}
          </TestFragment>
        </div>
        <div className={grid.HiddenMdDown}>
          <CSSPicture
            relativeOriginPath={
              parallaxImageParagraph.image.file.relativeOriginPath
            }
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointX={parallaxImageParagraph?.image?.file?.focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointY={parallaxImageParagraph?.image?.file?.focalPointY}
            style_320={
              (hasWiderGrid && STYLE_HEADER_16_9_LARGE) || STYLE_3X2_770
            }
            style_960={STYLE_HEADER_16_9_LARGE}
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
                  {parallaxImageParagraph?.image?.credit && !suppressSource && (
                    <div
                      className={classNames({
                        [grid.Container]: !isSplittedPageLayout,
                      })}
                    >
                      <div
                        className={classNames({
                          [grid.Row]: !isSplittedPageLayout,
                        })}
                      >
                        {creditElement}
                      </div>
                    </div>
                  )}
                </>
              );
            }}
          </CSSPicture>
        </div>
      </>
    );
  };

  return ParallaxImageParagraph;
};
