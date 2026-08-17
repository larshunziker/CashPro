import React from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../../../common/components/Picture';
import FullscreenButton from '../../../../../../components/FullscreenButton';
import { ANCHOR_HERO } from '../../../../../../../../../shared/constants/content';
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

/* @ts-ignore TODO: TS7031 ->  Binding element 'article' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const ImageHero = ({ article, origin }) => {
  if (!article?.heroImageBody[0].image?.file?.relativeOriginPath) {
    return;
  }

  const shouldDisplayImageCredit =
    !Array.isArray(article?.heroImageBody) ||
    !article?.heroImageBody[0].suppressSource;

  const isPortrait = article?.heroImageBody[0].format === IMAGE_FORMAT_PORTRAIT;

  return (
    <div className={grid.Container}>
      <div className={grid.Row}>
        <div
          className={classNames(grid.ColXs24, {
            [classNames(
              grid.ColMd16,
              grid.ColOffsetMd4,
              grid.ColSm20,
              grid.ColOffsetSm2,
            )]: isPortrait,
          })}
        >
          <figure
            id={ANCHOR_HERO}
            className={styles.HeroImage}
            data-testid="longreadheader-authordate-wrapper"
          >
            <Picture
              downloadPriority="high"
              relativeOrigin={
                article.heroImageBody[0].image.file.relativeOriginPath
              }
              focalPointX={article.heroImageBody[0].image.file.focalPointX}
              focalPointY={article.heroImageBody[0].image.file.focalPointY}
              alt={article?.heroImageBody[0].image?.file?.alt || ''}
              title={article?.heroImageBody[0].title || ''}
              style_320={isPortrait ? STYLE_3X4_960 : STYLE_16X9_560}
              style_480={isPortrait ? STYLE_3X4_960 : STYLE_16X9_560}
              style_540={isPortrait ? STYLE_3X4_960 : STYLE_16X9_560}
              style_760={isPortrait ? STYLE_3X4_960 : STYLE_16X9_700}
              style_960={isPortrait ? STYLE_3X4_960 : STYLE_16X9_890}
              style_1680={isPortrait ? STYLE_3X4_960 : STYLE_16X9_1130}
            />

            <FullscreenButton
              imageId={article.heroImageBody[0].id}
              origin={origin}
            />
          </figure>

          <figcaption className={styles.Caption}>
            {(article?.heroImageBody[0].caption && (
              <span
                data-testid="longreadheader-imagecaption-wrapper"
                dangerouslySetInnerHTML={{
                  __html: `${article.heroImageBody[0].caption} `,
                }}
              />
            )) ||
              ''}
            {article?.heroImageBody[0].image?.credit &&
              shouldDisplayImageCredit && (
                <span
                  className={styles.ArticleImageCredit}
                  data-testid="longreadheader-imagecredit-wrapper"
                >
                  Quelle: {article.heroImageBody[0].image.credit}
                </span>
              )}
          </figcaption>
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
