/*
 * @file Toast
 */
import React from 'react';
import { ToastOptions, toast } from 'react-toastify';
import ToastContent from './components/ToastContent';
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_INFO,
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_WARNING,
} from '../../../../../common/components/ToastContent/constants';
import { DEFAULT_ERROR_MESSAGE } from './constants';
import { ToastLink } from '../../../../../common/components/ToastContent/typings';

const displayToast = (
  message: string,
  link: ToastLink,
  toastId: string,
  type: string,
): void => {
  if (!__CLIENT__) {
    return;
  }

  // remove all toasts to avoid multiple toasts
  toast.dismiss();

  const toastOptions: ToastOptions = {};
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
  link = null,
  toastId = null,
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'ToastLink'. */
) => displayToast(message, link, toastId, TOAST_TYPE_ERROR);

/**
 * @param   {string}  message  the message that should be displayed in the toast
 * @param   {Object}  link  optional, provide if you want to have a link after the message
 * @param   {string}  toastId  provide a toastId to avoid duplicate toasts
 */
export const displaySuccessToast = (
  message: string,
  link = null,
  toastId = null,
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'ToastLink'. */
) => displayToast(message, link, toastId, TOAST_TYPE_SUCCESS);

/**
 * @param   {string}  message  the message that should be displayed in the toast
 * @param   {Object}  link  optional, provide if you want to have a link after the message
 * @param   {string}  toastId  provide a toastId to avoid duplicate toasts
 */
export const displayWarningToast = (
  message: string,
  link = null,
  toastId = null,
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'ToastLink'. */
) => displayToast(message, link, toastId, TOAST_TYPE_WARNING);

/**
 * @param   {string}  message  the message that should be displayed in the toast
 * @param   {Object}  link  optional, provide if you want to have a link after the message
 * @param   {string}  toastId  provide a toastId to avoid duplicate toasts
 */
export const displayInfoToast = (
  message: string,
  link = null,
  toastId = null,
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'ToastLink'. */
) => displayToast(message, link, toastId, TOAST_TYPE_INFO);

export const dismissAllToasts = () => {
  __CLIENT__ && toast.dismiss();
};
