import React from 'react';
import { connect } from 'react-redux';

import { compose, lifecycle } from 'recompose';
import classNames from 'classnames';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../../../shared/decorators/withScrollToAnchor';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../../../shared/actions/header';
import Picture from '../../../../../../../common/components/Picture';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import SponsorBanner from '../../../../components/SponsorBanner';
import TeaserGrid from '../../../../components/TeaserGrid';
import VideoBlogOverview from './components/VideoBlogOverview';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import StatusPage from '../../../StatusPage';
import { STYLE_SCALEH_120 } from '../../../../../../../shared/constants/images';
import {
  MINISTAGE_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
  RANKING_LIST_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_LANDINGPAGE_DEFAULT } from '../../../../components/TeaserGrid/gridConfigs/constants';
import { CHANNEL_TYPE_VIDEO_BLOG } from '../../../../constants';
import {
  LANDING_PAGE_GRID_PAGE_SIZE,
  LANDING_PAGE_TYPE,
  PAGER_ANCHOR_SCROLL_ID,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps, VideoBlogOverviewProps } from '../../typings';

type LandingPagePropsInner = LandingPageProps & {
  setHeaderData: (props: HeaderState) => void;
  resetHeaderData: () => void;
};

const LandingPageDefault = ({
  landingPage,
  location,
  page,
}: LandingPagePropsInner) => {
  const isVideoBlogChannel =
    landingPage?.channel?.channelType === CHANNEL_TYPE_VIDEO_BLOG;

  if (
    !landingPage ||
    (page !== 1 && !landingPage.grid && !isVideoBlogChannel)
  ) {
    return <StatusPage />;
  }
  const showLandingPageTitle =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    landingPage.body.filter(
      (item: any) => item.__typename === RANKING_LIST_PARAGRAPH, // any due to wrong InterfaceParagraph type
    ).length > 0;

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

  const enrichedPageBody = [
    ...paragraphsWithoutAdEnrichment,
    ...enrichedBodyWithAds,
  ];

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
      <div className={classNames(styles.HeaderBackground)} />

      <Breadcrumbs
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        pageUrl={landingPage.preferredUri}
        addClass={sections.Container}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
        items={landingPage.activeMenuTrail}
      />
      {landingPage.sponsorLabel &&
        landingPage?.sponsor?.teaserImage?.image?.file?.relativeOriginPath &&
        !isVideoBlogChannel && (
          <SponsorBanner
            sponsor={landingPage.sponsor}
            isLabelOnTop
            label={landingPage.sponsorLabel || ''}
            backgroundColor={landingPage.sponsor?.colorCode || ''}
          >
            <Picture
              relativeOrigin={
                landingPage.sponsor.teaserImage.image.file.relativeOriginPath
              }
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={
                landingPage.sponsor.teaserImage.image.file?.focalPointX
              }
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={
                landingPage.sponsor.teaserImage.image.file?.focalPointY
              }
              style_320={STYLE_SCALEH_120}
              className={styles.SponsorBannerLogo}
              alt={landingPage.sponsor.teaserImage.image.file?.alt || ''}
            />
          </SponsorBanner>
        )}

      {showLandingPageTitle && (
        <div className={sections.Container}>
          {landingPage.title && (
            <h1 className={styles.Title}>{landingPage?.title}</h1>
          )}
          {landingPage.lead && (
            <p className={styles.Lead}>{landingPage?.lead}</p>
          )}
        </div>
      )}

      {isVideoBlogChannel && (
        <VideoBlogOverview
          {...({
            landingPage,
            location,
            page,
            enrichedPageBody,
          } as VideoBlogOverviewProps)}
        />
      )}

      {!isVideoBlogChannel && (
        <div className={getRestrictedClassName(landingPage.__typename)}>
          <div>
            <div className={sections.Container}>
              <h1 className={styles.Title}>{landingPage.title}</h1>
            </div>
          </div>
          <Paragraphs
            pageBody={enrichedPageBody}
            colStyle={grid.ColXs24}
            origin={LANDING_PAGE_TYPE}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
            isAdSuppressed={landingPage?.channel?.suppressAds}
          />
          {landingPage.grid && (
            <div id={PAGER_ANCHOR_SCROLL_ID}>
              <TeaserGrid
                layout={GRID_LAYOUT_LANDINGPAGE_DEFAULT}
                items={ensureTeaserInterface(landingPage.grid?.edges)}
              />
              <div>
                <Pager
                  itemsCount={landingPage?.grid?.count || 0}
                  itemsPerPage={LANDING_PAGE_GRID_PAGE_SIZE}
                  currentPage={page}
                  component={PAGER_TYPE_PAGE_LOADER}
                  anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

const withLifecycle = lifecycle<any, any>({
  // set and remove landingPage title based on current landingPage
  componentDidMount() {
    const activeChannel =
      (this.props?.landingPage?.activeMenuTrail?.edges &&
        Array.isArray(this.props.landingPage.activeMenuTrail.edges) &&
        this.props.landingPage.activeMenuTrail.edges.length > 0 &&
        this.props.landingPage.activeMenuTrail.edges[
          this.props.landingPage.activeMenuTrail.edges.length - 1
        ]) ||
      null;
    this.props.setHeaderData({
      title: activeChannel?.node?.label || '',
      contentType: 'LandingPage',
    });
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'prevProps' implicitly has an 'any' type. */
  componentDidUpdate(prevProps) {
    if (this.props.landingPage.title !== prevProps.landingPage.title) {
      const activeChannel =
        (this.props?.landingPage?.activeMenuTrail?.edges &&
          Array.isArray(this.props.landingPage.activeMenuTrail.edges) &&
          this.props.landingPage.activeMenuTrail.edges.length > 0 &&
          this.props.landingPage.activeMenuTrail.edges[
            this.props.landingPage.activeMenuTrail.edges.length - 1
          ]) ||
        null;
      this.props.setHeaderData({
        title: activeChannel?.node?.label || '',
        contentType: 'LandingPage',
      });
    }
  },
  componentWillUnmount() {
    this.props.resetHeaderData();
  },
});

export default compose<any, any>(
  connect(null, mapDispatchToProps),
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.landingPage || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps?.landingPage?.grid?.count || 0,
    pageSize: LANDING_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.landingPage?.grid?.edges || [],
  }),
  withScrollToAnchor(),
  withLifecycle,
)(LandingPageDefault);
