import React from 'react';
import classNames from 'classnames';
import {
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_SEATCHANGE,
} from '../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import { ArticleLeadProps } from './typings';

const ArticleLead = ({ article, articleColStyle }: ArticleLeadProps) => (
  <div className="article-lead">
    <div className={articleColStyle}>
      {article && article?.subtypeValue !== ARTICLE_TYPE_SEATCHANGE && (
        <p
          className={classNames(styles.Lead, {
            [styles.IsOpinion]: article?.subtypeValue === ARTICLE_TYPE_OPINION,
          })}
        >
          {article.lead}
        </p>
      )}
    </div>
  </div>
);

export default ArticleLead;
