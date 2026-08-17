import React from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import PaidArticleIcon from '../PaidArticleIcon';
import {
  ANCHOR_SHORT_TITLE,
  ANCHOR_TITLE,
} from '../../../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import { ArticleLeadDefaultProps } from './typings';

const ArticleLeadDefault = ({
  article,
  layout,
  articleColStyle,
}: ArticleLeadDefaultProps) => (
  <div className={`article-lead ${styles.Wrapper}`}>
    <div className={articleColStyle}>
      {!layout && (
        <>
          {!article.shortTitle && article.channel?.title && (
            <span
              className={styles.TitleWrapper}
              data-testid="articleleaddefault-channeltitle-wrapper"
            >
              <span className={styles.ShortTitle}>
                <PaidArticleIcon
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                  restrictionStatus={article?.restrictionStatus}
                />
                {article.channel.title}
              </span>
            </span>
          )}
          {article.shortTitle && (
            <span
              id={ANCHOR_SHORT_TITLE}
              className={styles.ShortTitle}
              data-testid="articleleaddefault-shorttitle-wrapper"
            >
              {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */}
              <PaidArticleIcon restrictionStatus={article?.restrictionStatus} />
              {article.shortTitle}
            </span>
          )}
          <h1 id={ANCHOR_TITLE} className={styles.TitleWrapper}>
            <span className={styles.MainTitle} itemProp="headline">
              {article.title}
            </span>
          </h1>
        </>
      )}

      <p className={styles.Lead} itemProp="description">
        {article.lead}
      </p>
    </div>
  </div>
);

const updatePolicy = shouldUpdate<any>(
  (props: ArticleLeadDefaultProps, nextProps: ArticleLeadDefaultProps) =>
    props.article !== nextProps.article,
);

export default compose<any, any>(updatePolicy)(ArticleLeadDefault);
