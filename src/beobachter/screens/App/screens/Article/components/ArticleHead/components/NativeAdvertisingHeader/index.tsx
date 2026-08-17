import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import classNames from 'classnames';
import {
  TIME_ELAPSED_FORMAT_FULL,
  getFormattedElapsedDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import Link from '../../../../../../../../../common/components/LinkLegacy';
import Picture from '../../../../../../../../../common/components/Picture';
import Tooltip from '../../../../../../components/Tooltip';
import UtilityBar from '../../../../../../components/UtilityBar';
import UtilityOverlay from '../../../../../../components/UtilityBar/components/UtilityOverlay';
import Hero from '../../../../../NativeAdvertising/components/Hero';
import AuthorDateBlock, {
  Authors,
} from '../../../../../../components/AuthorDateBlock';
import { ADVERTISING_TYPE_BRANDREPORT } from '../../../../../../../../../shared/constants/content';
import { STYLE_SCALEH_120 } from '../../../../../../../../../shared/constants/images';
import { ROUTE_BRAND_REPORT } from '../../../../../../constants';
import {
  UTILITYBAR_CONFIG_ARTICLE_NATIVE_ADVERTISING,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../../../constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { BreadcrumbsItems } from '../../../../../../../../../common/components/Breadcrumbs/typings';
import { ArticlePageProps } from '../../../../../ArticlePage/typings';
import { ArticleHeadProps } from '../../typings';

type NativeAdvertisingPropsInner = ArticlePageProps & ArticleHeadProps;

const infoBoxLinkData = {
  path: '/service/service-werbliche-inhalte-auf-beobachterch',
  text: 'Mehr erfahren ...',
};

export function nativeAdvertisingBreadcrumbsData(data: any): any {
  const article = data?.environment?.routeByPath?.object;
  const sponsor = article?.sponsor?.title || '';
  const sponsorOverviewPage = `/brandreport/${sponsor
    .toLowerCase()
    .replace(/ /g, '-')}`;

  const breadcrumbItems: BreadcrumbsItems = {
    edges: [
      {
        node: {
          link: ROUTE_BRAND_REPORT,
          label: 'Brandreport',
        },
      },
      {
        node: {
          link: sponsorOverviewPage,
          label: sponsor,
        },
      },
    ],
  };

  data.breadcrumbsData = {
    activeMenuTrail: breadcrumbItems,
    title: article?.title,
  };
}

const NativeAdvertisingHeader = ({ article }: NativeAdvertisingPropsInner) => {
  const isBrandreport = article?.subtypeValue === ADVERTISING_TYPE_BRANDREPORT;
  const articleLabel = article?.shortTitle || article.advertisingTypeLabel;

  // tmp until we have an active menu trail
  const sponsor = article?.sponsor?.title || '';
  const sponsorOverviewPage = `/brandreport/${sponsor
    .toLowerCase()
    .replace(/ /g, '-')}`;

  const showUpdated =
    !!article.showUpdated &&
    new Date(article.changeDate || 0).getTime() >
      new Date(article.publicationDate).getTime();

  return (
    <div
      className={classNames('native-advertising', styles.Header)}
      data-testid="NAHeader"
    >
      <div className={classNames(grid.Container, styles.Wrapper)}>
        {articleLabel && (
          <Tooltip
            content="Dieser Inhalt wurde von oder in Zusammenarbeit mit einem Werbepartner erstellt."
            link={infoBoxLinkData}
            origin={article?.subtypeValue || ''}
          >
            <div className={styles.BadgeLabelWrapper}>
              <span className={styles.BadgeLabel}>{articleLabel}</span>
            </div>
          </Tooltip>
        )}

        {article?.title && <h1 className={styles.Title}>{article.title}</h1>}

        {article?.lead && (
          <div className={grid.Row}>
            <p
              className={classNames(
                styles.Lead,
                grid.ColXl22,
                grid.ColOffsetXl1,
              )}
            >
              {article.lead}
            </p>
          </div>
        )}
      </div>

      <div
        className={classNames(styles.HeroWrapper, {
          [styles.NativeAdvertisingHeroWrapper]: !isBrandreport,
        })}
      >
        {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ParagraphInterface>[] & ParagraphInterface & [{ __typename */}
        <Hero heroImageBody={article.heroImageBody} node={article} />
      </div>

      <div className={classNames(styles.PositionRelative, grid.Container)}>
        {!__TESTING__ && (
          <div className={grid.Row}>
            <div
              className={classNames(
                styles.Lead,
                grid.ColMd16,
                grid.ColOffsetMd4,
              )}
            >
              <div
                className={classNames(
                  'utility-bar-wrapper',
                  styles.UtilityBarWrapper,
                  grid.HideForPrint,
                )}
              >
                <div className={styles.AuthorWrapper}>
                  {article?.sponsor?.teaserImage?.image?.file
                    ?.relativeOriginPath && (
                    <Link link={{ path: sponsorOverviewPage }}>
                      <Picture
                        relativeOrigin={
                          article?.sponsor?.teaserImage?.image?.file
                            ?.relativeOriginPath
                        }
                        alt={
                          article?.sponsor?.teaserImage?.image?.file?.alt || ''
                        }
                        title={article?.sponsor?.teaserImage?.caption || ''}
                        className={styles.CompanyImage}
                        style_320={STYLE_SCALEH_120}
                        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                        focalPointX={
                          article?.sponsor?.teaserImage?.image?.file.focalPointX
                        }
                        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                        focalPointY={
                          article?.sponsor?.teaserImage?.image?.file.focalPointY
                        }
                      />
                    </Link>
                  )}

                  {!isBrandreport && (
                    <AuthorDateBlock
                      /* @ts-ignore TODO: TS2322 ->  Type '((Article | NativeAdvertising) & TeaserFactoryProps & { addClass? */
                      article={article}
                      isAlwaysLeftAligned
                      hasContainer
                    />
                  )}

                  {isBrandreport && (
                    <div className={styles.AuthorWrapperInner}>
                      <Link link={{ path: sponsorOverviewPage }}>
                        <span className={styles.Author}>
                          {(article &&
                            article.authors &&
                            article.authors.edges &&
                            article.authors.edges.length > 0 && (
                              <Authors
                                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */
                                authors={article.authors.edges}
                                addClassItem={styles.AuthorLink}
                              />
                            )) ||
                            null}
                          {/* sponsor on author level (visible only when no author is set) */}
                          {article &&
                            (!article.authors ||
                              !article.authors.edges ||
                              article.authors.edges.length === 0) &&
                            article.sponsor &&
                            article.sponsor.title &&
                            ` (für ${article.sponsor.title})`}
                        </span>
                      </Link>

                      {article &&
                        (showUpdated
                          ? article.changeDate && (
                              <span
                                className={styles.Date}
                                data-testid="updateDate"
                              >
                                Aktualisiert{' '}
                                {getFormattedElapsedDate({
                                  createDate: article.changeDate,
                                  prefix: 'am',
                                  format: TIME_ELAPSED_FORMAT_FULL,
                                })}
                              </span>
                            )
                          : article.publicationDate && (
                              <span data-testid="publicationDate">
                                {' '}
                                Veröffentlicht{' '}
                                {getFormattedElapsedDate({
                                  createDate: article.publicationDate,
                                  prefix: 'am',
                                  format: TIME_ELAPSED_FORMAT_FULL,
                                })}
                              </span>
                            ))}
                    </div>
                  )}
                </div>

                <BodyClassName className={styles.ArticleBody}>
                  <UtilityBar
                    enabledUtilities={
                      UTILITYBAR_CONFIG_ARTICLE_NATIVE_ADVERTISING
                    }
                    shouldUseSwipeable
                  >
                    {({ isOverlayVisible, toggleOverlayVisible }) => (
                      <div className={styles.UtilityOverlayWrapper}>
                        <UtilityOverlay
                          overlayTitle="Artikel teilen"
                          isOverlayVisible={isOverlayVisible}
                          toggleOverlayVisible={toggleOverlayVisible}
                          enabledUtilities={UTILITYBAR_OVERLAY_CONFIG_ARTICLE}
                        />
                      </div>
                    )}
                  </UtilityBar>
                </BodyClassName>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NativeAdvertisingHeader;
