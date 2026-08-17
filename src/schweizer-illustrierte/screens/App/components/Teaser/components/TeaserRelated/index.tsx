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
import { STYLE_3X2_210 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  GetTeaserFactoryStylesByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserRelatedPropsInner = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
export const getStylesByProps: GetTeaserFactoryStylesByProps<
  TeaserRelatedPropsInner
> = (props) => {
  const { activeMainChannel }: TeaserRelatedPropsInner = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  return {
    ContentWrapper: getThemedClass('ContentWrapper'),
    ImageWrapper: styles.ImageWrapper,
    Image: styles.Image,
    ShortTitle: getThemedClass('ShortTitle'),
    Title: getThemedClass('Title'),
    Wrapper: styles.Wrapper,
    IconStyle: styles.IconStyle,
    SkeletonWrapper: styles.SkeletonWrapper,
    SkeletonContentWrapper: styles.SkeletonContentWrapper,
    SkeletonShortTitle: styles.SkeletonShortTitle,
    SkeletonTitle: styles.SkeletonTitle,
  };
};

const renderBadge = getRenderBadge(styles);
const renderArrow = getRenderArrow(styles);
const getBadgeByProps = getBadgeByPropsFunction(renderBadge, renderArrow);

/* @ts-ignore TODO: TS2322 ->  Type '(props */
export const getIconByProps: GetElementByProps<TeaserRelatedPropsInner> = (
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

const TeaserRelated = teaserFactory({
  badge: getBadgeByProps,
  icon: getIconByProps,
  isIconPositionOnImage: true,
  trackingTeaserHandler: withTeaserTrackingHandler,
  styles: getStylesByProps,
  teaserImageStyles: { style_320: STYLE_3X2_210 },
  disableWrapperClassName: true,
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  fullScreenHash: FULLSCREEN_HASH,
}) as ComponentType<TeaserRelatedPropsInner>;

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(memo(TeaserRelated));
