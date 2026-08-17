import { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { IconComponent } from '../Icon/typings';

export type ButtonFactoryOptionsStyles = {
  Button?: string;
  ClickEffect?: string;
  Disabled?: string;
  FullWidth?: string;
  MobileFullWidth?: string;
  IconLeft?: string;
  IconRight?: string;
  Pending?: string;
  Small?: string;
  Primary: string;
  Secondary: string;
  Tertiary: string;
  Quaternary?: string;
  HighAttention?: string;
};

export type ButtonFactoryOptions = {
  Icon?: IconComponent;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  styles: ButtonFactoryOptionsStyles | ((props) => ButtonFactoryOptionsStyles);
};

export type ButtonSize = 'big' | 'small';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export type ButtonProps = {
  addClass?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  loading?: boolean;
  iconTypeLeft?: string;
  iconTypeRight?: string;
  tabIndex?: number;
  clickEffect?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  role?: 'link';
  highAttention?: boolean;
  children?: ReactNode;
};

export type ButtonComponent = (props: ButtonProps) => ReactElement;

export type ButtonWithLoadingProps = {
  clickHandler: () => void;
  text: string;
  isLoading: boolean;
};

export type ButtonWithLoadingType = (
  props: ButtonWithLoadingProps,
) => ReactElement;

export type ButtonWithLoadingComponent = (
  props: ButtonProps,
) => ReactElement<ButtonProps>;
