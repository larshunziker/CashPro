import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { noop } from '../../../shared/helpers/utils';
import useInView, { UseInViewResponse } from '../../../shared/hooks/useInView';
import {
  SwipeInteractionButtonComponent,
  SwipeInteractionButtonFactoryOptions,
  SwipeInteractionButtonProps,
  SwipeInteractionButtonStyles,
} from './typings';

const defaultStyles: SwipeInteractionButtonStyles = {
  Button: '',
  HideButton: '',
  InViewAnimation: '',
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'appStyles' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getStyles = (appStyles, props): SwipeInteractionButtonStyles => {
  const styles: SwipeInteractionButtonStyles =
    (typeof appStyles === 'function' && appStyles(props)) ||
    (typeof appStyles === 'object' && appStyles) ||
    defaultStyles;

  return styles;
};

const SwipeInteractionButtonFactory = ({
  styles: appStyles,
}: SwipeInteractionButtonFactoryOptions): SwipeInteractionButtonComponent => {
  const SwipeInteractionButton: SwipeInteractionButtonComponent = (
    props: SwipeInteractionButtonProps,
  ): ReactElement => {
    const {
      onClickHandler = noop,
      isHidden = false,
      children,
      addClass = '',
    }: SwipeInteractionButtonProps = props;

    const styles: SwipeInteractionButtonStyles = getStyles(appStyles, props);

    const { setRef: buttonRef, isInView }: UseInViewResponse = useInView({
      rootMargin: '50px',
      triggerOnce: true,
    });

    if (isHidden) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    return (
      <button
        /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'. */
        ref={buttonRef}
        onClick={onClickHandler}
        className={classNames(styles.Button, {
          [styles.HideButton]: isHidden,
          [styles.InViewAnimation]: isInView,
          [addClass]: !!addClass,
        })}
      >
        {children}
      </button>
    );
  };

  return SwipeInteractionButton;
};

export default SwipeInteractionButtonFactory;
