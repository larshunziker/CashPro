import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import TimeToRead from '../../../../../../components/TimeToRead';
import Tooltip from '../../../../../../components/Tooltip';
import PaidArticleIcon from './../PaidArticleIcon';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_ADVERTORIAL_LABEL,
  ADVERTISING_TYPE_LONGFORM,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ANCHOR_SHORT_TITLE,
  ANCHOR_TITLE,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_OPINION_LABEL,
  ARTICLE_TYPE_RATGEBER,
} from '../../../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import type {
  ArticleLeadRatgeberProps,
  ArticleLeadShortTitleProps,
} from './typings';

type ArticleLeadRatgeberPropsInner = ArticleLeadRatgeberProps & {
  isHybridApp: boolean;
};

const linkData = {
  path: '/werbung-und-inhalte',
  text: 'Mehr erfahren ...',
};

const ArticleLeadShortTitle = ({
  shortTitle,
  isAdvertorial,
  restrictionStatus,
}: ArticleLeadShortTitleProps) => (
  <span
    id={ANCHOR_SHORT_TITLE}
    data-testid="article-lead-ratgeber-short-title-wrapper"
    className={classNames({
      [styles.ShortTitle]: !isAdvertorial,
      [styles.SponsoredShortTitle]: isAdvertorial,
    })}
  >
    <PaidArticleIcon restrictionStatus={restrictionStatus} />
    {shortTitle}
  </span>
);

const ArticleLeadRatgeber = ({
  article,
  layout,
  articleColStyle,
  isHybridApp,
}: ArticleLeadRatgeberPropsInner) => {
  const isAdvertorial =
    article.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL ||
    article?.subtypeValue === ADVERTISING_TYPE_LONGFORM ||
    article.subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE;

  const isOpinion = article.subtypeValue === ARTICLE_TYPE_OPINION;

  const shouldRenderTimeToRead = [
    ARTICLE_TYPE_OPINION,
    ARTICLE_TYPE_RATGEBER,
  ].includes(article.subtypeValue);

  const shortTitle: string =
    article.shortTitle ||
    (isAdvertorial && ADVERTISING_TYPE_ADVERTORIAL_LABEL) ||
    (isOpinion && ARTICLE_TYPE_OPINION_LABEL) ||
    article.channel?.title ||
    '';

  return (
    <div
      className={classNames('article-lead-ratgeber', styles.Wrapper, {
        [styles.NoMarginTop]: isHybridApp,
      })}
      data-testid="article-lead-ratgeber-wrapper"
    >
      <div className={articleColStyle}>
        {!layout && (
          <>
            {shortTitle &&
              ((isAdvertorial && (
                <Tooltip
                  content="Dieser Inhalt wurde von oder in Zusammenarbeit mit einem Werbepartner erstellt."
                  link={linkData}
                  origin={ADVERTISING_TYPE_ADVERTORIAL}
                >
                  <ArticleLeadShortTitle
                    isAdvertorial={isAdvertorial}
                    shortTitle={shortTitle}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                    restrictionStatus={article?.restrictionStatus}
                  />
                </Tooltip>
              )) || (
                <ArticleLeadShortTitle
                  isAdvertorial={isAdvertorial}
                  shortTitle={shortTitle}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                  restrictionStatus={article?.restrictionStatus}
                />
              ))}
            <h1 id={ANCHOR_TITLE} className={styles.Title}>
              <span
                className={classNames({
                  [styles.SponsoredMainTitle]: isAdvertorial,
                  [styles.MainTitle]: !isAdvertorial,
                })}
                itemProp="headline"
              >
                {article.title}
              </span>
            </h1>
          </>
        )}
        <p className={styles.Lead}>{article.lead}</p>
        {article.time2read && shouldRenderTimeToRead && (
          <TimeToRead
            seconds={article.time2read}
            addClass={classNames('time-to-read-in-article-head')}
          />
        )}
      </div>
    </div>
  );
};

const updatePolicy = shouldUpdate<any>(
  (props: ArticleLeadRatgeberProps, nextProps: ArticleLeadRatgeberProps) =>
    props.article !== nextProps.article,
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isHybridApp: locationStateSelector(state).isHybridApp,
});

export default compose<any, any>(
  connect(mapStateToProps),
  updatePolicy,
)(ArticleLeadRatgeber);
