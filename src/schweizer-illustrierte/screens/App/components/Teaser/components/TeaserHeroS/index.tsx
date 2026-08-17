import React, { ComponentType, ReactElement, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../common/components/Teaser/helpers';
import { truncateInBetween } from '../../../../../../../shared/helpers/utils';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import {
  enrichBadgeProps,
  getArrowThemeByChannel,
  getBadgeByPropsFunction,
  isIconVisible,
} from '../../shared/helpers';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import ArrowButton from '../../../ArrowButton';
import Badge from '../../../Badge';
import Icon from '../../../Icon';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  FULLSCREEN_HASH,
  FULLSCREEN_HASH_TEASER_CLICK,
} from '../../../../../../../shared/constants/fullscreen';
import {
  STYLE_1X1_140,
  STYLE_3X2_210,
} from '../../../../../../../shared/constants/images';
import { TEASER_ARROW_BUTTON_ORIGIN } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserHeroSPropsInner = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

export const renderBadge = (props: TeaserHeroSPropsInner): ReactElement => {
  const { subtypeValue, badgeColor, badgeLabel, __typename } = props;
  const isAdvertorial =
    __typename === NATIVE_ADVERTISING_CONTENT_TYPE &&
    subtypeValue === ADVERTISING_TYPE_ADVERTORIAL;

  return (
    <div
      className={classNames(styles.Badge, {
        [styles.BadgePositionBottom]: isAdvertorial,
      })}
    >
      <>
        <div className={grid.HiddenXlUp}>
          <Badge
            {...enrichBadgeProps(
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
              badgeColor,
              badgeLabel,
              __typename,
              subtypeValue,
              true,
            )}
          />
        </div>

        <div className={grid.HiddenXlDown}>
          <Badge
            {...enrichBadgeProps(
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
              badgeColor,
              badgeLabel,
              __typename,
              subtypeValue,
              false,
            )}
          />
        </div>
      </>
    </div>
  );
};

export const renderArrow = (props: TeaserHeroSPropsInner): ReactElement => {
  const { link, activeMainChannel } = props;

  if (!link?.label) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const theme: string = getArrowThemeByChannel(activeMainChannel);
  const truncatedText = truncateInBetween({ text: link.label });

  return (
    <div
      className={classNames(styles.Badge, styles.ArrowPositionBottom)}
      title={link.label}
    >
      <ArrowButton
        origin={TEASER_ARROW_BUTTON_ORIGIN}
        disableHover
        theme={theme}
        extraSmall
        addClass={classNames(styles.ArrowButtonAddClass, grid.HiddenXlUp)}
      >
        {truncatedText}
      </ArrowButton>

      <ArrowButton
        origin={TEASER_ARROW_BUTTON_ORIGIN}
        disableHover
        theme={theme}
        addClass={classNames(styles.ArrowButtonAddClass, grid.HiddenXlDown)}
      >
        {truncatedText}
      </ArrowButton>
    </div>
  );
};
const getBadgeByProps = getBadgeByPropsFunction(renderBadge, renderArrow);

/* @ts-ignore TODO: TS2322 ->  Type '({ hasVideo, __typename, activeMainChannel, } */
export const getIconByProps: GetElementByProps<TeaserHeroSPropsInner> = ({
  hasVideo,
  __typename,
  activeMainChannel,
}) => {
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

/* @ts-ignore TODO: TS2322 ->  Type '({ shortTitle, } */
export const getChildrenByProps: GetElementByProps<TeaserHeroSPropsInner> = ({
  shortTitle,
}) => {
  if (!shortTitle) {
    return null;
  }

  return (
    <div className={styles.ShortTitle}>
      <div>{shortTitle}</div>
    </div>
  );
};

const TeaserHeroS = teaserFactory({
  badge: getBadgeByProps,
  icon: getIconByProps,
  isIconPositionOnImage: true,
  children: getChildrenByProps,
  trackingTeaserHandler: withTeaserTrackingHandler,
  styles: {
    ContentWrapper: styles.ContentWrapper,
    ImageWrapper: styles.ImageWrapper,
    ShortTitle: styles.ShortTitle,
    Title: styles.Title,
    Wrapper: styles.Wrapper,
    IconStyle: styles.IconStyle,
  },
  teaserImageStyles: {
    style_320: STYLE_3X2_210,
    style_760: STYLE_1X1_140,
  },
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  fullScreenHash: FULLSCREEN_HASH,
}) as ComponentType<TeaserHeroSPropsInner>;

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(memo(TeaserHeroS));
