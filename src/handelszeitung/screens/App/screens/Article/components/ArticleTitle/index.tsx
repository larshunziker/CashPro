import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { isRestrictedContent } from '../../../../../../../shared/helpers/restrictedContent';
import Breadcrumbs from '../../../../../../screens/App/components/Breadcrumbs';
import Logo from '../../../../../../screens/App/components/Logo';
import Tooltip from '../../../../../../screens/App/components/Tooltip';
import SeatChangeImage from '../ArticleHeader/components/SeatChangeImage';
import IfFeatureDisabled from '../../../../../../../common/components/IfFeatureDisabled';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_ADVERTORIAL_LABEL,
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_LONGFORM,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ANCHOR_SHORT_TITLE,
  ANCHOR_TITLE,
  ARTICLE_TYPE_ASSOCIATION,
  ARTICLE_TYPE_ASSOCIATION_LABEL,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_OPINION_LABEL,
  ARTICLE_TYPE_SEATCHANGE,
  NATIVE_ADVERTISING_CONTENT_TYPE_LABEL,
} from '../../../../../../../shared/constants/content';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../../shared/constants/publications';
import {
  LOGO_ABO_BADGE_L,
  LOGO_HZ_BRAND_REPORT,
} from '../../../../../../screens/App/components/Logo/constants';
import { ABO_BADGE_REMOVAL_FEATURE } from '../../../../constants';
import styles from './styles.legacy.css';
import { ArticleTitleProps } from './typings';

type ArticleTitlePropsInner = ArticleTitleProps;

const tooltipContent =
  'Dieser Inhalt wurde von oder in Zusammenarbeit mit einem Werbepartner erstellt.';

const tooltipLink = {
  path: '/werbung-und-inhalte',
  text: 'Mehr erfahren ...',
};

const ArticleTitle = ({
  article,
  articleColStyle,
}: ArticleTitlePropsInner): ReactElement => {
  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<PersonConnection> | { edges */
  const relatedPeople: PersonConnection =
    article?.subtypeValue === ARTICLE_TYPE_SEATCHANGE &&
    Array.isArray(article.relatedPersons?.edges) &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    article.relatedPersons?.edges.length > 0
      ? article.relatedPersons
      : {
          edges: [{ node: { teaserImage: article.teaserImage } }],
          count: 1,
          totalCount: 1,
          pageInfo: { hasNextPage: null, hasPreviousPage: null },
        };

  const isContentRestricted: boolean = isRestrictedContent(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    article.restrictionStatus,
  );

  const isTooltipVisible =
    article?.subtypeValue === ADVERTISING_TYPE_BRANDREPORT ||
    article?.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL ||
    article?.subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE;

  return (
    <div
      className={classNames(
        styles.ArticleTitle,
        'article-title',
        articleColStyle,
      )}
      data-testid="articletitle-wrapper"
    >
      <div>
        <Breadcrumbs
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          pageUrl={article.preferredUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
          items={article.activeMenuTrail}
        />
        <div id={ANCHOR_SHORT_TITLE} className={styles.ShortTitleWrapper}>
          {isContentRestricted && (
            <IfFeatureDisabled feature={ABO_BADGE_REMOVAL_FEATURE}>
              <Logo type={LOGO_ABO_BADGE_L} isInline />
            </IfFeatureDisabled>
          )}

          {(article?.subtypeValue === ADVERTISING_TYPE_BRANDREPORT && (
            <span className={styles.BrandReportLogoWrapper}>
              <Logo
                type={LOGO_HZ_BRAND_REPORT}
                isInline
                origin={ADVERTISING_TYPE_BRANDREPORT}
              />
            </span>
          )) || (
            <span
              data-testid="articletitle-shorttitle"
              className={classNames(styles.ShortTitle, {
                [styles.ShortTitleNA]:
                  article.subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE,
                [styles.ShortTitleAdvertorial]:
                  article.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
              })}
            >
              {article?.shortTitle ||
                (article?.subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE &&
                  NATIVE_ADVERTISING_CONTENT_TYPE_LABEL) ||
                ((article?.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL ||
                  article?.subtypeValue === ADVERTISING_TYPE_LONGFORM) &&
                  ADVERTISING_TYPE_ADVERTORIAL_LABEL) ||
                (article?.subtypeValue === ARTICLE_TYPE_OPINION &&
                  ARTICLE_TYPE_OPINION_LABEL) ||
                (article?.subtypeValue === ARTICLE_TYPE_ASSOCIATION &&
                  ARTICLE_TYPE_ASSOCIATION_LABEL) ||
                (article?.publication === PUBLICATION_BIL && PUBLICATION_BIL) ||
                (article?.publication === PUBLICATION_SWISS_INSURANCE &&
                  'HZ Insurance') ||
                (article?.publication === PUBLICATION_HZB && 'HZ Banking') ||
                (article?.channel && article?.channel?.title) ||
                ''}
            </span>
          )}
          {isTooltipVisible && (
            <Tooltip
              content={tooltipContent}
              link={tooltipLink}
              origin={ADVERTISING_TYPE_BRANDREPORT}
            ></Tooltip>
          )}
        </div>

        {article?.subtypeValue === ARTICLE_TYPE_SEATCHANGE && (
          <SeatChangeImage relatedPersons={relatedPeople} />
        )}
        {article.title && (
          <h1 id={ANCHOR_TITLE} data-testid="articletitle-title-wrapper">
            <div
              className={classNames(styles.Title, {
                [styles.HasTimeToRead]: !!article.time2read,
              })}
            >
              {article.title}
            </div>
          </h1>
        )}
      </div>
    </div>
  );
};

export default ArticleTitle;
