import React, { ComponentType, ReactElement, memo } from 'react';
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
  STYLE_3X2_210,
  STYLE_3X2_440,
} from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import {
  GetTeaserFactoryStylesByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserSPropsInner = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStylesByProps: GetTeaserFactoryStylesByProps<TeaserSPropsInner> = (
  props,
) => {
  const { activeMainChannel, isBlack } = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return {
    ContentWrapper: getThemedClass('ContentWrapper'),
    ImageWrapper: styles.ImageWrapper,
    Image: styles.Image,
    ShortTitle: classNames(getThemedClass('ShortTitle'), {
      [styles.IsBlack]: isBlack,
    }),
    Title: classNames(getThemedClass('Title'), {
      [styles.IsBlack]: isBlack,
    }),
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

const getIconByProps = ({
  hasVideo,
  __typename,
  activeMainChannel,
}: TeaserSPropsInner): ReactElement | null => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
  if (!isIconVisible(hasVideo, __typename)) {
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

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
  style_320: STYLE_3X2_210,
  style_1680: STYLE_3X2_440,
};

const TeaserS = teaserFactory({
  badge: getBadgeByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ hasVideo, __typename, activeMainChannel, } */
  icon: getIconByProps,
  isIconPositionOnImage: true,
  trackingTeaserHandler: withTeaserTrackingHandler,
  styles: getStylesByProps,
  teaserImageStyles,
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  fullScreenHash: FULLSCREEN_HASH,
}) as ComponentType<TeaserSPropsInner>;

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(memo(TeaserS));
