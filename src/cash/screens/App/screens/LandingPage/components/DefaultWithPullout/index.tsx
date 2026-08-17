import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import { isWarning } from '../../helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { WithHelmetProps } from '../../../../../../../shared/decorators/@types/withHelmetFactory';
import withScrollOnLoad from '../../../../../../../shared/decorators/withScrollOnLoad';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import {
  INVESTMENT,
  VERTICAL_TITLES,
} from '../../../../../../shared/actions/route';
import InView from '../../../../../../../common/components/InView';
import Picture from '../../../../../../../common/components/Picture';
import AppNexus from '../../../../components/AppNexus';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Paragraphs from '../../../../components/Paragraphs';
import SponsorBanner from '../../../../components/SponsorBanner';
import TeaserGrid from '../../../../components/TeaserGrid';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityHeaderBar from '../../../../components/UtilityBar/components/UtilityHeaderBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import StatusPage from '../../../StatusPage';
import OverviewPageHeader from '../OverviewPageHeader';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import { TOP_AD_1 } from '../../../../../../../shared/constants/adZone';
import { STYLE_SCALEH_120 } from '../../../../../../../shared/constants/images';
import { ROOT_SCHEMA_TYPE_ORGANIZATION } from '../../../../../../../shared/constants/structuredData';
import {
  getAdSlotNameByEntryIndex,
  getAdSlotNameByEntryIndexOnError,
} from '../../../../components/AppNexus/constants';
import { GRID_LAYOUT_LANDINGPAGE_DEFAULT } from '../../../../components/TeaserGrid/gridConfigs/constants';
import {
  UTILITYBAR_INVESTMENT_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
import {
  LANDING_PAGE_GRID_PAGE_SIZE,
  LANDING_PAGE_TYPE,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../typings';

type LandingPagePropsInner = LandingPageProps & WithHelmetProps;

const PAGER_ANCHOR_SCROLL_ID = 'page';

const LandingPageDefault = ({ landingPage, page }: LandingPagePropsInner) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  if (!landingPage) {
    return null;
  }
  if (page !== 1 && !landingPage.grid) {
    return <StatusPage />;
  }

  let utilityConfig = null;

  if (landingPage?.channel?.title === VERTICAL_TITLES[INVESTMENT]) {
    utilityConfig = UTILITYBAR_INVESTMENT_CONFIG;
  }

  const preparedBodyWithAds = enrichOverviewBodyWithADs({
    pageBody: landingPage?.body,
    hasEQsWithMMR: true,
    ignoreFirstIndexLogic: true,
    enhanceAdslotByEntryIndex: isWarning(landingPage?.body)
      ? getAdSlotNameByEntryIndexOnError
      : getAdSlotNameByEntryIndex,
    noLastSlotOverride: true,
  });

  const bannerType = (): string => {
    const format = landingPage?.sponsor?.teaserImage?.format;
    if (format === 'landscape') {
      return styles.LandscapeBanner;
    } else if (format === 'portrait') {
      return styles.PortraitBanner;
    } else if (format === 'square') {
      return styles.SquareBanner;
    }
    return '';
  };

  const configIsVisible = {
    rootMargin: `${60 - 12 * 2 - 1}px 0px 0px 0px`,
  };
  const configIsCollapsed = {
    rootMargin: `-${60 - 12 + 2}px 0px 0px 0px`,
  };

  const isSocialBarVisible = VERTICAL_TITLES[INVESTMENT].includes(
    landingPage?.channel?.title || '',
  );

  return (
    <>
      {
        <InView
          isInitialInView
          config={configIsVisible && configIsCollapsed}
          isObserveDelayed
        >
          {({ isInView }) => {
            return (
              !isHybridApp && (
                <UtilityHeaderBar
                  isScrolledToCollapse={!isInView}
                  articleData={landingPage as ArticleData}
                  isSocialBarVisible={isSocialBarVisible}
                  enabledUtilities={UTILITYBAR_INVESTMENT_CONFIG}
                  enabledOverlayUtilities={UTILITYBAR_OVERLAY_CONFIG}
                  showTitle={false}
                />
              )
            );
          }}
        </InView>
      }
      {(!landingPage?.channel?.suppressAds && (
        <div className="ad-wrapper ad-wrapper-mobile">
          <AppNexus slot={TOP_AD_1} deviceType="mobile" />
        </div>
      )) ||
        null}
      <div className={styles.Wrapper} data-testid="landing-page-wrapper">
        {(!isHybridApp && (
          <Breadcrumbs
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            pageUrl={landingPage.preferredUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
            items={landingPage.activeMenuTrail}
          />
        )) ||
          null}
        {landingPage?.sponsor?.teaserImage?.image?.file?.relativeOriginPath && (
          <SponsorBanner
            sponsor={landingPage.sponsor}
            isLabelOnTop
            label={landingPage?.sponsorLabel || ''}
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
              className={classNames(styles.SponsorBannerLogo, bannerType())}
              alt={landingPage.sponsor.teaserImage.image.file?.alt || ''}
            />
          </SponsorBanner>
        )}
        <OverviewPageHeader
          title={landingPage?.title || ''}
          lead={landingPage?.lead || ''}
        />
      </div>
      <div className={getRestrictedClassName(landingPage.__typename)}>
        <Paragraphs
          pageBody={preparedBodyWithAds}
          origin={LANDING_PAGE_TYPE}
          colStyle={grid.ColXs24}
          hasContainer={true}
          landingPagePullOut
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={landingPage?.channel?.suppressAds}
        />
      </div>
      {landingPage.grid && (
        <div id={PAGER_ANCHOR_SCROLL_ID}>
          <TeaserGrid
            layout={GRID_LAYOUT_LANDINGPAGE_DEFAULT}
            items={ensureTeaserInterface(landingPage.grid?.edges)}
          />
          <div className={styles.PagerWrapper}>
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
      {utilityConfig && !isHybridApp && (
        <BodyClassName className="">
          <div
            className={classNames(
              'utility-bar-wrapper',
              styles.UtilityBarWrapper,
            )}
          >
            <UtilityBar enabledUtilities={utilityConfig}>
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
    </>
  );
};

export default compose<any, any>(
  withScrollOnLoad({ offset: 270 }),
  withHelmet({
    /* @ts-ignore TODO: TS7031 ->  Binding element 'landingPage' implicitly has an 'any' type. */
    getNode: ({ landingPage }) => landingPage,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'landingPage' implicitly has an 'any' type. */
    getNodesCount: ({ landingPage }) => landingPage?.grid?.count || 0,
    pageSize: LANDING_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_ORGANIZATION,
  }),
)(LandingPageDefault);
