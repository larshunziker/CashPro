/* TODO: remove addClass */

import React from 'react';
import classNames from 'classnames';
import type {
  ButtonFactoryOptions,
  ButtonFactoryOptionsStyles,
  ButtonProps,
} from './typings';

const defaultStyles: ButtonFactoryOptionsStyles = {
  Button: '',
  IconLeft: '',
  IconRight: '',
};

export default ({ Icon, styles: appStyles }: ButtonFactoryOptions) => {
  const Button = (props: ButtonProps) => {
    const styles: any =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const {
      handleClick,
      iconTypeLeft,
      iconTypeRight,
      addClass,
      children,
    }: ButtonProps = props;

    return (
      <button
        className={classNames(styles.Button, addClass)}
        onClick={handleClick}
      >
        {Icon && iconTypeLeft && (
          <Icon type={iconTypeLeft} addClass={styles.IconLeft} />
        )}
        {children}
        {Icon && iconTypeRight && (
          <Icon type={iconTypeRight} addClass={styles.IconRight} />
        )}
      </button>
    );
  };
  return Button;
};
