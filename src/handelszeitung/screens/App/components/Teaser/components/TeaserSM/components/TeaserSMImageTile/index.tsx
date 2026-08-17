import React, { ComponentType, memo } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import {
  getIsShortTitleHiddenByProps,
  getShortTitleElementByProps,
  getSponsorImageByProps,
} from '../../../../shared/helpers';
import Icon from '../../../../../Icon';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_AUTO,
} from '../../../../../SponsorImage';
import { ADVERTISING_TYPE_BRANDREPORT } from '../../../../../../../../../shared/constants/content';
import { STYLE_8X3_890 } from '../../../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';

type TeaserSMImageTileProps = TeaserFactoryProps & {
  cta?: string;
};

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_AUTO,
});

const getInnerContentByProps = ({
  cta,
  subtypeValue,
}: TeaserSMImageTileProps) => {
  if (subtypeValue !== ADVERTISING_TYPE_BRANDREPORT && cta) {
    return (
      <div className={styles.DedicatedPageLink}>
        {cta}
        <span className={styles.ArrowWrap}>
          <Icon type="IconArrowRight" />
        </span>
      </div>
    );
  }
  return null;
};

const getStylesByProps = ({ sponsor }: TeaserSMImageTileProps) => {
  return {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, styles.Link, {
      [styles.WrapperWithSponsor]: sponsor,
    }),
    ContentWrapper: classNames(styles.TeaserText, styles.InnerWrapper),
    Title: styles.TeaserTitleWrapper,
    TitleInner: styles.TeaserTitle,
    Image: classNames(styles.Image, TEASER_IMAGE_IDENTIFIER),
  };
};

const TeaserSMImageTile = teaserFactory({
  trackingTeaserHandler: withTeaserTrackingHandler,
  teaserImageStyles: {
    style_320: STYLE_8X3_890,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ sponsor } */
  sponsorImage: getSponsorImageByProps(
    styles.SponsorImageWrapper,
    SponsorImage,
  ),
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, shortTitle } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitleWrapper),
  isShortTitleHidden: getIsShortTitleHiddenByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ cta, subtypeValue, } */
  innerContent: getInnerContentByProps,
  styles: getStylesByProps,
}) as ComponentType<TeaserSMImageTileProps>;

export default memo(TeaserSMImageTile);
