import React, { ComponentType, memo } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import {
  getBadgeByProps,
  getIsShortTitleHiddenByProps,
  getShortTitleElementByProps,
  getSponsorImageByProps,
} from '../../../../shared/helpers';
import Icon from '../../../../../Icon';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_AUTO,
} from '../../../../../SponsorImage';
import { ADVERTISING_TYPE_BRANDREPORT } from '../../../../../../../../../shared/constants/content';
import {
  STYLE_16X9_360,
  STYLE_1X1_280,
  STYLE_2X3_280,
  STYLE_2X3_360,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';

type TeaserSImageTileProps = TeaserFactoryProps & {
  cta?: string;
};

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_AUTO,
});

const getInnerContentByProps = ({
  cta,
  subtypeValue,
}: TeaserSImageTileProps) => {
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

const getStylesByProps = ({ sponsor }: TeaserSImageTileProps) => {
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

const TeaserSImageTile = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, channel, link, } */
  badge: getBadgeByProps(styles.Badge),
  trackingTeaserHandler: withTeaserTrackingHandler,
  teaserImageStyles: {
    style_320: STYLE_1X1_280,
    style_760: STYLE_2X3_360,
    style_960: STYLE_2X3_280,
    style_1680: STYLE_16X9_360,
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
}) as ComponentType<TeaserSImageTileProps>;

export default memo(TeaserSImageTile);
