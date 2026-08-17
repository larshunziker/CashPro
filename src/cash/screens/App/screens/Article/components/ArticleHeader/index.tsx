import React from 'react';
import classNames from 'classnames';
import { TIME_ELAPSED_FORMAT_DATE_WITH_TIME } from '../../../../../../../shared/helpers/dateTimeElapsed';
import { renderAuthorsAndDateElement } from '../../../../components/Teaser/shared/helpers';
import Hero from '../../../../components/Hero';
import ArticleLead from '../ArticleLead';
import ArticleTitle from '../ArticleTitle';
import { ARTICLE_TYPE_HEADLESS } from '../../../../../../../shared/constants/content';
import { IMAGE_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { TRACKING_CLASS_ARTICLE_HEADER } from '../../../../../../../shared/constants/tracking';
import sections from '../../../../assets/styles/sections.legacy.css';
// eslint-disable-next-line
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
const hasHeroImage = ({ subtypeValue }) =>
  subtypeValue !== ARTICLE_TYPE_HEADLESS;

/* @ts-ignore TODO: TS7031 ->  Binding element 'article' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isInView' implicitly has an 'any' type. */
const ArticleHeader = ({ article, isInView }) => {
  const hasHero =
    hasHeroImage(article) &&
    article.heroImageBody &&
    Array.isArray(article.heroImageBody) &&
    article.heroImageBody.length > 0;
  return (
    <div
      className={classNames(
        TRACKING_CLASS_ARTICLE_HEADER,
        styles.Wrapper,
        sections.Section,
      )}
    >
      <ArticleTitle article={article} isInView={isInView} />
      <ArticleLead article={article} />

      <div className={styles.DateWrapper}>
        {renderAuthorsAndDateElement(
          article,
          TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
        )}
      </div>

      {article && hasHero && (
        <Hero heroImageBody={article.heroImageBody} article={article}>
          {article.heroImageBody[0].__typename === IMAGE_PARAGRAPH && (
            <figcaption className={styles.Caption}>
              {article?.teaserImage?.caption && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: article.teaserImage.caption,
                  }}
                />
              )}
              {article?.teaserImage?.image?.credit &&
                !article.heroImageBody[0].suppressSource && (
                  <span className={classNames(styles.Credit)}>
                    Quelle: {article?.teaserImage?.image?.credit}
                  </span>
                )}
            </figcaption>
          )}
        </Hero>
      )}
    </div>
  );
};

export default ArticleHeader;
