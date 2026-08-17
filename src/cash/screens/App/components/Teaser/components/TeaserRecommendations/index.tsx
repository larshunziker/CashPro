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
  CHANNEL_TYPE_SPECIAL,
  CHANNEL_TYPE_SPECIAL_LABEL,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { STYLE_16X9_280 } from '../../../../../../../shared/constants/images';
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

export const getShortTitleElementByProps = ({
  __typename,
  shortTitle,
}: TeaserFactoryProps) => {
  if (__typename === NATIVE_ADVERTISING_CONTENT_TYPE) {
    return <div className={styles.ShortTitle}>Native AD / {shortTitle}</div>;
  }
  return <div className={styles.ShortTitle}>{shortTitle}</div>;
};

const TeaserRecommendations = teaserFactory({
  trackingTeaserHandler: withTeaserTrackingHandler,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, channel, link, } */
  badge: getBadgeByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  formattedPublicationDate: getFormattedPublicationDateByProps,
  shortTitleElement: getShortTitleElementByProps,
  isIconPositionOnImage: true,
  isPublicationDateVisible: true,
  teaserImageStyles: {
    style_320: STYLE_16X9_280,
  },
  styles: getStylesByProps,
});

export default TeaserRecommendations;
