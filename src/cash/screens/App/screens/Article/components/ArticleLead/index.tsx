import React from 'react';
import styles from './styles.legacy.css';
import { ArticleLeadProps } from './typings';

const ArticleLead = ({ article }: ArticleLeadProps) => (
  <div className="article-lead">
    <div>{article && <p className={styles.Lead}>{article.lead}</p>}</div>
  </div>
);

export default ArticleLead;
