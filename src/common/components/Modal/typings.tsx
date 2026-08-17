import { ReactElement } from 'react';
import {
  ButtonProps,
  ButtonWithLoadingComponent,
} from '../ButtonWithLoading/typings';
import { IconComponent } from '../Icon/typings';

export type ModalFactoryStyles = {
  Title?: string;
  Content?: string;
  CloseIconWrapper?: string;
  Overlay?: string;
  Body?: string;
  ButtonGroup?: string;
  FullPage?: string;
};

type CustomUiProps = {
  close: () => void;
  drawerRef?: React.RefObject<HTMLDivElement>;
  hasStickyHeader?: boolean;
  hasStickyFooter?: boolean;
};

export type ModalProps = {
  fullPage?: boolean;
  overlay?: HTMLDivElement;
  title?: string;
  hasStickyHeader?: boolean;
  hasStickyFooter?: boolean;
  content?: string;
  overlayClassName?: string;
  customUi?: (props: CustomUiProps) => ReactElement;
  closeOnClickOutside?: boolean;
  isCloseVisible?: boolean;
  closeOnEscape?: boolean;
  closeOnLocationChange?: boolean;
  keyCodeForClose?: number[];
  afterClose?: () => null;
  onClickOutside?: () => null;
  onkeyPress?: () => null;
  onKeypressEscape?: (event: KeyboardEvent) => null;
  buttons?: Partial<ButtonProps>[];
  type?: 'drawer' | 'modal';
  hideDefaultButtons?: Boolean;
};

export type ModalFactoryOptions = {
  Icon?: IconComponent;
  ButtonWithLoading?: ButtonWithLoadingComponent;
  styles: ModalFactoryStyles;
  targetId?: string;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  RaschProviders?: (props) => ReactElement;
};
