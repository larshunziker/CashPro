import React from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryOptionsStyles,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../common/components/Teaser/helpers';
import {
  getDomain,
  getFormattedPublicationDateByProps,
  getTitleBadgeByProps,
} from '../../shared/helpers';
import TeaserBadge from '../../components/TeaserBadge';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_BRANDREPORT_LABEL,
  ADVERTISING_TYPE_EXTERNAL,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ARTICLE_TYPE_ASSOCIATION,
  ARTICLE_TYPE_ASSOCIATION_LABEL,
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_LONG_READ_LABEL,
  ARTICLE_TYPE_SEATCHANGE,
  ARTICLE_TYPE_SEATCHANGE_LABEL,
  CHANNEL_TYPE_SPECIAL,
  CHANNEL_TYPE_SPECIAL_LABEL,
} from '../../../../../../../shared/constants/content';
import {
  STYLE_16X9_220,
  STYLE_16X9_280,
  STYLE_1X1_250,
} from '../../../../../../../shared/constants/images';
import { LOGO_ABO_BADGE_S } from '../../../Logo/constants';
import { TEASER_IMAGE_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../typings';

type TeaserRecommendationsPropsInner = TeaserProps;

const getStylesByProps = ({
  addClass,
  subtypeValue,
}: TeaserRecommendationsPropsInner): TeaserFactoryOptionsStyles => ({
  OuterWrapper: styles.OuterWrapper,
  Wrapper: classNames('teaser-recommendations', styles.Wrapper, {
    addClass: !!addClass,
  }),
  ImageWrapper: styles.ImageWrapper,
  Image: classNames(styles.Image, TEASER_IMAGE_IDENTIFIER),
  ContentWrapper: styles.ContentWrapper,
  Title: styles.Title,
  TitleInner: styles.TitleInner,
  BottomLine: styles.BottomLine,
  ShortTitle: classNames(styles.ShortTitle, {
    [styles.ShortTitleAdvertorial]:
      subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
    [styles.ShortTitleNA]: subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE,
  }),
  SkeletonWrapper: styles.SkeletonWrapper,
  SkeletonContentWrapper: styles.SkeletonContentWrapper,
  SkeletonShortTitle: styles.SkeletonShortTitle,
  SkeletonTitle: styles.SkeletonTitle,
});

export const getBadgeByProps = ({
  subtypeValue,
  channel,
  link,
}: TeaserFactoryProps) => {
  let label = '';

  if (channel?.channelType === CHANNEL_TYPE_SPECIAL) {
    label = CHANNEL_TYPE_SPECIAL_LABEL;
  } else if (subtypeValue === ARTICLE_TYPE_LONG_READ) {
    label = ARTICLE_TYPE_LONG_READ_LABEL;
  } else if (subtypeValue === ARTICLE_TYPE_SEATCHANGE) {
    label = ARTICLE_TYPE_SEATCHANGE_LABEL;
  } else if (subtypeValue === ARTICLE_TYPE_ASSOCIATION) {
    label = ARTICLE_TYPE_ASSOCIATION_LABEL;
  } else if (subtypeValue === ADVERTISING_TYPE_EXTERNAL) {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    label = link?.label || getDomain(link?.path);
  } else if (subtypeValue === ADVERTISING_TYPE_BRANDREPORT) {
    label = ADVERTISING_TYPE_BRANDREPORT_LABEL;
  }

  if (!label) {
    return null;
  }

  return (
    <div className={styles.Badge}>
      <TeaserBadge label={label} />
    </div>
  );
};

const TeaserRecommendations = teaserFactory({
  trackingTeaserHandler: withTeaserTrackingHandler,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, channel, link, } */
  badge: getBadgeByProps,
  formattedPublicationDate: getFormattedPublicationDateByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, contentBoxType, publicationDate, } */
  titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE_S),
  isIconPositionOnImage: true,
  isPublicationDateVisible: false,
  teaserImageStyles: {
    style_320: STYLE_1X1_250,
    style_760: STYLE_16X9_220,
    style_1680: STYLE_16X9_280,
  },
  styles: getStylesByProps,
});

export default TeaserRecommendations;
