import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import classNames from 'classnames';
import { TIME_ELAPSED_FORMAT_FULL } from '../../../../../../../shared/helpers/dateTimeElapsed';
import { renderAuthorsAndDateElement } from '../../../../components/Teaser/shared/helpers';
import Hero from '../../../../components/Hero';
import TimeToRead from '../../../../components/TimeToRead';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import ArticleLead from '../ArticleLead';
import ArticleTitle from '../ArticleTitle';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_TYPE_HEADLESS,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_SEATCHANGE,
} from '../../../../../../../shared/constants/content';
import { IMAGE_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZ,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../../shared/constants/publications';
import { TRACKING_CLASS_ARTICLE_HEADER } from '../../../../../../../shared/constants/tracking';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_CONFIG_BIL,
  UTILITYBAR_CONFIG_HZ,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
const hasHeroImage = ({ subtypeValue }) =>
  subtypeValue !== ARTICLE_TYPE_HEADLESS;

/* @ts-ignore TODO: TS7031 ->  Binding element 'article' implicitly has an 'any' type. */
const ArticleHeader = ({ article }) => {
  const hasHero =
    hasHeroImage(article) &&
    article.heroImageBody &&
    Array.isArray(article.heroImageBody) &&
    article.heroImageBody.length > 0;
  const heroImageCaptions: string = hasHero && article.heroImageBody[0].caption;
  return (
    <div
      className={classNames(
        TRACKING_CLASS_ARTICLE_HEADER,
        styles.Wrapper,
        sections.Section,
        {
          [styles.GoldenBackground]:
            article?.subtypeValue === ARTICLE_TYPE_OPINION ||
            article?.subtypeValue === ADVERTISING_TYPE_BRANDREPORT,
          [styles.IsSeatChange]:
            article?.subtypeValue === ARTICLE_TYPE_SEATCHANGE,
          [styles.GoldenBackgroundHero]:
            (article?.subtypeValue === ARTICLE_TYPE_OPINION ||
              article?.subtypeValue === ADVERTISING_TYPE_BRANDREPORT) &&
            hasHero,
        },
      )}
    >
      <div className={grid.Row}>
        <ArticleTitle article={article} articleColStyle={grid.ColXs24} />
      </div>
      <div className={grid.Row}>
        <ArticleLead article={article} articleColStyle={grid.ColXs24} />
      </div>

      <div className={grid.Row}>
        <div className={classNames(grid.ColXs24)}>
          {article.time2read && (
            <TimeToRead
              seconds={article.time2read}
              addClass={classNames(
                'time-to-read-in-article-head',
                styles.TimeToRead,
              )}
            />
          )}
        </div>
      </div>

      <BodyClassName className={styles.ArticleBody}>
        <div
          className={classNames(
            'utility-bar-wrapper',
            styles.UtilityBarWrapper,
          )}
        >
          <UtilityBar
            enabledUtilities={
              article?.publication === PUBLICATION_BIL
                ? UTILITYBAR_CONFIG_BIL
                : article?.publication === PUBLICATION_HZ
                ? UTILITYBAR_CONFIG_HZ
                : UTILITYBAR_CONFIG
            }
          >
            {({ isOverlayVisible, toggleOverlayVisible }) => (
              <UtilityOverlay
                overlayTitle="Artikel teilen"
                isOverlayVisible={isOverlayVisible}
                toggleOverlayVisible={toggleOverlayVisible}
                enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
              />
            )}
          </UtilityBar>
        </div>
      </BodyClassName>

      <div>
        {article?.subtypeValue !== ARTICLE_TYPE_SEATCHANGE &&
          article &&
          hasHero && (
            <Hero heroImageBody={article.heroImageBody} article={article}>
              {article.heroImageBody[0].__typename === IMAGE_PARAGRAPH && (
                <figcaption
                  className={classNames(styles.Caption, {
                    [styles.Gray]: [
                      PUBLICATION_SWISS_INSURANCE,
                      PUBLICATION_HZB,
                    ].includes(article.publication),
                  })}
                >
                  {heroImageCaptions && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: heroImageCaptions,
                      }}
                    />
                  )}
                  {article?.teaserImage?.image?.credit &&
                    !article.heroImageBody[0].suppressSource && (
                      <span
                        className={classNames(styles.Credit, {
                          [styles.Gray]: [
                            PUBLICATION_SWISS_INSURANCE,
                            PUBLICATION_HZB,
                          ].includes(article.publication),
                        })}
                      >
                        Quelle: {article?.teaserImage?.image?.credit}
                      </span>
                    )}
                </figcaption>
              )}
            </Hero>
          )}
      </div>
      <div className={styles.DateWrapper}>
        {renderAuthorsAndDateElement(article, TIME_ELAPSED_FORMAT_FULL)}
      </div>
    </div>
  );
};

export default ArticleHeader;
