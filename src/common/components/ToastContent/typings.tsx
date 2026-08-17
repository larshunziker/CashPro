import { ReactElement } from 'react';
import { ToastOptions } from 'react-toastify';
import { LinkComponent } from '../Link/typings';

export type ToastContentProps = {
  content: string;
  link: ToastLink | null;
  type: string;
  closeToast?: () => void;
  toastOptions?: ToastOptions;
};

export type ToastContentFactoryOptions = {
  Icon: any; // TODO: needs to be updated as soon as Icon is implemented as typescript component
  Link: LinkComponent;
  toastIcon: (type: string) => string;
  styles:
    | ToastContentFactoryOptionsStyles
    | ((type: string) => ToastContentFactoryOptionsStyles);
  toastOptions?: ToastOptions;
};

export type ToastContentFactoryOptionsStyles = {
  Wrapper: string;
  ContentWrapper: string;
  Content: string;
  Link: string;
  CloseButton: string;
  CloseIcon: string;
  ToastIcon: string;
};

export type ToastContentComponent = (props: ToastContentProps) => ReactElement;

export type ToastLink = {
  text: string;
  path?: string;
  onClick?: Function;
};
