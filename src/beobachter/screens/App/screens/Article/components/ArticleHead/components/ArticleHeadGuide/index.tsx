import React from 'react';
import { getShortTitleByProps } from '../../../../../../components/Teaser/shared/helpers';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import AuthorDateBlock from '../../../../../../components/AuthorDateBlock';
import UtilityBar from '../../../../../../components/UtilityBar';
import UtilityOverlay from '../../../../../../components/UtilityBar/components/UtilityOverlay';
import PaidArticleIcon from '../../../ArticleLead/components/PaidArticleIcon';
import {
  ANCHOR_TITLE,
  ANCHOR_SHORT_TITLE,
} from '../../../../../../../../../shared/constants/content';
import {
  UTILITYBAR_CONFIG_ARTICLE_GUIDE,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../../../../Article/constants';
import styles from './styles.legacy.css';
import { ArticlePageProps } from '../../../../../ArticlePage/typings';

type ArticleWithNavigationHeaderProps = Pick<ArticlePageProps, 'article'>;

const ArticleHeadGuide = ({ article }: ArticleWithNavigationHeaderProps) => (
  <div data-testid="article-head-default-wrapper">
    {article.heroImageBody && (
      <TestFragment data-testid="article-head-default-hero-wrapper">
        <div className={'article-image'}>
          {article.title && (
            <div data-testid="article-head-default-lead-wrapper">
              <div id={ANCHOR_SHORT_TITLE}>
                <span className={styles.ShortTitle}>
                  <PaidArticleIcon
                    restrictionStatus={article.restrictionStatus}
                  />
                  {article.shortTitle || getShortTitleByProps(article)}
                </span>
              </div>
              <h1 id={ANCHOR_TITLE} className={styles.Title}>
                {article.title}
              </h1>
              <div className={styles.Lead}>{article.lead}</div>
              <div className={styles.UtilityBarWrapper}>
                <UtilityBar
                  enabledUtilities={UTILITYBAR_CONFIG_ARTICLE_GUIDE}
                  shouldUseSwipeable
                >
                  {({ isOverlayVisible, toggleOverlayVisible }) => (
                    <UtilityOverlay
                      overlayTitle="Artikel teilen"
                      isOverlayVisible={isOverlayVisible}
                      toggleOverlayVisible={toggleOverlayVisible}
                      enabledUtilities={UTILITYBAR_OVERLAY_CONFIG_ARTICLE}
                    />
                  )}
                </UtilityBar>
              </div>
            </div>
          )}
        </div>
      </TestFragment>
    )}
    {/* @ts-ignore TODO: TS2322 ->  Type '(Article | NativeAdvertising) & TeaserFactoryProps & { addClass? */}
    <AuthorDateBlock article={article} addClass={styles.DateWrapper} />
  </div>
);

export default ArticleHeadGuide;
