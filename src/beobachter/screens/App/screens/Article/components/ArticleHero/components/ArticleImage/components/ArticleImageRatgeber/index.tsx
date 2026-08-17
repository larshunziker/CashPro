import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../../../../../common/components/Picture';
import AuthorDateBlock from '../../../../../../../../components/AuthorDateBlock';
import FullscreenButton from '../../../../../../../../components/FullscreenButton';
import ImageCaption from '../../../../../../../../components/Paragraphs/components/ImageCaption';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../../../../../common/screens/PageTemplate/constants';
import {
  IMAGE_FORMAT_PORTRAIT,
  STYLE_16X9_360,
  STYLE_16X9_560,
  STYLE_3X4_960,
} from '../../../../../../../../../../../shared/constants/images';
import { TRACKING_CLASS_CONTENT_HERO } from '../../../../../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleImageRatgeberProps } from './typings';

type ArticleImageRatgeberPropsInner = ArticleImageRatgeberProps & {
  children: ReactNode;
};

const ArticleImageRatgeber = ({
  article,
  children,
  pageLayoutType,
}: ArticleImageRatgeberPropsInner): ReactElement => {
  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    pageLayoutType,
  );

  const heroImageBody = article?.heroImageBody?.[0] as ImageParagraph;
  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Image> | undefined' is not assignable to type 'Image'. */
  const heroImage: Image = heroImageBody?.image;

  const relativeOriginPath =
    article?.heroImageBody &&
    Array.isArray(article.heroImageBody) &&
    heroImage?.credit &&
    heroImage?.file?.relativeOriginPath;

  const caption = heroImageBody?.caption || '';
  const credit =
    (article.heroImageBody &&
      Array.isArray(article.heroImageBody) &&
      heroImage?.credit) ||
    '';

  const focalPointX = heroImage?.file?.focalPointX;
  const focalPointY = heroImage?.file?.focalPointY;
  const altText = heroImage?.file?.alt || article?.title || '';
  const suppressSource = heroImageBody?.suppressSource;
  const isPortrait = heroImageBody?.format === IMAGE_FORMAT_PORTRAIT;

  return (
    <div className="article-image">
      <div className={styles.OnImageContent}>
        <div className={grid.Container}>{children}</div>
      </div>
      {relativeOriginPath && (
        <>
          <div
            className={classNames({
              [styles.Container]: !isSplittedPageLayout,
            })}
          >
            {/* @ts-ignore TODO: TS2322 ->  Type 'Article' is not assignable to type '{ authors? */}
            <AuthorDateBlock article={article} />
            <div className={styles.Row}>
              <div
                className={classNames({
                  [grid.ColXs24]: !isPortrait,
                  [grid.ColXl12]: isPortrait,
                  [grid.ColOffsetXl6]: isPortrait,
                  [grid.ColMd20]: isPortrait,
                  [grid.ColOffsetMd2]: isPortrait,
                  [grid.ColSm14]: isPortrait,
                  [grid.ColOffsetSm5]: isPortrait,
                })}
              >
                <div
                  className={classNames(
                    TRACKING_CLASS_CONTENT_HERO,
                    styles.TeaserImageWrapper,
                  )}
                  itemProp="image"
                  itemScope
                  itemType="http://schema.org/ImageObject"
                >
                  <FullscreenButton
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                    imageId={heroImageBody.id}
                    origin={'imageHeroArticleScreen'}
                  />
                  <Picture
                    relativeOrigin={relativeOriginPath}
                    alt={altText}
                    style_320={isPortrait ? STYLE_3X4_960 : STYLE_16X9_360}
                    style_540={isPortrait ? STYLE_3X4_960 : STYLE_16X9_560}
                    style_1680={isPortrait ? STYLE_3X4_960 : STYLE_16X9_560}
                    /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                    focalPointX={focalPointX}
                    /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                    focalPointY={focalPointY}
                    downloadPriority="high"
                    useIntrinsicSizes={true}
                  />
                  {credit && (
                    <div className={styles.CaptionContainer}>
                      <ImageCaption
                        credit={credit}
                        caption={caption}
                        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
                        suppressSource={suppressSource}
                        sourceDescription={'Bild:'}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleImageRatgeber;
