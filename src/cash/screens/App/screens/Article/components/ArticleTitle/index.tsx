import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import Breadcrumbs from '../../../../../../screens/App/components/Breadcrumbs';
import Tooltip from '../../../../../../screens/App/components/Tooltip';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
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
  NATIVE_ADVERTISING_CONTENT_TYPE_LABEL,
} from '../../../../../../../shared/constants/content';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
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
  isInView,
}: ArticleTitlePropsInner): ReactElement => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const isTooltipVisible =
    article?.subtypeValue === ADVERTISING_TYPE_BRANDREPORT ||
    article?.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL ||
    article?.subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE;

  return (
    <div
      className={classNames(styles.ArticleTitle, 'article-title')}
      data-testid="articletitle-wrapper"
    >
      <div>
        {(!isHybridApp && (
          <Breadcrumbs
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            pageUrl={article.preferredUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
            items={article.activeMenuTrail}
          />
        )) ||
          null}
        <div id={ANCHOR_SHORT_TITLE} className={styles.ShortTitleWrapper}>
          {/*@TODO: Clean this up */}
          {(article?.subtypeValue === ADVERTISING_TYPE_BRANDREPORT && (
            <span className={styles.BrandReportLogoWrapper}></span>
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
                (article?.channel && article?.channel?.title) ||
                ''}
            </span>
          )}
          {isTooltipVisible && (
            <Tooltip
              content={tooltipContent}
              link={tooltipLink}
              origin={ADVERTISING_TYPE_NATIVE_ARTICLE}
            ></Tooltip>
          )}
        </div>

        {article.title && (
          <h1 id={ANCHOR_TITLE} data-testid="articletitle-title-wrapper">
            <span className={styles.Title}>{article.title}</span>
          </h1>
        )}

        {isInView && (
          <BodyClassName className={styles.ArticleBody}>
            <div
              className={classNames(
                'utility-bar-wrapper',
                styles.UtilityBarWrapper,
                {
                  [styles.Hidden]: isHybridApp,
                },
              )}
            >
              <UtilityBar enabledUtilities={UTILITYBAR_CONFIG}>
                {({ isOverlayVisible, toggleOverlayVisible, visibleId }) => (
                  <UtilityOverlay
                    visibleId={visibleId}
                    overlayTitle="Artikel teilen"
                    isOverlayVisible={isOverlayVisible}
                    toggleOverlayVisible={toggleOverlayVisible}
                    enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
                  />
                )}
              </UtilityBar>
            </div>
          </BodyClassName>
        )}
      </div>
    </div>
  );
};

export default ArticleTitle;
