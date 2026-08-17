import React, { FC } from 'react';
import classNames from 'classnames';
import Icon from '../../../../Icon';
import SVGIcon from '../../../../SVGIcon';
import {
  SVG_ICONS_TYPE_PLAY_BUTTON,
  SVG_ICONS_TYPE_QUOTE,
} from '../../../../../../../../shared/constants/svgIcons';
import {
  TEASER_ICON_TYPE_HERO_MAIN_VIDEO,
  TEASER_ICON_TYPE_PLAY_BUTTON,
  TEASER_ICON_TYPE_QUOTE,
  TEASER_ICON_TYPE_VIDEO,
  TEASER_ICON_TYPE_VIDEO_ICON,
} from './constants';
import styles from './styles.legacy.css';
import { TeaserIconProps } from './typings';

const TeaserIcon: FC<TeaserIconProps> = ({ type, addClass }) => {
  if (!type) {
    return null;
  }

  switch (type) {
    case TEASER_ICON_TYPE_HERO_MAIN_VIDEO: {
      return (
        <Icon
          type={TEASER_ICON_TYPE_VIDEO_ICON}
          addClass={classNames(styles.TeaserHeroMainIcon, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [addClass]: !!addClass,
          })}
        />
      );
    }
    case TEASER_ICON_TYPE_VIDEO: {
      return (
        <Icon
          type={TEASER_ICON_TYPE_VIDEO_ICON}
          addClass={classNames(styles.TeaserIcon, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [addClass]: !!addClass,
          })}
        />
      );
    }

    case TEASER_ICON_TYPE_PLAY_BUTTON: {
      return (
        <SVGIcon
          type={SVG_ICONS_TYPE_PLAY_BUTTON}
          className={classNames(styles.TeaserPlayButton, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [addClass]: !!addClass,
          })}
        />
      );
    }

    case TEASER_ICON_TYPE_QUOTE: {
      return (
        <SVGIcon
          type={SVG_ICONS_TYPE_QUOTE}
          className={classNames(styles.TeaserQuote, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [addClass]: !!addClass,
          })}
        />
      );
    }
    default:
      return null;
  }
};

export default TeaserIcon;
