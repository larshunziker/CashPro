import React from 'react';
import classNames from 'classnames';
import AuthorDateBlock from '../../../../../../components/AuthorDateBlock';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleDefaultRatgeberProps } from './typings';

const ArticleDefaultRatgeber = ({
  article,
  children,
}: ArticleDefaultRatgeberProps) => (
  <div className="article-image">
    <div className={grid.Container}>
      {/* @ts-ignore TODO: TS2322 ->  Type 'ArticleInterface & EntityQueueReplaceableInterface & MetatagProviderInterface & NodeInterface & Recommendation &  */}
      <AuthorDateBlock article={article} />
    </div>

    <div className={styles.OnImageContent}>
      <div className={grid.Container}>
        {children}
        <p className={classNames(styles.Lead, grid.HiddenSmUp)}>
          {article.lead}
        </p>
      </div>
    </div>
  </div>
);

export default ArticleDefaultRatgeber;
