import React, { useMemo } from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import { connect } from 'react-redux';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';

import { ARTICLE_HEAD_STYLE_TOOL } from '../../../ArticleHead';
import Link from '../../../../../../../../../common/components/Link';
import { shortTitleFallback } from '../../../../../LegalAdvice/helpers/shortTitleFallback';
import {
  ANCHOR_TITLE,
  ANCHOR_SHORT_TITLE,
} from '../../../../../../../../../shared/constants/content';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import type {
  ArticleLeadLegalAdviceProps,
  ArticleLeadShortTitleProps,
} from './typings';

type ArticleLeadLegalAdvicePropsInner = ArticleLeadLegalAdviceProps & {
  isHybridApp: boolean;
};

const ArticleLeadShortTitle = ({ shortTitle }: ArticleLeadShortTitleProps) => (
  <span
    id={ANCHOR_SHORT_TITLE}
    data-testid="article-lead-legal-advice-short-title-wrapper"
    className={styles.ShortTitle}
  >
    <div className={styles.Badge}>Rechtsratgeber</div>
    {shortTitle}
  </span>
);

const ArticleLeadLegalAdvice = ({
  article,
  isHybridApp,
}: ArticleLeadLegalAdvicePropsInner) => {
  const shortTitle = article.shortTitle || shortTitleFallback(article);

  const previousCategoryData = useMemo(() => {
    if (article.subtypeValue === ARTICLE_HEAD_STYLE_TOOL) {
      return {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        label: article?.channels?.[0].title,
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        link: article?.channels?.[0].preferredUri,
      };
    }

    return {
      label: article?.channel?.title,
      link: article?.channel?.preferredUri,
    };
  }, [article]);

  return (
    <div
      className={classNames('article-lead-legal-advice', styles.Wrapper, {
        [styles.NoMarginTop]: isHybridApp,
      })}
      data-testid="article-lead-legal-advice-wrapper"
    >
      <div className={grid.Row}>
        <div className={grid.ColXs24}>
          {previousCategoryData.link && (
            <Link className={styles.LinkBack} path={previousCategoryData.link}>
              <span>{previousCategoryData.label}</span>
            </Link>
          )}

          {shortTitle && <ArticleLeadShortTitle shortTitle={shortTitle} />}

          <h1 id={ANCHOR_TITLE} className={styles.Title}>
            {article.title}
          </h1>

          <p className={styles.Lead}>{article.lead}</p>
        </div>
      </div>
    </div>
  );
};

const updatePolicy = shouldUpdate<any>(
  (
    props: ArticleLeadLegalAdviceProps,
    nextProps: ArticleLeadLegalAdviceProps,
  ) => props.article !== nextProps.article,
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isHybridApp: locationStateSelector(state).isHybridApp,
});

export default compose<any, any>(
  connect(mapStateToProps),
  updatePolicy,
)(ArticleLeadLegalAdvice);
