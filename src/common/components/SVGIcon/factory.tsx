/* istanbul ignore file */

import React, { ReactElement } from 'react';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/rasch- */
import createComponentSwitch from '../../../shared/decorators/componentSwitch';
import { SVGIconFactoryOptions, SVGIconProps } from './typings';

export default ({
  iconConfig,
  type = 'type',
  styles,
}: SVGIconFactoryOptions) => {
  const Switch = createComponentSwitch(iconConfig, type);
  const SVGIcon = ({ ...props }: SVGIconProps): ReactElement => (
    <Switch
      {...props}
      className={classNames({
        [styles.Wrapper]: props.type.indexOf('svg-icons') > -1,
        /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
        [props.className]: !!props.className,
      })}
    />
  );

  return SVGIcon;
};
