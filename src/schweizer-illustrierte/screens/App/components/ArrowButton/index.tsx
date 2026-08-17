import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { noop } from '../../../../../shared/helpers/utils';
import { TEASER_ARROW_BUTTON_ORIGIN } from '../Teaser/constants';
import {
  ARROW_BUTTON_THEME_HOROSCOPE,
  ARROW_BUTTON_THEME_LIGHT,
  ARROW_BUTTON_THEME_SKIN,
} from './constants';
import styles from './styles.legacy.css';
import { ArrowButtonProps } from './typings';

export type ArrowButtonPropsInner = ArrowButtonProps;

const ArrowButton = ({
  children,
  addClass = '',
  theme = '',
  origin = '',
  extraSmall,
  small,
  large,
  onClick = noop,
  disableHover = false,
}: ArrowButtonPropsInner): ReactElement => {
  let themeClass = '';
  if (theme === ARROW_BUTTON_THEME_LIGHT) {
    themeClass = styles.ButtonLight;
  } else if (theme === ARROW_BUTTON_THEME_HOROSCOPE) {
    themeClass = styles.ButtonHoro;
  } else if (theme === ARROW_BUTTON_THEME_SKIN) {
    themeClass = styles.ButtonSkin;
  }

  return (
    <div
      className={classNames(styles.ButtonWrapper, themeClass, {
        [styles.ButtonSmall]: small,
        [styles.ButtonExtraSmall]: extraSmall,
        [styles.ButtonLarge]: large,
        [styles.DisableHover]: disableHover,
        [styles.ExtraPadding]: origin === TEASER_ARROW_BUTTON_ORIGIN,
        [addClass]: !!addClass,
      })}
      onClick={() => onClick}
      role="button"
      tabIndex={0}
      onKeyDown={() => onClick}
      data-testid="arrow-button-wrapper"
    >
      {children}
    </div>
  );
};

export default ArrowButton;
