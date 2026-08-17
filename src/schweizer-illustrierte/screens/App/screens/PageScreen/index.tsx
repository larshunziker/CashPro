import React from 'react';
import { useSelector } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { linkFromSponsor } from '../../../../../common/components/SponsorBanner/helpers';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import useImpressionTracking from '../../../../../shared/hooks/useImpressionTracking';
import InView from '../../../../../common/components/InView';
import Link from '../../../../../common/components/Link';
import Picture from '../../../../../common/components/Picture';
import Breadcrumbs from '../../components/Breadcrumbs';
import EditButtons from '../../components/EditButtons';
import Head from '../../components/Head';
import Paragraphs from '../../components/Paragraphs';
import {
  ADVERTISING_TYPE_LONGFORM,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PAGE_TYPE_MARKETING,
  PAGE_TYPE_MARKETING_DEFAULT_HEADER,
} from '../../../../../shared/constants/content';
import { STYLE_SCALEH_120 } from '../../../../../shared/constants/images';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { PAGE_SCREEN_DEFAULT, PAGE_SCREEN_MARKETING_TYPE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenProps } from './typings';

type PageScreenPropsInner = PageScreenProps;

const configIsVisible: InViewConfig = {
  rootMargin: `-${150}px 0px 0px 0px`,
};

const PageScreen = ({ pageScreen, location }: PageScreenPropsInner) => {
  const isMarketingPage = [
    PAGE_TYPE_MARKETING,
    PAGE_TYPE_MARKETING_DEFAULT_HEADER,
    ADVERTISING_TYPE_LONGFORM,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  ].includes(pageScreen.subtypeValue);

  const screenReady = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
  );

  const isMarketingPageReducedHeader =
    pageScreen.subtypeValue === PAGE_TYPE_MARKETING;

  const isNativeAdvertising =
    pageScreen.__typename === NATIVE_ADVERTISING_CONTENT_TYPE;

  useImpressionTracking({
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    trackingDetailImpression: pageScreen?.trackingDetailImpression,
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    pathname: location.pathname,
    screenReady,
    isNativeAdvertising,
  });

  const origin =
    (isMarketingPage &&
      `${PAGE_SCREEN_MARKETING_TYPE}${
        (pageScreen.subtypeValue === ADVERTISING_TYPE_LONGFORM &&
          `-${ADVERTISING_TYPE_LONGFORM}`) ||
        ''
      }`) ||
    PAGE_SCREEN_DEFAULT;
  return (
    <div
      className={classNames({
        [styles.Wrapper]: isMarketingPage,
        [grid.GridCentered]: isMarketingPageReducedHeader,
        [styles.Longform]:
          pageScreen.subtypeValue === ADVERTISING_TYPE_LONGFORM,
      })}
      data-testid="page-container"
    >
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={pageScreen.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={pageScreen.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={pageScreen.cloneContentUri}
      />

      {!isMarketingPage &&
        pageScreen.preferredUri &&
        pageScreen.activeMenuTrail && (
          <Breadcrumbs
            pageUrl={pageScreen.preferredUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
            items={pageScreen.activeMenuTrail}
          />
        )}

      {!isMarketingPage && (
        <div data-testid="page-head-container" className={grid.Container}>
          <div className={grid.Row}>
            <div className={classNames(grid.GridCentered)}>
              <Head
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                shortTitle={pageScreen.shortTitle}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                title={pageScreen.title}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                lead={pageScreen.lead}
              />
            </div>
          </div>
        </div>
      )}

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
                </div>
              </div>
            )}
          </InView>
        )}

      <Paragraphs
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<ParagraphInterface>[]> | undefined' is not assignable to type 'ParagraphInterface[]'. */
        pageBody={pageScreen.body}
        origin={origin}
        hasContainer
        colStyle={classNames(
          grid.ColOffsetSm2,
          grid.ColSm20,
          grid.ColOffsetXl5,
          grid.ColXl14,
        )}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
        isAdSuppressed={pageScreen?.channel?.suppressAds}
        isMarketingPageReducedHeader={isMarketingPageReducedHeader}
      />
    </div>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: ({ pageScreen }: PageScreenPropsInner) => pageScreen,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
  }),
)(PageScreen);
