import React from 'react';
import { ToastOptions, ToastPosition, toast } from 'react-toastify';
import ToastContent from './components/ToastContent';
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_INFO,
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_WARNING,
} from '../../../../../common/components/ToastContent/constants';
import { DEFAULT_ERROR_MESSAGE } from './constants';
import { ToastLink } from '../../../../../common/components/ToastContent/typings';

export const displayToast = (
  type: string,
  message: string,
  toastId: string,
  link: ToastLink,
  toastOptions: ToastOptions = {},
): void => {
  if (!__CLIENT__) {
    return;
  }

  // remove all toasts to avoid multiple toasts
  toast.dismiss();

  let timeout = 0;

  if (toastId) {
    toastOptions.toastId = toastId;

    if (toast.isActive(toastId)) {
      toast.dismiss(toastId);
      timeout = 1200;
    }
  }

  const toastContent = () =>
    toast(
      <ToastContent
        content={message}
        type={type}
        link={link}
        toastOptions={toastOptions}
      />,
      toastOptions,
    );

  setTimeout(() => toastContent(), timeout);
};

/**
 * @param   {string}  message  the message that should be displayed in the toast
 * @param   {Object}  link  optional, provide if you want to have a link after the message
 * @param   {string}  toastId  provide a toastId to avoid duplicate toasts
 */
export const displayErrorToast = (
  message: string = DEFAULT_ERROR_MESSAGE,
  toastId: string,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ToastLink'. */
  link: ToastLink = null,
  position: Partial<ToastPosition> = 'top-center',
) =>
  displayToast(TOAST_TYPE_ERROR, message, toastId, link, {
    position,
  });

/**
 * @param   {string}  message  the message that should be displayed in the toast
 * @param   {Object}  link  optional, provide if you want to have a link after the message
 * @param   {string}  toastId  provide a toastId to avoid duplicate toasts
 */
export const displaySuccessToast = (
  message: string,
  toastId: string,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ToastLink'. */
  link: ToastLink = null,
  position: Partial<ToastPosition> = 'top-center',
) => {
  displayToast(TOAST_TYPE_SUCCESS, message, toastId, link, {
    position,
  });
};

/**
 * @param   {string}  message  the message that should be displayed in the toast
 * @param   {Object}  link  optional, provide if you want to have a link after the message
 * @param   {string}  toastId  provide a toastId to avoid duplicate toasts
 */
export const displayWarningToast = (
  message: string,
  toastId: string,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ToastLink'. */
  link: ToastLink = null,
  position: Partial<ToastPosition> = 'top-center',
) =>
  displayToast(TOAST_TYPE_WARNING, message, toastId, link, {
    position,
  });

/**
 * @param   {string}  message  the message that should be displayed in the toast
 * @param   {Object}  link  optional, provide if you want to have a link after the message
 * @param   {string}  toastId  provide a toastId to avoid duplicate toasts
 */
export const displayInfoToast = (
  message: string,
  toastId: string,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ToastLink'. */
  link: ToastLink = null,
  position: Partial<ToastPosition> = 'top-center',
) =>
  displayToast(TOAST_TYPE_INFO, message, toastId, link, {
    position,
  });

export const dismissAllToasts = () => {
  __CLIENT__ && toast.dismiss();
};
