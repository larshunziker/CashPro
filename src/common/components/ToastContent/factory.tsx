/**
 * @file   ToastContent factory
 */

import React, { ReactElement, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TOAST_TYPE_SUCCESS } from './constants';
import {
  ToastContentFactoryOptions,
  ToastContentFactoryOptionsStyles,
  ToastContentProps,
} from './typings';

const defaultStyles: ToastContentFactoryOptionsStyles = {
  Wrapper: '',
  ContentWrapper: '',
  Content: '',
  Link: '',
  CloseButton: '',
  CloseIcon: '',
  ToastIcon: '',
};

export default ({
  Icon,
  Link,
  toastIcon: appToastIcon,
  styles: appStyles,
}: ToastContentFactoryOptions) => {
  return ({
    content,
    link,
    type,
    closeToast,
    toastOptions,
  }: ToastContentProps): ReactElement => {
    const styles: ToastContentFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(type)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;
    const toastIcon: string =
      (typeof appToastIcon === 'function' && appToastIcon(type)) || '';
    const shouldAutoClose = type === TOAST_TYPE_SUCCESS && !link;
    /* @ts-ignore TODO: TS2339 ->  Property 'toastId' does not exist on type 'ToastOptions<{}> | undefined'. */
    const { toastId } = toastOptions;

    useEffect(() => {
      /* @ts-ignore TODO: TS7034 ->  Variable 'timeout' implicitly has type 'any' in some locations where its type cannot be determined. */
      let timeout;

      if (shouldAutoClose && toastId) {
        timeout = setTimeout(() => toast.dismiss(toastId), 10_000);
      }
      return () => {
        /* @ts-ignore TODO: TS7005 ->  Variable 'timeout' implicitly has an 'any' type. */
        clearTimeout(timeout);
      };
    }, [shouldAutoClose, toastId]);

    /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return !content ? null : (
      <div className={styles.Wrapper}>
        <div className={styles.ContentWrapper}>
          {toastIcon && <Icon type={toastIcon} addClass={styles.ToastIcon} />}
          <p className={styles.Content}>
            {content}
            {link?.text && (link.path || link.onClick) && (
              <Link
                className={styles.Link}
                {...link}
                onClick={(): void => link?.onClick?.()}
                label={link.text}
              />
            )}
          </p>
        </div>
        <button
          onClick={closeToast}
          className={styles.CloseButton}
          data-testid="toast-content-close-button"
        >
          <Icon type="IconXMark" addClass={styles.CloseIcon} />
        </button>
      </div>
    );
  };
};
