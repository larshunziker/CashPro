import React, { ReactElement } from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { ensureTeaserInterface } from '../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../../shared/decorators/withScrollToAnchor';
import Link from '../../../../../../common/components/Link';
import EditButtons from '../../../components/EditButtons';
import LegalAdviceSearch from '../../../components/LegalAdviceSearch';
import LoadingSpinner from '../../../components/LoadingSpinner';
import OverviewPageHeader from '../../../components/OverviewPageHeader';
import TeaserGrid from '../../../components/TeaserGrid';
import StatusPage from '../../StatusPage';
import LegalAdviceArticleTypes from '../components/LegalAdviceArticleTypes';
import LegalAdviceCategories from '../components/LegalAdviceCategories';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../../components/Pager';
import { useKmu } from '../hooks/useKmu';
import { typesCode2Name } from '../legalAdviceConfig';
import { RESTRICTION_STATUS_PAID } from '../../../../../../shared/constants/content';
import {
  PIANO_CONTAINER_LANDING_ASIDE,
  PIANO_CONTAINER_LANDING_ASIDE_2,
  PIANO_CONTAINER_LANDING_ASIDE_3,
  PIANO_PLACEHOLDER_ASIDE,
} from '../../../../../../shared/constants/piano';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_LEGAL_ADVICES } from '../../../components/TeaserGrid/gridConfigs/constants';
import { ROUTE_LEGAL_ADVICE } from '../../../constants';
import {
  LANDING_PAGE_LEGAL_ADVICE_PAGE_SIZE,
  PAGER_ANCHOR_SCROLL_ID,
} from '../../LandingPage/constants';
import { kmuCategories } from '../constants';
import grid from '../../../../../../common/assets/styles/grid.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch */
import variables from '../../../assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../LandingPage/typings';

type LandingPagePropsInner = LandingPageProps;

const LandingPageLegalAdvice = ({
  landingPage,
  location,
  page,
  legalAdvice,
}: LandingPagePropsInner): ReactElement => {
  const { waitForAuth, hasKMUAccess, queryParams } = useKmu(location);

  const category = legalAdvice?.category;

  const categoryTitle =
    'Alle Inhalte' + (category?.title ? ' zu ' + category?.title : '');

  const parentTitle = category?.parent?.title || 'Rechtsratgeber';

  const articles = legalAdvice?.articlesSearchResults?.articles.map(
    (article) => {
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
    },
  );

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  if (page !== 1 && !articles.length) {
    return <StatusPage />;
  }

  /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  return (
    (category && (
      <div className={`landing-page ${styles.Wrapper}`}>
        <div className={grid.Container}>
          <LegalAdviceSearch preserveScrollProgress={true} />
        </div>

        <div className={styles.HeaderWrapper}>
          {category?.parent?.path !== category?.path && (
            <Link
              className={classNames(grid.Container, styles.LinkBack)}
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              path={category.parent.path + `?${queryParams}#0`}
            >
              <span>{parentTitle}</span>
            </Link>
          )}

          <OverviewPageHeader
            title={landingPage?.title || category?.title || ''}
            lead={landingPage?.lead || category?.descriptionLong || ''}
            isLeadCollapsable
          />

          <EditButtons
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
            editContentUri={landingPage?.editContentUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            editRelationUri={landingPage?.editRelationUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            cloneContentUri={landingPage?.cloneContentUri}
          />
        </div>
        <div id={PAGER_ANCHOR_SCROLL_ID}>
          <div className={classNames(grid.Container)}>
            <div className={grid.Row}>
              <div
                className={classNames(grid.ColXs24, grid.ColMd15, grid.ColXl16)}
              >
                {category && (
                  <>
                    <div className={styles.CategoriesTitle}>
                      {categoryTitle} ({category.count})
                    </div>

                    {/* @ts-ignore TODO: TS2786 ->  'LegalAdviceCategories' cannot be used as a JSX component. */}
                    <LegalAdviceCategories
                      /* @ts-ignore TODO: TS2322 ->  Type 'LegalAdviceCategory[] | undefined' is not assignable to type 'LegalAdviceCategory[]'. */
                      categories={category.children}
                      location={location}
                    />

                    {category.level === 0 && hasKMUAccess && (
                      /* @ts-ignore TODO: TS2786 ->  'LegalAdviceCategories' cannot be used as a JSX component. */
                      <LegalAdviceCategories
                        categories={kmuCategories}
                        location={location}
                        label="KMU-Themen:"
                      />
                    )}
                  </>
                )}

                {!!legalAdvice?.articleTypes?.length && (
                  <LegalAdviceArticleTypes
                    types={legalAdvice.articleTypes}
                    location={location}
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
                      itemsCount={
                        legalAdvice.articlesSearchResults?.resultsNav
                          .totalResults || 0
                      }
                      itemsPerPage={LANDING_PAGE_LEGAL_ADVICE_PAGE_SIZE}
                      currentPage={page}
                      component={PAGER_TYPE_PAGE_LOADER}
                      anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
                    />
                  </>
                )}
              </div>

              <div
                className={classNames(grid.ColXs24, grid.ColMd9, grid.ColXl8)}
              >
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
    )) ||
    (!category && <StatusPage statusCode={404} />)
  );
};

export default compose<any, any>(
  withScrollToAnchor({ offset: variables.pageScrollOffset }),
  withHelmet({
    getNode: (mapProps: LandingPagePropsInner) => ({
      ...mapProps.landingPage,
      title: `${
        mapProps.landingPage?.title || mapProps.legalAdvice?.category?.title
      } | Beobachter`,
    }),
    getNodesCount: (mapProps: LandingPagePropsInner) =>
      mapProps?.landingPage?.grid?.count || 0,
    pageSize: LANDING_PAGE_LEGAL_ADVICE_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: LandingPagePropsInner) =>
      mapProps?.landingPage?.grid?.edges || [],
    hasBreadcrumbs: () => false,
  }),
)(LandingPageLegalAdvice);
