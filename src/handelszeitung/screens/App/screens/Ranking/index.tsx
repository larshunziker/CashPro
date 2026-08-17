import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { mapRanking } from './helpers';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../../../shared/selectors/pianoStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import Helmet from '../../components/Helmet';
import Paragraphs from '../../components/Paragraphs';
import TeaserGrid from '../../components/TeaserGrid';
import Table from './components/Table';
import { useFilterParams } from './hooks/useFilterParams';
import FiltersWithSearch from './components/FiltersWithSearch';
import Hero from './components/Hero';
import {
  ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
  ROBOTS_META_NOINDEX_FOLLOW,
  ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
} from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_RANKING } from '../../components/TeaserGrid/gridConfigs/constants';
import { LANDING_PAGE_TYPE } from '../LandingPage/constants';
import { RANKING_TYPE_RICHEST } from '../Person/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import section from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

const Ranking = ({ ranking }: { ranking: Ranking }) => {
  const rankingRef = React.useRef<HTMLDivElement>();
  const hasScrolled = useRef(false);
  const { filterParams } = useFilterParams();
  const oldFilterParams = useRef(filterParams);
  const hasFilters = Object.keys(filterParams).length > 0;

  const {
    year,
    rankingType,
    title,
    lead,
    body,
    preferredUri,
    activeMenuTrail,
    teaserImage,
  } = ranking;
  const { file } = teaserImage?.image || {};
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const isNewRanking = year >= 2023 && rankingType === RANKING_TYPE_RICHEST;
  const [{ rankingItems, dropdownLists }, updateData] = useState(
    mapRanking(ranking, filterParams),
  );

  useEffect(() => {
    if (hasScrolled.current && Object.keys(filterParams).length === 0) {
      hasScrolled.current = false;
      return;
    }

    if (oldFilterParams.current !== filterParams) {
      updateData(mapRanking(ranking, filterParams));

      if (!hasScrolled.current && hasFilters) {
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        rankingRef.current.scrollIntoView({ behavior: 'smooth' });
        hasScrolled.current = true;
      } else if (hasScrolled.current && !hasFilters) {
        hasScrolled.current = false;
      }

      oldFilterParams.current = filterParams;
    }
  }, [
    ranking,
    hasScrolled,
    rankingItems,
    hasFilters,
    filterParams,
    oldFilterParams,
  ]);

  if (!ranking) {
    return null;
  }

  return (
    <div
      className={classNames('ranking', styles.Wrapper, {
        [styles.WithGreyBg]: isNewRanking,
      })}
    >
      <Helmet
        meta={[
          {
            name: 'robots',
            content:
              ((filterParams.sortBy || hasFilters) &&
                ROBOTS_META_NOINDEX_FOLLOW) ||
              ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
          },
        ]}
      />

      {!isNewRanking && (
        <>
          {title && (
            <div className={styles.Header}>
              <div className={section.Container}>
                {activeMenuTrail && (
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                  /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
                  <Breadcrumbs pageUrl={preferredUri} items={activeMenuTrail} />
                )}
              </div>
              <div className={section.Container}>
                <h1>
                  <div className={styles.Title}>{title}</div>
                  {lead && (
                    <span
                      className={styles.ShortTitleLegacy}
                      dangerouslySetInnerHTML={{ __html: lead }}
                    />
                  )}
                </h1>
              </div>
            </div>
          )}
          <div
            className={classNames('paywall-ranking-list', {
              [styles.TeaserWrapperLegacy]: !isNewRanking,
            })}
          >
            <TeaserGrid
              layout={GRID_LAYOUT_TEASER_RANKING}
              items={rankingItems}
            />
          </div>
        </>
      )}

      {isNewRanking && (
        <>
          <Hero file={file} lead={lead} title={title} />

          <div
            /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<HTMLDivElement | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
            ref={rankingRef}
            className={classNames(
              grid.ContainerPullOut,
              styles.RankingsWrapper,
            )}
          >
            <div className={grid.Row}>
              <div className={grid.ColXs24}>
                <FiltersWithSearch dropdownLists={dropdownLists} />
                {/* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 320 */}
                <Table year={year} rows={rankingItems} />
                {rankingItems?.length === 0 && (
                  <div
                    className={classNames(
                      grid.Container,
                      styles.EmptyResultsWrapper,
                    )}
                  >
                    <>Keine Resultate</>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className={styles.ParagraphsContainer}>
        <Paragraphs pageBody={body} origin={LANDING_PAGE_TYPE} />
      </div>
    </div>
  );
};
const getRootSchemaRestricted = ({
  ranking: { year, rankingType, rankings },
  hasSubscriptions,
  isCrawler,
}: {
  ranking: {
    year: number;
    rankingType: string;
    rankings: { edges: any[] };
  };
  hasSubscriptions: boolean;
  isCrawler: boolean;
}) => {
  const isRestrictedRanking =
    year >= 2023 && rankingType === RANKING_TYPE_RICHEST;
  const shouldHideContent = !hasSubscriptions && isRestrictedRanking;
  const isRestricted = shouldHideContent && !isCrawler;
  const jsonLd: {
    isAccessibleForFree: boolean;
    hasPart: Array<{
      '@type': string;
      isAccessibleForFree: boolean;
      cssSelector: string;
    }>;
    articleBody: string;
  } = {
    isAccessibleForFree: !isRestrictedRanking,
    hasPart: [],
    articleBody: '',
  };
  const rankingItems = rankings?.edges || [];
  let content = '';
  const rankingItemsCleaned = rankingItems.filter(
    (node: any) => node?.person?.name,
  );

  rankingItemsCleaned.map(
    (
      {
        node: {
          person: { name, body },
          rankingPosition,
          rankingIndustry,
        },
      },
      index: number,
    ) => {
      if (isRestricted && rankingPosition <= 3) {
        content += `Name: ${name}\n`;
        content += `Branche: ${rankingIndustry}\n`;
        content += `${body?.replace?.(/<[^>]*>?/gm, '') || ''}\n`;
      }
      if (isRestrictedRanking) {
        if (index >= 3) {
          jsonLd.hasPart.push({
            '@type': 'WebPageElement',
            isAccessibleForFree: false,
            cssSelector: `.restricted-section-${index}`,
          });
        } else {
          jsonLd.hasPart.push({
            '@type': 'WebPageElement',
            isAccessibleForFree: true,
            cssSelector: `.section-${index}`,
          });
        }
      }
    },
  );
  jsonLd.articleBody = content;
  return jsonLd;
};

const mapStateToProps = (state: ReduxState) => ({
  hasSubscriptions:
    authStateSelector(state).hasSubscriptions ||
    pianoStateSelector(state).isAccessGranted,
  isCrawler: locationStateSelector(state)?.isCrawler || false,
});

export default compose<any, any>(
  connect(mapStateToProps),
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps?.ranking || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps?.ranking?.rankings?.count || 0,
    pageSize: 1,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
    getRootSchemaRestricted,
  }),
)(Ranking);
