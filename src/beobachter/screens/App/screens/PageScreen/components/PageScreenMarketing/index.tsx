import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { linkFromSponsor } from '../../../../../../../common/components/SponsorBanner/helpers';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import useImpressionTracking from '../../../../../../../shared/hooks/useImpressionTracking';
import InView from '../../../../../../../common/components/InView';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import Paragraphs from '../../../../components/Paragraphs';
import EditButtons from './../../../../components/EditButtons';
import { MARKETING_PAGE } from '../../../../../../shared/actions/route';
import {
  ADVERTISING_TYPE_LONGFORM,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { STYLE_SCALEH_120 } from '../../../../../../../shared/constants/images';
import { PAGE_SCREEN_MARKETING_TYPE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenMarketingProps } from './typings';

const configIsVisible: InViewConfig = {
  rootMargin: `-${196}px 0px 0px 0px`,
};

const PageScreenMarketing = ({
  pageScreen,
  routePathname,
}: PageScreenMarketingProps): ReactElement => {
  const screenReady = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
  );
  const routeVertical = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).vertical,
  );

  const isMarketingPageReducedHeader = routeVertical === MARKETING_PAGE;
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
      data-testid="page-container"
      className={classNames('page-marketing-screen', styles.Wrapper, {
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
                                <div className={styles.Label}>
                                  {pageScreen.sponsor?.prefix === 'sponsored by'
                                    ? 'Präsentiert von'
                                    : pageScreen.sponsor?.prefix}
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
      <div
        data-testid="paragraphs-container"
        className={getRestrictedClassName(pageScreen.__typename)}
      >
        <Paragraphs
          colStyle={classNames(grid.ColOffsetXl4, grid.ColXs24, grid.ColXl16)}
          pageBody={pageScreen.body}
          origin={`${PAGE_SCREEN_MARKETING_TYPE}${
            (pageScreen.subtypeValue === ADVERTISING_TYPE_LONGFORM &&
              `-${ADVERTISING_TYPE_LONGFORM}`) ||
            ''
          }`}
          hasContainer={true}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={pageScreen?.channel?.suppressAds}
          isMarketingPageReducedHeader={isMarketingPageReducedHeader}
        />
      </div>
    </div>
  );
};

export default PageScreenMarketing;
