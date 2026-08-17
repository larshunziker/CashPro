import React from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
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
import {
  STYLE_1X1_280,
  STYLE_1x2_218,
  STYLE_2X3_360,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';

type TeaserXSImageTileProps = TeaserFactoryProps & {
  cta: string;
};

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_AUTO,
});

const getInnerContentByProps = ({ cta }: TeaserXSImageTileProps) => {
  if (!cta) {
    return null;
  }
  return (
    <div className={styles.DedicatedPageLink}>
      {cta}
      <span className={styles.ArrowWrap}>
        <Icon type="IconArrowRight" />
      </span>
    </div>
  );
};

const getStylesByProps = ({ sponsor }: TeaserXSImageTileProps) => {
  return {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, styles.Link, {
      [styles.WrapperWithSponsor]: sponsor,
    }),
    ImageWrapper: styles.ImageWrapper,
    ContentWrapper: classNames(styles.TeaserText, styles.InnerWrapper),
    Title: styles.TeaserTitleWrapper,
    TitleInner: styles.TeaserTitle,
    Image: classNames(styles.Image, TEASER_IMAGE_IDENTIFIER),
  };
};

const TeaserXSImageTile = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, channel, link, } */
  badge: getBadgeByProps(styles.Badge),
  trackingTeaserHandler: withTeaserTrackingHandler,
  teaserImageStyles: {
    style_320: STYLE_1X1_280,
    style_540: STYLE_2X3_360,
    style_760: STYLE_1x2_218,
    style_1680: STYLE_1X1_280,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ sponsor } */
  sponsorImage: getSponsorImageByProps(
    styles.SponsorImageWrapper,
    SponsorImage,
  ),
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, shortTitle } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitleWrapper),
  isShortTitleHidden: getIsShortTitleHiddenByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ cta } */
  innerContent: getInnerContentByProps,
  styles: getStylesByProps,
});

const withUpdatePolicy = shouldUpdate<any>(
  (props: TeaserXSImageTileProps, nextProps: TeaserXSImageTileProps) =>
    props.title !== nextProps.title,
);

export default compose<any, any>(withUpdatePolicy)(TeaserXSImageTile);
