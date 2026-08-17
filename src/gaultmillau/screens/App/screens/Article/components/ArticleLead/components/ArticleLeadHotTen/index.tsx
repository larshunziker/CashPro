import React from 'react';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import classNames from 'classnames';
import {
  TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
  getFormattedElapsedDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import { getArticleDate } from '../../../../../../../../../shared/helpers/utils';
import { getAllAuthors } from '../../../../shared/helpers';
import { ANCHOR_TITLE } from '../../../../../../../../../shared/constants/content';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleLeadProps } from '../../typings';

type ArticleLeadHotTenPropsInner = Pick<
  ArticleLeadProps,
  'article' | 'language'
> & {
  intl: IntlShape;
};

const ArticleLeadHotTen = ({
  article,
  language,
  intl,
}: ArticleLeadHotTenPropsInner) => (
  <div className={classNames('article-lead', grid.ColXs24)}>
    <h1 className={styles.Title}>
      <FormattedMessage
        id="app.hotTen.title"
        description="Title of the hot-ten detail page"
        defaultMessage="Hot Ten"
      />
    </h1>
    <h4 id={ANCHOR_TITLE} className={styles.SubTitle}>
      {article.title || ''}
    </h4>

    <p className={styles.Lead}>{article.lead || ''}</p>

    <div className={styles.Authors}>
      {article.authors &&
        article.authors.edges &&
        article.authors.edges.length > 0 && (
          <span>
            {/* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<AuthorEdge>[]' is not assignable to parameter of type '(AuthorEdge | PersonEdge)[]'. */}
            {getAllAuthors(article, article.authors.edges, intl, false)} |{' '}
          </span>
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

export default compose<any, any>(injectIntl)(ArticleLeadHotTen);
