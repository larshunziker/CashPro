import React, { memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../common/components/Teaser/helpers';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import { isIconVisible } from '../../shared/helpers';
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
// @ts-ignore
import grid from '@grid.legacy.css';
import {
  GetElementByProps,
  GetTeaserFactoryStylesByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserLatestPropsInner = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
const getStylesByProps: GetTeaserFactoryStylesByProps<
  TeaserLatestPropsInner
> = (props) => {
  const { activeMainChannel }: TeaserLatestPropsInner = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  return {
    ContentWrapper: getThemedClass('ContentWrapper'),
    ImageWrapper: styles.ImageWrapper,
    Image: styles.Image,
    ShortTitle: getThemedClass('ShortTitle'),
    Title: getThemedClass('Title'),
    TitleInner: styles.TitleInner,
    Wrapper: styles.Wrapper,
    IconStyle: styles.IconStyle,
  };
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
const getIconByProps: GetElementByProps<TeaserLatestPropsInner> = (props) => {
  const { hasVideo, __typename, activeMainChannel } = props;

  const showIcon =
    hasVideo ||
    __typename === IMAGE_GALLERY_CONTENT_TYPE ||
    __typename === VIDEO_CONTENT_TYPE;

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
  if (!isIconVisible(hasVideo, __typename) || !showIcon) {
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

export const TeaserLatest = teaserFactory({
  icon: getIconByProps,
  isIconPositionOnImage: true,
  styles: getStylesByProps,
  trackingTeaserHandler: withTeaserTrackingHandler,
  teaserImageStyles: { style_320: STYLE_3X2_210 },
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  fullScreenHash: FULLSCREEN_HASH,
});

const TeaserLatestInGrid = (props: TeaserLatestPropsInner) => (
  <div
    className={classNames(
      grid.ColOffsetXs1,
      grid.ColOffsetSm1,
      grid.ColOffsetLg1,
    )}
    data-testid="teaser-latest-wrapper"
  >
    <TeaserLatest {...props} />
  </div>
);

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(
  memo<TeaserFactoryProps>(TeaserLatestInGrid),
);
