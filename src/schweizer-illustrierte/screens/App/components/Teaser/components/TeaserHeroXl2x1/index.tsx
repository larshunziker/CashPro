import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../common/components/Teaser/helpers';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import {
  enrichBadgeProps,
  getIconPositionByProps,
  isIconVisible,
} from '../../shared/helpers';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
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
  GetTeaserFactoryStylesByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserHeroXl2x1PropsInner = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
const getStylesByProps: GetTeaserFactoryStylesByProps<
  TeaserHeroXl2x1PropsInner
> = (props) => {
  const { activeMainChannel }: TeaserHeroXl2x1PropsInner = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return {
    ContentWrapper: getThemedClass('ContentWrapper'),
    ShortTitle: getThemedClass('ShortTitle'),
    Title: getThemedClass('Title'),
    TitleInner: styles.TitleInner,
    Wrapper: styles.Wrapper,
    IconStyle: getThemedClass('IconStyle'),
  };
};

/* @ts-ignore TODO: TS2322 ->  Type '({ badgeLabel, badgeColor, __typename, subtypeValue, activeMainChannel, } */
export const getBadgeByProps: GetElementByProps<TeaserHeroXl2x1PropsInner> = ({
  badgeLabel,
  badgeColor,
  __typename,
  subtypeValue,
  activeMainChannel,
}) => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  if (!badgeLabel) {
    return null;
  }
  return (
    <div className={getThemedClass('Badge')}>
      <Badge
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        {...enrichBadgeProps(badgeColor, badgeLabel, __typename, subtypeValue)}
      />
    </div>
  );
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
export const getIconByProps: GetElementByProps<TeaserHeroXl2x1PropsInner> = (
  props,
) => {
  const { hasVideo, __typename, activeMainChannel } = props;

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

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
        /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
        [getThemedClass('IconStyle')]: __typename !== VIDEO_CONTENT_TYPE,
        [styles.IconMovieOutlineStyle]: __typename === VIDEO_CONTENT_TYPE,
      })}
    />
  );
};

const TeaserHeroXl2x1 = teaserFactory({
  badge: getBadgeByProps,
  isIconPositionOnImage: getIconPositionByProps,
  icon: getIconByProps,
  trackingTeaserHandler: withTeaserTrackingHandler,
  styles: getStylesByProps,
  teaserImageStyles: {
    style_320: STYLE_16X9_340,
    style_480: STYLE_16X9_360,
    style_540: STYLE_2X1_800,
    style_960: STYLE_2X1_1280,
  },
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  fullScreenHash: FULLSCREEN_HASH,
}) as ComponentType<TeaserHeroXl2x1PropsInner>;

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(memo(TeaserHeroXl2x1));
