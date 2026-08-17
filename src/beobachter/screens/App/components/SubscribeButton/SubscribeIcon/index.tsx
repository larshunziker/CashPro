import classNames from 'classnames';
import React from 'react';
import SVGIcon from '../../SVGIcon';
import {
  SVG_ICONS_TYPE_STAR_EMPTY,
  SVG_ICONS_TYPE_STAR_FULL,
} from '../../../../../../shared/constants/svgIcons';
import { SubscribeIconProps } from './typings';

const SubscribeIcon = ({
  Icon,
  styles,
  isActive,
  isAnimating,
  isHybridApp,
}: SubscribeIconProps) => {
  return (
    <>
      {isHybridApp && (
        <Icon
          type={isActive ? 'IconStarSolid' : 'IconStar'}
          addClass={classNames(styles.Icon, {
            [styles.Animating]: isAnimating && isHybridApp,
          })}
        ></Icon>
      )}
      {!isHybridApp && (
        <SVGIcon
          type={isActive ? SVG_ICONS_TYPE_STAR_FULL : SVG_ICONS_TYPE_STAR_EMPTY}
          className={styles.Icon}
        />
      )}
    </>
  );
};

export default SubscribeIcon;
