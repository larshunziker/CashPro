import React, { ReactElement } from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../../../shared/decorators/withScrollToAnchor';
import Picture from '../../../../../../../common/components/Picture';
import AsideMostRead from '../../../../components/AsideMostRead';
import EditButtons from '../../../../components/EditButtons';
import OverviewPageHeader from '../../../../components/OverviewPageHeader';
import Paragraphs from '../../../../components/Paragraphs';
import SponsorBanner from '../../../../components/SponsorBanner';
import TeaserGrid from '../../../../components/TeaserGrid';
import StatusPage from '../../../StatusPage';
import VideoBlogOverview from './components/VideoBlogOverview';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../../../components/Pager';
import { STYLE_LARGE } from '../../../../../../../shared/constants/images';
import { ENTITY_QUEUE_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_CHANNEL_PAGE_DEFAULT } from '../../../../components/TeaserGrid/gridConfigs/constants';
import { CHANNEL_TYPE_VIDEO_BLOG } from '../../../../constants';
import {
  LANDING_PAGE_GRID_PAGE_SIZE,
  LANDING_PAGE_TYPE,
  PAGER_ANCHOR_SCROLL_ID,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/ra */
import variables from '../../../../assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';
import { AppNexusFactoryProps } from '../../../../../../../common/components/AppNexus/typings';
import { LandingPageProps } from '../../typings';

type LandingPagePropsInner = LandingPageProps &
  Pick<AppNexusFactoryProps, 'isAdSuppressed'>;

const LandingPageDefault = ({
  landingPage,
  location,
  page,
  origin,
  isAdSuppressed,
}: LandingPagePropsInner): ReactElement => {
  const channel = landingPage.channel || null;
  const isVideoBlogChannel = channel?.channelType === CHANNEL_TYPE_VIDEO_BLOG;

  if (page !== 1 && !isVideoBlogChannel && !landingPage.grid) {
    return <StatusPage />;
  }

  if (!landingPage) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  /**
   * Sub-pages like /specials/wallis request the same landingPage again later/before
   * which is then wrongly served from hydration with the originally requested landingPage
   * because it has the same path value. Which results in a 404 flashing on SSR.
   * This landingPageCachebuster '?isVideoBlogChannel' prevents that. It uses the correct cached data.
   */

  const sponsorImageFile =
    landingPage?.sponsor?.teaserImage?.image?.file || null;

  /* INFO: entity queue paragraph has blurred background on first item and there will be a darkish background image
  so the breadcrumbs will be displayed in a white font. There are some cases (/newsletter, /service/registrierung-via-beo-app-erfolgreich)
  where the first paragraph is different than entity queue. In this case we need to display a dark breadcrumb */
  const landingPageBody = landingPage?.body as any;

  // Check if first paragraph is entity queue
  const hasEQsWithMMR =
    landingPageBody?.paragraphs?.[0]?.__typename === ENTITY_QUEUE_PARAGRAPH;

  const enrichedLandingPageBody = enrichOverviewBodyWithADs({
    pageBody: landingPageBody,
    hasEQsWithMMR,
  });

  return (
    <div className={`landing-page ${styles.Wrapper}`}>
      <OverviewPageHeader
        title={landingPage?.title || ''}
        lead={(isVideoBlogChannel && landingPage?.lead) || ''}
        isCentered={landingPage.landingPageType !== null}
      />

      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage?.cloneContentUri}
      />

      {sponsorImageFile?.relativeOriginPath && (
        <SponsorBanner
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Sponsor> | undefined' is not assignable to type 'Sponsor | undefined'. */
          sponsor={landingPage.sponsor}
          label={landingPage?.sponsorLabel || ''}
          backgroundColor={landingPage?.sponsor?.colorCode || ''}
        >
          <Picture
            relativeOrigin={sponsorImageFile?.relativeOriginPath}
            alt={sponsorImageFile?.alt || ''}
            className={styles.SponsorBannerLogo}
            style_320={STYLE_LARGE}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointX={sponsorImageFile?.focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointY={sponsorImageFile?.focalPointY}
          />
        </SponsorBanner>
      )}

      {isVideoBlogChannel && (
        <VideoBlogOverview
          landingPage={landingPage}
          enrichedLandingPageBody={enrichedLandingPageBody}
          isAdSuppressed={isAdSuppressed}
          page={page}
          location={location}
        />
      )}

      {!isVideoBlogChannel && (
        <div className={getRestrictedClassName(landingPage.__typename)}>
          <Paragraphs
            pageBody={enrichedLandingPageBody}
            colStyle={grid.ColXs24}
            origin={origin || LANDING_PAGE_TYPE}
            addClass={classNames({
              [styles.SponsoredWrapper]: sponsorImageFile?.relativeOriginPath,
            })}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
            isAdSuppressed={isAdSuppressed || landingPage?.channel?.suppressAds}
          />

          {landingPage.grid && (
            <div id={PAGER_ANCHOR_SCROLL_ID}>
              <div className={classNames(grid.Container)}>
                <div className={grid.Row}>
                  <div
                    className={classNames(
                      grid.ColXs24,
                      grid.ColMd15,
                      grid.ColXl16,
                    )}
                  >
                    <TeaserGrid
                      layout={GRID_LAYOUT_CHANNEL_PAGE_DEFAULT}
                      items={ensureTeaserInterface(
                        (landingPage.grid && landingPage.grid.edges) || null,
                      )}
                    />

                    <Pager
                      addClass={styles.PagerWrapper}
                      itemsCount={
                        (landingPage.grid && landingPage.grid.count) || 0
                      }
                      itemsPerPage={LANDING_PAGE_GRID_PAGE_SIZE}
                      currentPage={page}
                      component={PAGER_TYPE_PAGE_LOADER}
                      anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
                    />
                  </div>

                  <div
                    className={classNames(
                      grid.ColXs24,
                      grid.ColMd9,
                      grid.ColXl8,
                    )}
                  >
                    <div className={styles.Sidebar}>
                      <div className={styles.Sticky}>
                        <AsideMostRead />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default compose<any, any>(
  withScrollToAnchor({ offset: variables.pageScrollOffset }),
  withHelmet({
    getNode: (mapProps: LandingPagePropsInner) => mapProps.landingPage || null,
    getNodesCount: (mapProps: LandingPagePropsInner) =>
      mapProps?.landingPage?.grid?.count || 0,
    pageSize: LANDING_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: LandingPagePropsInner) =>
      mapProps?.landingPage?.grid?.edges || [],
    hasBreadcrumbs: () => false,
  }),
)(LandingPageDefault);
