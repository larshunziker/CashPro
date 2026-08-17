import React, { ComponentType, memo } from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../common/components/Teaser/helpers';
import {
  enrichBadgeProps,
  getIconPositionByProps,
  isIconVisible,
} from '../../shared/helpers';
import Badge from '../../../Badge';
import Icon from '../../../Icon';
import {
  IMAGE_GALLERY_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  FULLSCREEN_HASH,
  FULLSCREEN_HASH_TEASER_CLICK,
} from '../../../../../../../shared/constants/fullscreen';
import {
  STYLE_16X9_340,
  STYLE_16X9_360,
  STYLE_2X1_1280,
  STYLE_2X1_800,
} from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';

type TeaserHeroXlSliderPropsInner = TeaserFactoryProps;

/* @ts-ignore TODO: TS2322 ->  Type '(props */
export const getBadgeByProps: GetElementByProps<
  TeaserHeroXlSliderPropsInner
> = (props) => {
  const { badgeLabel, badgeColor, __typename, subtypeValue } = props;
  if (!badgeLabel) {
    return null;
  }
  return (
    <div className={styles.Badge}>
      <Badge
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        {...enrichBadgeProps(badgeColor, badgeLabel, __typename, subtypeValue)}
      />
    </div>
  );
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
export const getIconByProps: GetElementByProps<TeaserHeroXlSliderPropsInner> = (
  props,
) => {
  const { hasVideo, __typename } = props;

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
  if (!isIconVisible(hasVideo, __typename)) {
    return null;
  }

  return (
    <Icon
      type={classNames({
        IconCamera: hasVideo,
        IconFotoMarker: __typename === IMAGE_GALLERY_CONTENT_TYPE,
        IconMovieOutline: __typename === VIDEO_CONTENT_TYPE,
      })}
      addClass={classNames({
        [styles.IconStyle]: __typename !== VIDEO_CONTENT_TYPE,
        [styles.IconMovieOutlineStyle]: __typename === VIDEO_CONTENT_TYPE,
      })}
    />
  );
};

const TeaserHeroXlSlider = teaserFactory({
  badge: getBadgeByProps,
  icon: getIconByProps,
  isIconPositionOnImage: getIconPositionByProps,
  trackingTeaserHandler: withTeaserTrackingHandler,
  styles: {
    ContentWrapper: styles.ContentWrapper,
    TitleInner: styles.TitleInner,
    Wrapper: styles.Wrapper,
    IconStyle: styles.IconStyle,
    ShortTitle: styles.ShortTitle,
    Title: styles.Title,
  },
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  teaserImageStyles: {
    style_320: STYLE_16X9_340,
    style_480: STYLE_16X9_360,
    style_540: STYLE_2X1_800,
    style_960: STYLE_2X1_1280,
  },
  fullScreenHash: FULLSCREEN_HASH,
}) as ComponentType<TeaserHeroXlSliderPropsInner>;

export default memo(TeaserHeroXlSlider);
