import React, { ComponentType, ReactElement, memo } from 'react';
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
  STYLE_3X2_280,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  GetTeaserFactoryStylesByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserXLPropsInner = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
const getStylesByProps: GetTeaserFactoryStylesByProps<TeaserXLPropsInner> = (
  props,
) => {
  const { activeMainChannel } = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  return {
    ContentWrapper: getThemedClass('ContentWrapper'),
    Image: styles.Image,
    ShortTitle: getThemedClass('ShortTitle'),
    Title: getThemedClass('Title'),
    TitleInner: styles.TitleInner,
    Wrapper: getThemedClass('Wrapper'),
    IconStyle: getThemedClass('IconStyle'),
  };
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
const getBadgeByProps: GetElementByProps<TeaserXLPropsInner> = (props) => {
  const { badgeLabel, badgeColor } = props;

  const getThemedClass = cssClassByChannel(styles, props.activeMainChannel);

  if (!badgeLabel) {
    return null;
  }
  return (
    <div className={getThemedClass('Badge')}>
      {/* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */}
      <Badge {...enrichBadgeProps(badgeColor, badgeLabel)} />
    </div>
  );
};

const getIconByProps = (props: TeaserXLPropsInner): ReactElement | null => {
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

const TeaserXL = teaserFactory({
  isIconPositionOnImage: getIconPositionByProps,
  badge: getBadgeByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  icon: getIconByProps,
  trackingTeaserHandler: withTeaserTrackingHandler,
  styles: getStylesByProps,
  teaserImageStyles: {
    style_320: STYLE_3X2_280,
    style_760: STYLE_3X2_440,
    style_1680: STYLE_3X2_770,
  },
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  fullScreenHash: FULLSCREEN_HASH,
}) as ComponentType<TeaserXLPropsInner>;

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(memo(TeaserXL));
