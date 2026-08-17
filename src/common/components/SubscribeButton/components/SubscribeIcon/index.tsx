import classNames from 'classnames';
import React from 'react';
import { SubscribeIconProps } from './typings';

const SubscribeIcon = ({
  Icon,
  styles,
  isActive,
  isAnimating,
  isHybridApp,
}: SubscribeIconProps) => {
  let iconType: string;

  if (isHybridApp) {
    iconType = isActive ? 'IconBellOn' : 'IconBell';
  } else {
    iconType = 'IconEnvelope';
  }

  return (
    <Icon
      type={iconType}
      addClass={classNames(styles.Icon, {
        [styles.Animating]: isAnimating && isHybridApp,
      })}
    ></Icon>
  );
};

export default SubscribeIcon;
