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
import KeywordDisruptor from '../../../KeywordDisruptor';
import {
  ANCHOR_TITLE,
  ANCHOR_SHORT_TITLE,
} from '../../../../../../../../../shared/constants/content';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleLeadProps } from '../../typings';

type ArticleLeadHeadlessPropsInner = Pick<
  ArticleLeadProps,
  'article' | 'language'
> & {
  intl: IntlShape;
};

const ArticleLeadHeadless = ({
  article,
  intl,
  language,
}: ArticleLeadHeadlessPropsInner) => (
  <div
    className={classNames(
      'article-lead',
      grid.ColXs22,
      grid.ColSm20,
      grid.ColMd16,
      grid.ColOffsetXs1,
      grid.ColOffsetSm2,
      grid.ColOffsetMd4,
    )}
  >
    <KeywordDisruptor addClass={styles.Image} keywords={article.keywords} />
    <div id={ANCHOR_SHORT_TITLE}>
      {renderSponsoredOrShortTitle(article, styles.ShortTitle)}
    </div>

    <h1 id={ANCHOR_TITLE} className={styles.Title}>
      {article.title || ''}
    </h1>

    <div className={styles.Lead}>{article.lead || ''}</div>

    <div className={styles.Authors}>
      {article?.authors &&
        Array.isArray(article.authors.edges) &&
        article.authors.edges.length > 0 && (
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<AuthorEdge>[]' is not assignable to parameter of type '(AuthorEdge | PersonEdge)[]'. */
          <span>{getAllAuthors(article, article.authors.edges, intl)} | </span>
        )}
      <span className={styles.DateWrapper}>
        {getFormattedElapsedDate({
          createDate: getArticleDate(article),
          format: TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
          language: language.toUpperCase(),
        })}
      </span>
    </div>
  </div>
);

export default compose<any, any>(injectIntl)(ArticleLeadHeadless);
