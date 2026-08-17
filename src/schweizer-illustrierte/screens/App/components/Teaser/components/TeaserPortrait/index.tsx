import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../common/components/Teaser/helpers';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import {
  getBadgeByPropsFunction,
  getRenderArrow,
  getRenderBadge,
  isIconVisible,
} from '../../shared/helpers';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
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
  STYLE_2X3_210,
  STYLE_2X3_305,
  STYLE_2X3_960,
} from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  GetTeaserFactoryStylesByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserPortraitPropsInner = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
const getStylesByProps: GetTeaserFactoryStylesByProps<
  TeaserPortraitPropsInner
> = (props) => {
  const { activeMainChannel } = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  return {
    ContentWrapper: getThemedClass('ContentWrapper'),
    ImageWrapper: styles.ImageWrapper,
    Image: getThemedClass('Image'),
    ShortTitle: getThemedClass('ShortTitle'),
    Title: getThemedClass('Title'),
    Wrapper: styles.Wrapper,
    IconStyle: styles.IconStyle,
  };
};

const renderBadge = getRenderBadge(styles);
const renderArrow = getRenderArrow(styles);
const getBadgeByProps = getBadgeByPropsFunction(renderBadge, renderArrow);

/* @ts-ignore TODO: TS2322 ->  Type '(props */
const getIconByProps: GetElementByProps<TeaserPortraitPropsInner> = (props) => {
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

const teaserImageStyles = {
  style_320: STYLE_2X3_210,
  style_480: STYLE_2X3_305,
  style_540: STYLE_2X3_960,
  style_760: STYLE_2X3_210,
  style_1680: STYLE_2X3_305,
};

const TeaserPortrait = teaserFactory({
  badge: getBadgeByProps,
  icon: getIconByProps,
  isIconPositionOnImage: true,
  styles: getStylesByProps,
  trackingTeaserHandler: withTeaserTrackingHandler,
  teaserImageStyles,
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  fullScreenHash: FULLSCREEN_HASH,
}) as ComponentType<TeaserPortraitPropsInner>;

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(memo(TeaserPortrait));
