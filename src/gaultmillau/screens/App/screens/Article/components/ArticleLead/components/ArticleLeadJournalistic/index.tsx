import React from 'react';
import { IntlShape, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import classNames from 'classnames';
import {
  TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
  getFormattedElapsedDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import { getArticleDate } from '../../../../../../../../../shared/helpers/utils';
import {
  getAllAuthors,
  renderSponsoredOrShortTitle,
} from '../../../../shared/helpers';
import {
  ANCHOR_TITLE,
  ANCHOR_SHORT_TITLE,
} from '../../../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import { ArticleLeadProps } from '../../typings';

type ArticleLeadJournalisticPropsInner = ArticleLeadProps & {
  windowState: WindowState;
  intl: IntlShape;
};

const ArticleLeadJournalistic = ({
  article,
  articleColStyle,
  intl,
  language,
}: ArticleLeadJournalisticPropsInner) => {
  const renderedAuthors =
    (article.authors &&
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      article.authors.edges.length > 0 &&
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<Maybe<AuthorEdge>[]> | undefined' is not assignable to parameter of type '(AuthorEdge | PersonE */
      getAllAuthors(article, article.authors.edges, intl)) ||
    null;

  return (
    <div
      className={classNames(
        'article-lead',
        'article-lead-journalistic',
        articleColStyle,
        styles.Wrapper,
      )}
    >
      <div id={ANCHOR_SHORT_TITLE}>
        {renderSponsoredOrShortTitle(article, styles.ShortTitle)}
      </div>
      <h1 id={ANCHOR_TITLE} className={styles.Title}>
        {article.title || ''}
      </h1>

      <p className={styles.Lead}>{article.lead || ''}</p>
      <div className={styles.AuthorWrapper}>
        {renderedAuthors}
        <span className={styles.CreateDate}>
          {renderedAuthors && <span>{' | '}</span>}
          {getFormattedElapsedDate({
            createDate: getArticleDate(article),
            format: TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
            language: language.toUpperCase(),
          })}
        </span>
      </div>
    </div>
  );
};

export default compose<any, any>(injectIntl)(ArticleLeadJournalistic);
