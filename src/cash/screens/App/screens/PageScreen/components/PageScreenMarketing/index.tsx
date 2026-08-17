import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { linkFromSponsor } from '../../../../../../../common/components/SponsorBanner/helpers';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import {
  INVESTMENT,
  VERTICAL_TITLES,
} from '../../../../../../shared/actions/route';
import useImpressionTracking from '../../../../../../../shared/hooks/useImpressionTracking';
import InView from '../../../../../../../common/components/InView';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import {
  ADVERTISING_TYPE_LONGFORM,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_TYPE_MARKETING,
} from '../../../../../../../shared/constants/content';
import { STYLE_SCALEH_120 } from '../../../../../../../shared/constants/images';
import {
  UTILITYBAR_INVESTMENT_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
import { PAGESCREEN_MARKETING_TYPE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenMarketingProps } from './typings';

const configIsVisible: InViewConfig = {
  rootMargin: `-${209}px 0px 0px 0px`,
};

const PageScreenMarketing = ({
  pageScreen,
  routePathname,
}: PageScreenMarketingProps): ReactElement => {
  let utilityConfig = null;

  if (pageScreen?.channel?.title === VERTICAL_TITLES[INVESTMENT]) {
    utilityConfig = UTILITYBAR_INVESTMENT_CONFIG;
  }
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const screenReady = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
  );

  const isMarketingPageReducedHeader =
    pageScreen.subtypeValue === PAGE_TYPE_MARKETING;
  const isNativeAdvertising: boolean =
    pageScreen.__typename === NATIVE_ADVERTISING_CONTENT_TYPE;
  useImpressionTracking({
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    trackingDetailImpression: pageScreen?.trackingDetailImpression,
    pathname: routePathname,
    screenReady,
    isNativeAdvertising,
  });

  return (
    <div
      className={classNames(`page-screen-default ${styles.Wrapper}`, {
        [grid.GridCentered]: isMarketingPageReducedHeader,
        [styles.Longform]:
          pageScreen.subtypeValue === ADVERTISING_TYPE_LONGFORM,
      })}
    >
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={pageScreen.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={pageScreen.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={pageScreen.cloneContentUri}
      />
      {pageScreen.subtypeValue === ADVERTISING_TYPE_LONGFORM &&
        pageScreen?.sponsor?.teaserImage?.image?.file?.relativeOriginPath && (
          <InView
            isInitialInView
            config={configIsVisible}
            reInitOnViewportLabelChange={false}
            reInitOnLocationChange={false}
          >
            {({ isInView }) => (
              <div className={styles.Placeholder}>
                <div
                  className={classNames(styles.SponsorBannerWrapper, {
                    [styles.Sticky]: !isInView,
                  })}
                >
                  <>
                    <div
                      style={{
                        backgroundColor: pageScreen.sponsor?.colorCode || '',
                      }}
                    >
                      <div className={sections.Section}>
                        <div className={styles.Banner}>
                          <div className={grid.Container}>
                            <div className={styles.LinkWrapper}>
                              <Link
                                /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
                                /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<Sponsor> | undefined' is not assignable to parameter of type 'Sponsor'. */
                                path={linkFromSponsor(pageScreen?.sponsor)}
                                rel="sponsored"
                                className={'sponsor-banner'}
                              >
                                <div className={styles.SponsorLabelWrapper}>
                                  <div className={styles.Label}>
                                    {pageScreen.sponsor?.prefix ===
                                    'sponsored by'
                                      ? 'Präsentiert von'
                                      : pageScreen.sponsor?.prefix}
                                  </div>
                                </div>
                                <Picture
                                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                                  relativeOrigin={
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    pageScreen.sponsor.teaserImage.image.file
                                      .relativeOriginPath
                                  }
                                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                                  focalPointX={
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    pageScreen.sponsor.teaserImage.image.file
                                      ?.focalPointX
                                  }
                                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                                  focalPointY={
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    pageScreen.sponsor.teaserImage.image.file
                                      ?.focalPointY
                                  }
                                  style_320={STYLE_SCALEH_120}
                                  className={styles.SponsorBannerLogo}
                                  alt={
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                                    pageScreen.sponsor.teaserImage.image.file
                                      ?.alt || ''
                                  }
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            )}
          </InView>
        )}
      <div className={getRestrictedClassName(pageScreen.__typename)}>
        <Paragraphs
          hasContainer
          pageBody={pageScreen.body}
          colStyle={classNames(grid.ColOffsetXl4, grid.ColXs24, grid.ColXl16)}
          origin={`${PAGESCREEN_MARKETING_TYPE}${
            (pageScreen.subtypeValue === ADVERTISING_TYPE_LONGFORM &&
              `-${ADVERTISING_TYPE_LONGFORM}`) ||
            ''
          }`}
          isMarketingPageReducedHeader={isMarketingPageReducedHeader}
        />
      </div>
      {utilityConfig &&
        !isHybridApp &&
        pageScreen.subtypeValue !== ADVERTISING_TYPE_LONGFORM && (
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
    </div>
  );
};

export default PageScreenMarketing;
