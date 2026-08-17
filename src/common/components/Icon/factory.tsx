/**
 * @file   Icon Render
 * @author Remo Vetere <remo.vetere@ringieraxelspringer.ch>
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-02-06 15:07:01
 */

import React, { ReactElement, memo } from 'react';
import classNames from 'classnames';
import { IconComponent, IconFactoryOptions, IconProps } from './typings';

type IconPropsInner = IconProps;

// INFO: The addClass props is an exception because this component only renders one html element, plus we would have to refactor over 300+ usecases of the <Icon> component

export default ({ iconFont }: IconFactoryOptions): IconComponent => {
  const Icon = ({
    children,
    type,
    addClass = '',
    iconsOverride,
    ...props
  }: IconPropsInner): ReactElement => {
    let currentIcons = iconFont;

    if (iconsOverride) {
      currentIcons = iconsOverride;
    }

    if (!currentIcons.Icon && __CLIENT__) {
      // eslint-disable-next-line no-console
      console.warn(
        `❗❗ There is no "Icon" class in the current loaded "${
          iconsOverride ? 'iconsOverride' : 'icons'
        }"! ❗❗`,
      );
    }

    const iconClassName: string = currentIcons[type];
    return (
      <i
        className={classNames(currentIcons.Icon, iconClassName, {
          [addClass]: !!addClass,
        })}
        {...props}
      >
        {children}
      </i>
    );
  };

  return memo<IconProps>(Icon);
};
