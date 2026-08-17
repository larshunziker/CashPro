import React from 'react';
import Picture from '../../../../../../../../../common/components/Picture';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import SponsorBanner from '../../../../../../components/SponsorBanner';
import ArticleHeroRatgeber from '../../../ArticleHeroRatgeber';
import ArticleLead from '../../../ArticleLead';
import { STYLE_LARGE } from '../../../../../../../../../shared/constants/images';
import sections from '../../../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { ArticleHeadRatgeberProps } from './typings';

type ArticleHeadRatgeberPropsInner = ArticleHeadRatgeberProps;

const ArticleHeadRatgeber = ({
  article,
  articleColStyle,
  pageLayoutType,
}: ArticleHeadRatgeberPropsInner) => {
  const sponsorImageFile =
    article?.channel?.landingPage?.sponsor?.teaserImage?.image?.file || null;

  return (
    <TestFragment data-testid="article-head-ratgeber-wrapper">
      <div>
        <div className={sections.Section}>
          {sponsorImageFile?.relativeOriginPath && (
            <div
              className={styles.SponsorBannerWrapper}
              data-testid="article-head-ratgeber-sponsor"
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
          <div>
            <ArticleLead
              article={article}
              articleColStyle={articleColStyle}
              component={article?.subtypeValue || ''}
              pageLayoutType={pageLayoutType}
            />
          </div>

          {article.heroImageBody && (
            <TestFragment data-testid="article-head-ratgeber-hero">
              <ArticleHeroRatgeber
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

export default ArticleHeadRatgeber;
