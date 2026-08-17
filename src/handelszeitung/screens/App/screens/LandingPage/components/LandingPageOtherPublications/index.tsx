import React, { memo } from 'react';

import { compose } from 'recompose';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import {
  getAllArticles,
  getRestrictedClassName,
} from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../../../shared/decorators/withScrollToAnchor';
import Picture from '../../../../../../../common/components/Picture';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import EditButtons from '../../../../components/EditButtons';
import OverviewPageHeader from '../../../../components/OverviewPageHeader';
import Paragraphs from '../../../../components/Paragraphs';
import SponsorBanner from '../../../../components/SponsorBanner';
import TeaserGrid from '../../../../components/TeaserGrid';
import StatusPage from './../../../StatusPage';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import { STYLE_SCALEH_120 } from '../../../../../../../shared/constants/images';
import {
  MINISTAGE_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../../shared/constants/publications';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import {
  OVERVIEW_PAGE_HEADER_BILANZ,
  OVERVIEW_PAGE_HEADER_DEFAULT,
} from '../../../../components/OverviewPageHeader/constants';
import {
  GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS,
  GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST,
} from '../../../../components/TeaserGrid/gridConfigs/constants';
import {
  LANDING_PAGE_BILANZ_HOME,
  LANDING_PAGE_GRID_PAGE_SIZE,
  LANDING_PAGE_HZB_HOME,
  LANDING_PAGE_SV_HOME,
  LANDING_PAGE_TYPE_BILANZ,
  LANDING_PAGE_TYPE_HZB,
  LANDING_PAGE_TYPE_HZB_HOME,
  LANDING_PAGE_TYPE_SV,
  LANDING_PAGE_TYPE_SV_HOME,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../typings';

export type LandingPageOtherPublicationsPropsInner = LandingPageProps & {
  landingPage: LandingPage;
};

const PAGER_ANCHOR_SCROLL_ID = 'page';

const LandingPageOtherPublications = ({
  landingPage,
  page,
  location,
}: LandingPageOtherPublicationsPropsInner) => {
  const gridItems =
    (Array.isArray(landingPage?.grid?.edges) &&
      (landingPage?.grid?.edges?.length || 0) > 0 &&
      landingPage?.grid) ||
    null;

  if (!landingPage || (page !== 1 && !landingPage.grid)) {
    return (
      <TestFragment data-testid="notfound-wrapper">
        <StatusPage />
      </TestFragment>
    );
  }
  const publication = landingPage.publication || '';

  const isHome =
    location.pathname === LANDING_PAGE_BILANZ_HOME ||
    location.pathname === LANDING_PAGE_SV_HOME ||
    location.pathname === LANDING_PAGE_HZB_HOME;

  let paragraphsOrigin = '';

  // Our stack is only working correctly for ADs with an EQ on first position
  // because of the weird rule to show either MMR1 on top OR inside the EQ on second position
  // These Ministages on HZ are an exception to that rule so we take it out of the ADs logic here.
  let paragraphsWithoutAdEnrichment = [];
  let landingPageBody = landingPage.body as any; // TODO: change to ParagraphInterface when it'll be typed correctly
  if (
    Array.isArray(landingPageBody) &&
    landingPageBody.length > 0 &&
    [MINISTAGE_PARAGRAPH, PIANO_TEMPLATE_PARAGRAPH].includes(
      landingPageBody[0].__typename,
    )
  ) {
    paragraphsWithoutAdEnrichment = landingPageBody.slice(0, 1);
    landingPageBody = landingPageBody.slice(1);
  }

  const enrichedBodyWithAds = enrichOverviewBodyWithADs({
    pageBody: landingPageBody,
    hasEQsWithMMR: true,
  });

  const hasEntityQueue = landingPageBody?.filter(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'paragraph' implicitly has an 'any' type. */
    (paragraph) => paragraph?.__typename === 'EntityQueueParagraph',
  );

  const teaserGridLayout = hasEntityQueue
    ? GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS
    : GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST;

  switch (publication) {
    case PUBLICATION_BIL:
      paragraphsOrigin = LANDING_PAGE_TYPE_BILANZ;
      break;

    case PUBLICATION_SWISS_INSURANCE:
      if (isHome) {
        paragraphsOrigin = LANDING_PAGE_TYPE_SV_HOME;
      } else {
        paragraphsOrigin = LANDING_PAGE_TYPE_SV;
      }
      break;
    case PUBLICATION_HZB:
      if (isHome) {
        paragraphsOrigin = LANDING_PAGE_TYPE_HZB_HOME;
      } else {
        paragraphsOrigin = LANDING_PAGE_TYPE_HZB;
      }
      break;
  }

  return (
    <div
      className={`landing-page-${publication.replace('_', '-')} ${
        styles.Wrapper
      }`}
    >
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage.cloneContentUri}
      />
      <div className={styles.InnerWrapper}>
        <div
          data-testid="header-background-wrapper"
          className={styles.HeaderBackground}
        />

        <div className={grid.Container}>
          <Breadcrumbs
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            pageUrl={landingPage.preferredUri}
            addClass={styles.Breadcrumbs}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
            items={landingPage.activeMenuTrail}
          />
        </div>
        {landingPage?.sponsor?.teaserImage?.image?.file?.relativeOriginPath && (
          <TestFragment data-testid="landing-page-sponsor-banner-wrapper">
            <SponsorBanner
              sponsor={landingPage.sponsor}
              isLabelOnTop
              label={landingPage.sponsorLabel || ''}
              backgroundColor={landingPage.sponsor?.colorCode || ''}
            >
              <Picture
                relativeOrigin={
                  landingPage?.sponsor?.teaserImage?.image?.file
                    ?.relativeOriginPath
                }
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointX={
                  landingPage?.sponsor?.teaserImage?.image?.file?.focalPointX
                }
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointY={
                  landingPage?.sponsor?.teaserImage?.image?.file?.focalPointY
                }
                style_320={STYLE_SCALEH_120}
                className={styles.SponsorBannerLogo}
                alt={landingPage?.sponsor?.teaserImage?.image?.file?.alt || ''}
              />
            </SponsorBanner>
          </TestFragment>
        )}
      </div>
      {!isHome && (
        <TestFragment data-testid="overview-page-header-wrapper">
          <OverviewPageHeader
            component={
              (publication === PUBLICATION_BIL &&
                OVERVIEW_PAGE_HEADER_BILANZ) ||
              OVERVIEW_PAGE_HEADER_DEFAULT
            }
            title={landingPage.title}
            lead={landingPage.lead}
          />
        </TestFragment>
      )}
      <div
        className={getRestrictedClassName(landingPage.__typename)}
        data-testid="page-content-wrapper"
      >
        <Paragraphs
          pageBody={[...paragraphsWithoutAdEnrichment, ...enrichedBodyWithAds]}
          colStyle={grid.ColXs24}
          origin={paragraphsOrigin}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={landingPage?.channel?.suppressAds}
        />
        {gridItems && (
          <div id={PAGER_ANCHOR_SCROLL_ID} data-testid="grid-wrapper">
            {publication === PUBLICATION_SWISS_INSURANCE && isHome && (
              <div
                className={grid.Container}
                data-testid="teaser-grid-title-wrapper"
              >
                <h2 className={styles.TeaserGridTitle}>Alle Artikel</h2>
              </div>
            )}
            <TeaserGrid
              layout={teaserGridLayout}
              items={ensureTeaserInterface(gridItems.edges || null)}
            />
            <Pager
              itemsCount={gridItems.count || 0}
              itemsPerPage={LANDING_PAGE_GRID_PAGE_SIZE}
              currentPage={page}
              component={PAGER_TYPE_PAGE_LOADER}
              anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: LandingPageOtherPublicationsPropsInner) =>
      mapProps.landingPage || null,
    getNodesCount: (mapProps: LandingPageOtherPublicationsPropsInner) =>
      mapProps?.landingPage?.grid?.count || null,
    pageSize: LANDING_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: LandingPageOtherPublicationsPropsInner) =>
      getAllArticles(mapProps.landingPage),
  }),
  withScrollToAnchor(),
)(memo(LandingPageOtherPublications));
