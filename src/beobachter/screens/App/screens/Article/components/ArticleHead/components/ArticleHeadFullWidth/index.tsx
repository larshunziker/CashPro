import React from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../../../common/components/Picture';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import SponsorBanner from '../../../../../../components/SponsorBanner';
import ArticleHero from '../../../ArticleHero';
import ArticleLead from '../../../ArticleLead';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ADVERTISING_TYPE_SPONSORING,
  ARTICLE_TYPE_OPINION,
} from '../../../../../../../../../shared/constants/content';
import { STYLE_LARGE } from '../../../../../../../../../shared/constants/images';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { ArticleHeadFullWidthProps } from './typings';

type ArticleHeadFullWidthPropsInner = ArticleHeadFullWidthProps;

const ArticleHeadFullWidth = ({
  article,
  articleColStyle,
  pageLayoutType,
}: ArticleHeadFullWidthPropsInner) => {
  const sponsorImageFile =
    article?.channel?.landingPage?.sponsor?.teaserImage?.image?.file || null;

  const isOpinion = article?.subtypeValue === ARTICLE_TYPE_OPINION;
  const isPublireportage =
    article?.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL;
  const isAdvertorial =
    article?.subtypeValue === ADVERTISING_TYPE_SPONSORING ||
    article?.subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE;

  return (
    <TestFragment data-testid="article-head-full-width-wrapper">
      <div
        className={classNames({
          [styles.HeaderBackgroundOpinion]: isOpinion,
          [styles.HeaderBackgroundPublireportage]: isPublireportage,
          [styles.HeaderBackgroundAdvertorial]: isAdvertorial,
        })}
      >
        <div className={sections.Section}>
          {sponsorImageFile?.relativeOriginPath && (
            <div
              className={styles.SponsorBannerWrapper}
              data-testid="article-head-full-width-sponsor"
            >
              <SponsorBanner
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Sponsor> | undefined' is not assignable to type 'Sponsor | undefined'. */
                sponsor={article?.channel?.landingPage?.sponsor}
                label={article?.channel?.landingPage?.sponsorLabel || ''}
                backgroundColor={
                  article?.channel?.landingPage?.sponsor?.colorCode || ''
                }
              >
                <Picture
                  relativeOrigin={sponsorImageFile?.relativeOriginPath}
                  alt={sponsorImageFile?.alt || ''}
                  className={styles.SponsorBannerLogo}
                  style_320={STYLE_LARGE}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                  focalPointX={sponsorImageFile?.focalPointX}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                  focalPointY={sponsorImageFile?.focalPointY}
                />
              </SponsorBanner>
            </div>
          )}
          <div className={grid.Container}>
            <div className={grid.Row}>
              <ArticleLead
                article={article}
                articleColStyle={articleColStyle}
                component={article?.subtypeValue || ''}
                pageLayoutType={pageLayoutType}
              />
            </div>
          </div>

          {article.heroImageBody && (
            <TestFragment data-testid="article-head-full-width-hero">
              <ArticleHero
                article={article}
                articleColStyle={articleColStyle}
                component={article?.subtypeValue || ''}
                pageLayoutType={pageLayoutType}
              />
            </TestFragment>
          )}
        </div>
      </div>
    </TestFragment>
  );
};

export default ArticleHeadFullWidth;
