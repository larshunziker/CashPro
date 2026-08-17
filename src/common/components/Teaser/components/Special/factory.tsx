import React, { ReactElement } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Link from '../../../Link';
import Picture from '../../../Picture';
import { TRACKING_CLASS_TEASER } from '../../../../../shared/constants/tracking';
import { SpecialFactoryOptions, SpecialFactoryOptionsStyles } from './typings';

type RenderTeaserParams = {
  button: ReactElement;
  styles: SpecialFactoryOptionsStyles;
  title: string;
  shortTitle: string;
  channel: Channel;
  teaserImage: ImageParagraph;
  specialImg: ReactElement;
  partnerImg: ReactElement;
  teaserImageIdentifier?: string;
  teaserImageStyles: ImageStylesObject;
  downloadPriority?: 'high' | 'default';
};

const renderTeaser = ({
  button,
  styles,
  title,
  shortTitle,
  channel,
  teaserImage,
  specialImg,
  partnerImg,
  teaserImageIdentifier,
  teaserImageStyles,
}: RenderTeaserParams): ReactElement => {
  const teaserImgPath = teaserImage?.image?.file?.relativeOriginPath || '';
  const teaserImgAlt = teaserImage?.image?.file?.alt || '';
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const focalPointX = teaserImage?.image?.file.focalPointX || null;
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const focalPointY = teaserImage?.image?.file.focalPointY || null;

  return (
    <>
      {(teaserImgPath && (
        <div
          data-testid="teaser-factory-image-wrapper"
          className={styles.ImageWrapper}
        >
          <Picture
            relativeOrigin={teaserImgPath}
            alt={teaserImgAlt}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointX={focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointY={focalPointY}
            className={classNames(teaserImageIdentifier, styles.Image)}
            {...teaserImageStyles}
            downloadPriority="high"
          />
        </div>
      )) ||
        null}
      <div className={styles.ContentWrapper}>
        <div className={styles.SpecialWrapper}>{specialImg || null}</div>
        <div className={styles.PartnerWrapper}>{partnerImg || null}</div>
        {shortTitle && (
          <div
            data-testid="teaser-factory-short-title-wrapper"
            className={styles.ShortTitle}
          >
            {shortTitle}
          </div>
        )}
        <div className={styles.Title}>{title}</div>
        {button || null}
        <div
          style={{
            /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'BackgroundColor | undefined'. */
            backgroundColor:
              channel?.sponsor?.colorCode ||
              channel?.special?.colorCode ||
              null,
          }}
          className={styles.SponsorWrapper}
        >
          {channel &&
            channel.partners &&
            channel.partners.edges &&
            Array.isArray(channel.partners.edges) &&
            channel.partners.edges.length > 0 &&
            /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<SponsorEdge>'. */
            channel.partners.edges.map(({ node }, index) => {
              if (!node?.title) {
                return null;
              }
              return (
                <span key={`special-partner-key-${index}`}>
                  {node.title}
                  {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                  {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                  {index !== channel.partners.edges.length - 1 && ', '}
                </span>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ({
  title,
  shortTitle,
  trackingData,
  trackingSelector = '',
  preferredUri,
  button,
  channel,
  styles,
  specialImg,
  partnerImg,
  teaserImage,
  teaserImageIdentifier,
  teaserImageStyles,
  downloadPriority,
}: SpecialFactoryOptions): ReactElement => (
  <>
    {(preferredUri && (
      <TestFragment data-testid="teaser-factory-link-wrapper">
        <Link
          path={preferredUri}
          className={classNames(styles.Wrapper, TRACKING_CLASS_TEASER, {
            [trackingSelector]: !!trackingSelector,
          })}
          /* @ts-ignore TODO: TS2322 ->  Type 'TrackingData[] | null' is not assignable to type 'any[] | undefined'. */
          trackingData={trackingData || null}
        >
          {renderTeaser({
            styles,
            title,
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            shortTitle,
            channel,
            teaserImage,
            specialImg,
            partnerImg,
            /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | undefined' is not assignable to type 'ReactElement<any,  */
            button,
            teaserImageIdentifier,
            teaserImageStyles,
            downloadPriority,
          })}
        </Link>
      </TestFragment>
    )) || (
      <div
        data-testid="teaser-factory-anchor-link-wrapper"
        className={styles.Wrapper}
      >
        {renderTeaser({
          styles,
          title,
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          shortTitle,
          channel,
          teaserImage,
          specialImg,
          partnerImg,
          /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | undefined' is not assignable to type 'ReactElement<any,  */
          button,
          teaserImageIdentifier,
          teaserImageStyles,
          downloadPriority,
        })}
      </div>
    )}
  </>
);
