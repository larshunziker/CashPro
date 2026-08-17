import { ComponentType, ReactNode } from 'react';
import { LinkComponent } from '../Link/typings';

export type TooltipLink = {
  text: string;
  path: string;
};

export type TooltipFactoryProps = {
  content: string;
  link?: TooltipLink | null;
  origin?: string;
  children?: ReactNode;
  openOnInit?: boolean;
  closeWithClickOutside?: boolean;
  onClose?: Function;
  TooltipIcon?: ReactNode;
};

export type TooltipFactoryOptionsStyles = {
  Wrapper: string;
  Button: string;
  ButtonOpen: string;
  ButtonText: string;
  ButtonTextOpen?: string;
  ButtonTextClosed?: string;
  TooltipWrapper: string;
  Tooltip: string;
  Content: string;
  Link: string;
  CloseIconWithin?: string;
};

export type TooltipFactoryOptionsStylesByProps<T> = (
  props: T,
) => TooltipFactoryOptionsStyles;

export type TooltipFactoryOptions<T> = {
  Link: LinkComponent;
  styles: TooltipFactoryOptionsStyles | TooltipFactoryOptionsStylesByProps<T>;
};

export type TooltipComponent = ComponentType<TooltipFactoryProps>;
