import React, { ComponentType, memo, useMemo } from 'react';
import classNames from 'classnames';
import LoadingSpinner from './components/LoadingSpinner';
import defaultStyles from './styles.legacy.css';
import { ButtonFactoryOptions, ButtonProps } from './typings';

const buttonLoadingFactory = ({
  Icon,
  styles: appStyles,
}: ButtonFactoryOptions) => {
  const ButtonLoading: ComponentType<ButtonProps> = ({
    size = 'big',
    variant = 'primary',
    fullWidth = false,
    mobileFullWidth = false,
    onClick,
    loading = false,
    iconTypeLeft,
    iconTypeRight,
    tabIndex = 0,
    clickEffect = true,
    highAttention = false,
    children,
    ariaLabel,
    type,
    role,
    addClass = '',
    ...props
  }) => {
    const styles = useMemo(() => {
      const stylesByProps =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;
      return { ...defaultStyles, ...stylesByProps };
    }, [props]);

    // if we dont get Content class then we don't wanna show a empty class="" on the element
    const contentClass = classNames(styles.Content, {
      [styles.QuaternaryContent]: variant === 'quaternary',
    });
    return (
      <button
        className={classNames(styles.Button, {
          [addClass]: !!addClass,
          [styles.ClickEffect]: clickEffect,
          [styles.FullWidth]: fullWidth,
          [styles.MobileFullWidth]: mobileFullWidth,
          [styles.Primary]: variant === 'primary',
          [styles.Secondary]: variant === 'secondary',
          [styles.Tertiary]: variant === 'tertiary',
          [styles.Quaternary]: variant === 'quaternary',
          [styles.Small]: size === 'small',
          [styles.HighAttention]: highAttention,
          [styles.Loading]: loading,
        })}
        onClick={onClick}
        tabIndex={tabIndex}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
        {...(type ? { type } : {})}
        {...(role ? { role } : {})}
      >
        {loading && (
          <div
            className={styles.LoadingSpinnerWrapper}
            data-testid="button-loading-spinner-wrapper"
          >
            <LoadingSpinner height={size === 'small' ? 20 : 24} />
          </div>
        )}
        {/* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */}
        <span className={contentClass || null}>
          {Icon && iconTypeLeft && (
            <Icon
              type={iconTypeLeft}
              addClass={classNames(styles.IconLeft, {
                [styles.QuaternaryIconLeft]: variant === 'quaternary',
              })}
            />
          )}
          {children}
          {Icon && iconTypeRight && (
            <Icon
              type={iconTypeRight}
              addClass={classNames(styles.IconRight, {
                [styles.QuaternaryIconRight]: variant === 'quaternary',
              })}
            />
          )}
        </span>
      </button>
    );
  };

  return memo(ButtonLoading);
};

export default buttonLoadingFactory;
