import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import ArrowButton from '../../../ArrowButton';
import { TeaserPropsInner } from '../../../Teaser';
import {
  STYLE_2X3_280,
  STYLE_SCALEW_280,
} from '../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../../Teaser/constants';
import styles from './styles.legacy.css';

type TeaserComponentsPropsInner = TeaserPropsInner &
  TeaserInterface & {
    channel?: Channel;
  };

const renderPartner = (
  { node: { title } }: any,
  index: number,
  edges: any,
): ReactElement | null => {
  if (!title) {
    return null;
  }
  return (
    <span
      key={`special-partner-key-${title || index}`}
      className={styles.SponsorItem}
    >
      {title}
      {index !== edges.length - 1 && (
        <>
          <span className={styles.Separator}>,</span>{' '}
        </>
      )}
    </span>
  );
};

const TeaserSpecialS = ({
  channel,
  trackingData,
  trackingSelector = '',
}: TeaserComponentsPropsInner): ReactElement => {
  const partnerImgPath: string =
    channel?.sponsor?.teaserImage?.image?.file?.relativeOriginPath || '';
  const partnerFocalPointX =
    channel?.sponsor?.teaserImage?.image?.file?.focalPointX || null;
  const partnerFocalPointY =
    channel?.sponsor?.teaserImage?.image?.file?.focalPointY || null;
  const partnerImgAlt: string =
    channel?.sponsor?.teaserImage?.image?.file?.alt || '';
  const specialImageSource: string = channel?.special?.logo?.source || '';

  const hasPartners =
    Array.isArray(channel?.partners?.edges) &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    channel?.partners?.edges?.length > 0;

  const partnerImg =
    (partnerImgPath && (
      <Link
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        path={channel?.sponsor?.teaserImage?.link?.path}
        rel="sponsored"
        className={classNames({
          [trackingSelector]: !!trackingSelector,
        })}
        /* @ts-ignore TODO: TS2322 ->  Type 'TrackingData[] | null' is not assignable to type 'any[] | undefined'. */
        trackingData={trackingData || null}
      >
        <Picture
          relativeOrigin={partnerImgPath}
          /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
          focalPointX={partnerFocalPointX}
          /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
          focalPointY={partnerFocalPointY}
          alt={partnerImgAlt}
          className={styles.PartnerImage}
          style_320={STYLE_SCALEW_280}
        />
      </Link>
    )) ||
    null;

  const specialImg =
    (specialImageSource && (
      <Picture
        url={specialImageSource}
        className={styles.SpecialImage}
        alt={channel?.special?.title || ''}
        title={channel?.sponsor?.title || ''}
      />
    )) ||
    null;

  const landingPageTeaserImgPath =
    channel?.landingPage?.teaserImage?.image?.file?.relativeOriginPath || '';
  const focalPointX =
    channel?.landingPage?.teaserImage?.image?.file?.focalPointX || null;
  const focalPointY =
    channel?.landingPage?.teaserImage?.image?.file?.focalPointY || null;
  const landingPageTeaserImgAlt =
    channel?.landingPage?.teaserImage?.image?.file?.alt || '';

  return (
    <div data-testid="teaser-factory-link-wrapper" className={styles.Wrapper}>
      <Link
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        path={channel?.landingPage?.preferredUri}
        className={classNames(styles.Link, {
          [trackingSelector]: !!trackingSelector,
        })}
        /* @ts-ignore TODO: TS2322 ->  Type 'TrackingData[] | null' is not assignable to type 'any[] | undefined'. */
        trackingData={trackingData || null}
      >
        <>
          {landingPageTeaserImgPath && (
            <div
              data-testid="teaser-factory-image-wrapper"
              className={styles.ImageWrapper}
            >
              <Picture
                relativeOrigin={landingPageTeaserImgPath}
                /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                focalPointX={focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                focalPointY={focalPointY}
                alt={landingPageTeaserImgAlt}
                className={classNames(TEASER_IMAGE_IDENTIFIER, styles.Image)}
                style_320={STYLE_2X3_280}
              />

              <div className={styles.SpecialWrapper}>{specialImg || null}</div>
              <div
                style={{
                  /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'BackgroundColor | undefined'. */
                  backgroundColor:
                    channel?.sponsor?.colorCode ||
                    channel?.special?.colorCode ||
                    null,
                }}
                className={styles.SponsorWrapper}
              />
            </div>
          )}
          <div className={styles.ContentWrapper}>
            <div className={styles.Title}>{channel?.landingPage?.title}</div>
            {channel?.landingPage?.shortTitle && (
              <div
                data-testid="teaser-factory-short-title-wrapper"
                className={styles.ShortTitle}
              >
                {channel?.landingPage?.shortTitle}
              </div>
            )}

            <ArrowButton addClass={styles.Button} small>
              Alle Stories
            </ArrowButton>
          </div>
        </>
      </Link>
      {(hasPartners || partnerImg) && (
        <div className={classNames(styles.SponsorContentWrapper)}>
          <div className={styles.PartnerWrapper}>{partnerImg}</div>
          {hasPartners && (
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            <div>{channel.partners.edges.map(renderPartner)}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeaserSpecialS;
