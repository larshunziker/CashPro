import React, { ReactElement, memo } from 'react';
import specialFactory from '../../../../../../../common/components/Teaser/components/Special/factory';
import Picture from '../../../../../../../common/components/Picture';
import ArrowButton from '../../../ArrowButton';
import {
  STYLE_2X3_280,
  STYLE_3X2_440,
  STYLE_SCALEW_280,
} from '../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import { TeaserFactoryProps } from '../../../../../../../common/components/Teaser/typings';

type TeaserComponentsPropsInner = TeaserFactoryProps;

const TeaserSpecialM = ({
  title,
  preferredUri,
  channel,
  teaserImage,
  trackingData,
  trackingSelector,
  downloadPriority,
}: TeaserComponentsPropsInner) => {
  const partnerImgPath: string =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    channel?.sponsor?.teaserImage?.image?.file.relativeOriginPath || '';
  const focalPointX =
    channel?.sponsor?.teaserImage?.image?.file?.focalPointX || null;
  const focalPointY =
    channel?.sponsor?.teaserImage?.image?.file?.focalPointY || null;
  const partnerImgAlt: string =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    channel?.sponsor?.teaserImage?.image?.file.alt || '';
  const specialImageSource: string = channel?.special?.logo?.source || '';

  /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  const partnerImg: ReactElement =
    (partnerImgPath && (
      <Picture
        relativeOrigin={partnerImgPath}
        /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
        focalPointX={focalPointX}
        /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
        focalPointY={focalPointY}
        alt={partnerImgAlt}
        className={styles.PartnerImage}
        style_320={STYLE_SCALEW_280}
        downloadPriority={downloadPriority}
      />
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
        downloadPriority={downloadPriority}
      />
    )) ||
    null;

  return specialFactory({
    title,
    /* @ts-ignore TODO: TS2322 ->  Type 'Channel | undefined' is not assignable to type 'Channel'. */
    channel,
    trackingSelector,
    trackingData,
    preferredUri,
    shortTitle: '',
    button: (
      <div className={styles.Button}>
        <ArrowButton large>Alle Stories</ArrowButton>
      </div>
    ),
    styles: {
      ContentWrapper: styles.ContentWrapper,
      Image: styles.Image,
      Title: styles.Title,
      Wrapper: styles.Wrapper,
      SpecialWrapper: styles.SpecialWrapper,
      PartnerWrapper: styles.PartnerWrapper,
      SponsorWrapper: styles.SponsorWrapper,
    },
    specialImg,
    partnerImg,
    /* @ts-ignore TODO: TS2322 ->  Type 'ImageParagraph | undefined' is not assignable to type 'ImageParagraph'. */
    teaserImage,
    teaserImageStyles: {
      style_320: STYLE_3X2_440,
      style_760: STYLE_2X3_280,
    },
    teaserImageIdentifier: TEASER_IMAGE_IDENTIFIER,
    downloadPriority,
  });
};

export default memo<TeaserFactoryProps>(TeaserSpecialM);
