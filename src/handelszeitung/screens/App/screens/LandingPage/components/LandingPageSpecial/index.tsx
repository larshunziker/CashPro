import React from 'react';
import { connect } from 'react-redux';

import { compose, lifecycle } from 'recompose';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../../../shared/actions/header';
import Picture from '../../../../../../../common/components/Picture';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import SponsorBanner from '../../../../components/SponsorBanner';
import SponsoredBy from '../../../../components/SponsoredBy';
import TeaserGrid from '../../../../components/TeaserGrid';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import StatusPage from '../../../StatusPage';
import { STYLE_SCALEH_120 } from '../../../../../../../shared/constants/images';
import {
  MINISTAGE_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_LANDINGPAGE_DEFAULT } from '../../../../components/TeaserGrid/gridConfigs/constants';
import {
  LANDING_PAGE_GRID_PAGE_SIZE,
  LANDING_PAGE_TYPE,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../typings';

type LandingPagePropsInner = LandingPageProps & {
  setHeaderData: (props: HeaderState) => void;
  resetHeaderData: () => void;
};

const SPECIAL_SPONSORING_TITLE = 'special sponsored by';

const LandingPageSpecial = ({ landingPage, page }: LandingPagePropsInner) => {
  if (!landingPage || (page !== 1 && !landingPage.grid)) {
    return <StatusPage />;
  }

  const itemsCount = landingPage?.grid?.count || 0;

  const pageTitle =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    landingPage.activeMenuTrail.edges[
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      landingPage.activeMenuTrail.edges.length - 1
    ].node.label;

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
  return (
    <div className={`landing-page ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage.cloneContentUri}
      />

      <div className={sections.Container}>
        <Breadcrumbs
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          pageUrl={landingPage.preferredUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
          items={landingPage.activeMenuTrail}
        />
      </div>
      {landingPage.sponsorLabel &&
        landingPage?.sponsor?.teaserImage?.image?.file?.relativeOriginPath && (
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
        )}

      <div className={sections.Container}>
        <h1 className={styles.PageTitle}>{pageTitle}</h1>
      </div>

      <div className={getRestrictedClassName(landingPage.__typename)}>
        {landingPage.grid && (
          <div className={styles.Articles}>
            <TeaserGrid
              layout={GRID_LAYOUT_LANDINGPAGE_DEFAULT}
              items={ensureTeaserInterface(
                (landingPage.grid && landingPage.grid.edges) || null,
              )}
            />
            <div className={styles.PagerWrapper}>
              <Pager
                itemsCount={itemsCount}
                itemsPerPage={LANDING_PAGE_GRID_PAGE_SIZE}
                currentPage={page}
                component={PAGER_TYPE_PAGE_LOADER}
              />
            </div>
          </div>
        )}
        {(landingPage?.channel?.sponsors?.edges?.length || 0) > 0 && (
          <SponsoredBy
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            sponsors={landingPage.channel.sponsors}
            title={SPECIAL_SPONSORING_TITLE}
          />
        )}
        <Paragraphs
          pageBody={[...paragraphsWithoutAdEnrichment, ...enrichedBodyWithAds]}
          colStyle={grid.ColXs24}
          origin={LANDING_PAGE_TYPE}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={landingPage?.channel?.suppressAds}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const handleHeaderUpdate = (props) => {
  const activeChannel =
    (props?.landingPage?.activeMenuTrail?.edges &&
      Array.isArray(props.landingPage.activeMenuTrail.edges) &&
      props.landingPage.activeMenuTrail.edges.length > 0 &&
      props.landingPage.activeMenuTrail.edges[
        props.landingPage.activeMenuTrail.edges.length - 1
      ]) ||
    null;
  props.setHeaderData({
    title: activeChannel?.node?.label || '',
    contentType: 'LandingPage',
  });
};

const withLifecycle = lifecycle<any, any>({
  // set and remove landingPage title based on current landingPage
  componentDidMount() {
    handleHeaderUpdate(this.props);
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'prevProps' implicitly has an 'any' type. */
  componentDidUpdate(prevProps) {
    if (this.props.landingPage.title !== prevProps.landingPage.title) {
      handleHeaderUpdate(this.props);
    }
  },
  componentWillUnmount() {
    this.props.resetHeaderData(this.props);
  },
});

export default compose<any, any>(
  connect(null, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: LandingPagePropsInner) => mapProps.landingPage || null,
    getNodesCount: (mapProps: LandingPagePropsInner) =>
      mapProps.landingPage?.grid?.count || 0,
    pageSize: LANDING_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: LandingPagePropsInner) =>
      mapProps?.landingPage?.grid?.edges || [],
  }),
  withLifecycle,
)(LandingPageSpecial);
