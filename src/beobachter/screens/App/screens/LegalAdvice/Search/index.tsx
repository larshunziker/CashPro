import React, { ReactElement, useEffect } from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../../shared/decorators/withScrollToAnchor';
import Link from '../../../../../../common/components/Link';
import Helmet from '../../../components/Helmet';
import LegalAdviceSearch from '../../../components/LegalAdviceSearch';
import LoadingSpinner from '../../../components/LoadingSpinner';
import TeaserGrid from '../../../components/TeaserGrid';
import StatusPage from '../../StatusPage';
import LegalAdviceArticleTypes from '../components/LegalAdviceArticleTypes';
import LegalAdviceCategories from '../components/LegalAdviceCategories';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../../components/Pager';
import { useSSRContext } from '../../../../../../common/components/SSRContext';
import { useKmu } from '../hooks/useKmu';
import { typesCode2Name } from '../legalAdviceConfig';
import { RESTRICTION_STATUS_PAID } from '../../../../../../shared/constants/content';
import {
  PIANO_CONTAINER_LANDING_ASIDE,
  PIANO_CONTAINER_LANDING_ASIDE_2,
  PIANO_CONTAINER_LANDING_ASIDE_3,
  PIANO_PLACEHOLDER_ASIDE,
} from '../../../../../../shared/constants/piano';
import { GRID_LAYOUT_TEASER_LEGAL_ADVICES } from '../../../components/TeaserGrid/gridConfigs/constants';
import { ROUTE_LEGAL_ADVICE } from '../../../constants';
import {
  LANDING_PAGE_LEGAL_ADVICE_PAGE_SIZE,
  PAGER_ANCHOR_SCROLL_ID,
} from '../../LandingPage/constants';
import grid from '../../../../../../common/assets/styles/grid.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch */
import variables from '../../../assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../LandingPage/typings';

type LandingPagePropsInner = LandingPageProps;
const SearchLegalAdvice = ({
  location,
  page,
  legalAdvice,
}: LandingPagePropsInner): ReactElement => {
  const { waitForAuth, queryParams } = useKmu(location);
  /* @ts-ignore TODO: TS2339 ->  Property 'q' does not exist on type '{ [key */
  const { q: searchQuery = '' } = location.query;
  const decodedSearchQuery = decodeURIComponent(searchQuery);
  const legalAdviceData = legalAdvice;
  const category = legalAdviceData?.category;
  const searchResults = legalAdviceData?.articlesSearchResults;
  const { isSSR } = useSSRContext();

  let searchTitle = 'Suchresultate in Rechtsratgeber';

  const articles = searchResults?.articles.map((article) => {
    return {
      node: {
        title: article.title,
        id: article.id,
        badgeLabel: 'Rechtsratgeber',
        /* @ts-ignore TODO: TS7015 ->  Element implicitly has an 'any' type because index expression is not of type 'number'. */
        shortTitle: typesCode2Name[article.typeCode],
        summary: article.summary,
        preferredUri: ROUTE_LEGAL_ADVICE + '/' + article.id,
        restrictionStatus: !article?.specialInterest?.includes('vorpaywall')
          ? RESTRICTION_STATUS_PAID
          : '',
        KMULabel: !!article?.specialInterest?.includes('KMU'),
      },
    };
  });

  if (category?.title) {
    searchTitle = 'Suchresultate in ' + category?.title;
  } else if (
    location.pathname === `/${ROUTE_LEGAL_ADVICE}` &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    articles?.length > 0
  ) {
    searchTitle = 'Suchresultate in Rechtsratgeber';
  }

  useEffect(() => {
    if (!isSSR && window?.tp?.experience) {
      window.tp.experience.execute();
    }
  }, [isSSR]);

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  if (page !== 1 && !articles.length) {
    return <StatusPage />;
  }

  return (
    <div className={`landing-page ${styles.Wrapper}`}>
      <Helmet
        title={`${decodedSearchQuery} | Beobachter`}
        socialMetaValues={{
          field_short_title: decodedSearchQuery,
          field_short_description: decodedSearchQuery,
          field_heroimage: '',
          field_lead: decodedSearchQuery,
        }}
      />
      <div
        className={classNames(grid.Container, {
          [styles.WithoutLinkBack]: !category?.parent,
        })}
      >
        <LegalAdviceSearch
          defaultValue={searchQuery}
          preserveScrollProgress={true}
        />
      </div>
      {category?.parent?.path !== category?.path && (
        <Link
          className={classNames(grid.Container, styles.LinkBack)}
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          path={category.parent.path + `?${queryParams}#0`}
        >
          <span>{category?.parent?.title || 'Rechtsratgeber'}</span>
        </Link>
      )}

      <div id={PAGER_ANCHOR_SCROLL_ID}>
        <div className={classNames(grid.Container)}>
          <div className={grid.Row}>
            <div
              className={classNames(grid.ColXs24, grid.ColMd15, grid.ColXl16)}
            >
              {category && (
                <>
                  <div className={styles.CategoriesTitle}>
                    {searchTitle} ({category.count})
                  </div>

                  {/* @ts-ignore TODO: TS2786 ->  'LegalAdviceCategories' cannot be used as a JSX component. */}
                  <LegalAdviceCategories
                    /* @ts-ignore TODO: TS2322 ->  Type 'LegalAdviceCategory[] | undefined' is not assignable to type 'LegalAdviceCategory[]'. */
                    categories={category.children}
                    location={location}
                    label="Filtern nach:"
                  />
                </>
              )}

              {!!legalAdviceData?.articleTypes?.length && (
                <LegalAdviceArticleTypes
                  location={location}
                  types={legalAdviceData.articleTypes}
                />
              )}
              {waitForAuth && <LoadingSpinner />}
              {!waitForAuth && articles && (
                <>
                  <TeaserGrid
                    layout={GRID_LAYOUT_TEASER_LEGAL_ADVICES}
                    items={ensureTeaserInterface(articles)}
                  />

                  <Pager
                    addClass={styles.PagerWrapper}
                    itemsCount={searchResults?.resultsNav.totalResults || 0}
                    itemsPerPage={LANDING_PAGE_LEGAL_ADVICE_PAGE_SIZE}
                    currentPage={page}
                    component={PAGER_TYPE_PAGE_LOADER}
                    anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
                  />
                </>
              )}
            </div>

            <div className={classNames(grid.ColXs24, grid.ColMd9, grid.ColXl8)}>
              <div className={styles.Sidebar}>
                <div key="article-aside-element-1">
                  <div
                    className={classNames(
                      PIANO_CONTAINER_LANDING_ASIDE,
                      styles.PianoIntegrationWrapper,
                      PIANO_PLACEHOLDER_ASIDE,
                    )}
                  />
                </div>

                <div key="article-aside-element-2">
                  <div
                    className={classNames(
                      PIANO_CONTAINER_LANDING_ASIDE_2,
                      styles.PianoIntegrationWrapper,
                      PIANO_PLACEHOLDER_ASIDE,
                    )}
                  />
                </div>

                <div key="article-aside-element-3">
                  <div
                    className={classNames(
                      PIANO_CONTAINER_LANDING_ASIDE_3,
                      styles.PianoIntegrationWrapper,
                      PIANO_PLACEHOLDER_ASIDE,
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default compose<any, any>(
  withScrollToAnchor({ offset: variables.pageScrollOffset }),
  withHelmet({}),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
        contentType: 'Search',
        articleId: `search_${props.query}`,
        subsection: props.query,
      }),
  }),
)(SearchLegalAdvice);
