import React, { ReactElement, memo } from 'react';
import specialFactory from '../../../../../../../common/components/Teaser/components/Special/factory';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import { IMAGE_GALLERY_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import {
  FULLSCREEN_HASH,
  FULLSCREEN_HASH_TEASER_CLICK,
} from '../../../../../../../shared/constants/fullscreen';
import {
  STYLE_16X9_340,
  STYLE_16X9_560,
  STYLE_2X1_1280,
  STYLE_2X1_800,
  STYLE_SCALEW_280,
} from '../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import { TeaserFactoryProps } from '../../../../../../../common/components/Teaser/typings';

type TeaserComponentsPropsInner = TeaserFactoryProps &
  TeaserInterface & {
    body: any;
  };

const TeaserSpecialHero = ({
  __typename,
  title,
  shortTitle,
  preferredUri,
  channel,
  body = {},
  teaserImage,
  trackingData,
  trackingSelector,
  openInFullscreen = false,
}: TeaserComponentsPropsInner) => {
  const firstFullscreenImageId: string | null =
    (Object.keys(body).length === 1 && Array.isArray(body) && body[0].id) ||
    null;

  const sponsorImagePath =
    channel?.sponsor?.teaserImage?.image?.file?.relativeOriginPath || '';
  const focalPointX =
    channel?.sponsor?.teaserImage?.image?.file?.focalPointX || null;
  const focalPointY =
    channel?.sponsor?.teaserImage?.image?.file?.focalPointY || null;
  const sponsorImageAlt = channel?.sponsor?.teaserImage?.image?.file?.alt || '';

  const specialImageSource: string = channel?.special?.logo?.source || '';

  /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  const partnerImg: ReactElement =
    (sponsorImagePath && (
      <Link
        path={channel?.sponsor?.teaserImage?.link?.path || ''}
        rel="sponsored"
      >
        <Picture
          relativeOrigin={sponsorImagePath}
          /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
          focalPointX={focalPointX}
          /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
          focalPointY={focalPointY}
          alt={sponsorImageAlt}
          className={styles.PartnerImage}
          style_320={STYLE_SCALEW_280}
          downloadPriority="high"
        />
      </Link>
    )) ||
    null;
  /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  const specialImg: ReactElement =
    (specialImageSource && (
      <Picture
        url={specialImageSource}
        className={styles.SpecialImage}
        alt={channel?.special?.title || ''}
        title={channel?.sponsor?.title || ''}
        disableWrapperClassName
        downloadPriority="high"
      />
    )) ||
    null;

  return specialFactory({
    title,
    /* @ts-ignore TODO: TS2322 ->  Type 'Channel | undefined' is not assignable to type 'Channel'. */
    channel,
    trackingSelector,
    trackingData,
    shortTitle,
    styles: {
      ContentWrapper: styles.ContentWrapper,
      Image: styles.Image,
      Title: styles.Title,
      ShortTitle: styles.ShortTitle,
      Wrapper: styles.Wrapper,
      SpecialWrapper: styles.SpecialWrapper,
      PartnerWrapper: styles.PartnerWrapper,
      SponsorWrapper: styles.SponsorWrapper,
    },
    specialImg,
    partnerImg,
    /* @ts-ignore TODO: TS2322 ->  Type '(ParagraphInterface & { __typename? */
    teaserImage,
    teaserImageStyles: {
      style_320: STYLE_16X9_340,
      style_540: STYLE_16X9_560,
      style_760: STYLE_2X1_800,
      style_1680: STYLE_2X1_1280,
    },
    teaserImageIdentifier: TEASER_IMAGE_IDENTIFIER,
    preferredUri:
      __typename === IMAGE_GALLERY_CONTENT_TYPE &&
      typeof firstFullscreenImageId === 'string' &&
      openInFullscreen
        ? preferredUri +
          `#${
            FULLSCREEN_HASH_TEASER_CLICK +
            FULLSCREEN_HASH +
            firstFullscreenImageId
          }`
        : preferredUri,
  });
};

export default memo<TeaserFactoryProps>(TeaserSpecialHero);
