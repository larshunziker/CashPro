import React, { ReactElement } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import ArticleLead from '../../../ArticleLead';
import ArticleHero, { HERO_VIDEO } from '../../../ArticleHero';
import {
  ANCHOR_TITLE,
  ANCHOR_SHORT_TITLE,
} from '../../../../../../../../../shared/constants/content';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../../../common/screens/PageTemplate/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { ArticleHeadDefaultProps } from './typings';

type ArticleHeadDefaultPropsInner = ArticleHeadDefaultProps;

const ArticleHeadDefault = ({
  article,
  articleColStyle,
  pageLayoutType,
}: ArticleHeadDefaultPropsInner): ReactElement => {
  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    pageLayoutType,
  );

  const shortTitle = article?.shortTitle || article?.channel?.title || '';

  return (
    <div
      className={sections.Section}
      data-testid="article-head-default-wrapper"
    >
      {article &&
        article.heroImageBody &&
        Array.isArray(article.heroImageBody) &&
        article.heroImageBody[0] &&
        article.heroImageBody[0].__typename === HERO_VIDEO && (
          <div data-testid="article-head-default-guide-wrapper">
            <div className={styles.ArticleContainer}>
              <div>
                <div className={grid.Container}>
                  {shortTitle && (
                    <div
                      id={ANCHOR_SHORT_TITLE}
                      className={styles.LabelWrapper}
                      data-testid="article-head-default-guide-shorttitle"
                    >
                      <span className={styles.Label}>{shortTitle}</span>
                    </div>
                  )}
                  <h1
                    id={ANCHOR_TITLE}
                    className={styles.Title}
                    itemProp="headline"
                  >
                    {article.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      {article.heroImageBody && (
        <TestFragment data-testid="article-head-default-hero-wrapper">
          <ArticleHero
            article={article}
            component={article.subtypeValue}
            articleColStyle={articleColStyle}
            pageLayoutType={pageLayoutType}
          ></ArticleHero>
        </TestFragment>
      )}
      <div
        className={classNames({
          [grid.Container]: !isSplittedPageLayout,
        })}
      >
        <div className={grid.Row}>
          <ArticleLead
            article={article}
            articleColStyle={articleColStyle}
            component={article?.subtypeValue || ''}
            pageLayoutType={pageLayoutType}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleHeadDefault;
