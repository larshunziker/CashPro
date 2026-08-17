import {
  ButtonSize,
  ButtonVariant,
  ButtonWithLoadingComponent,
} from '../ButtonWithLoading/typings';
import { IconComponent } from '../Icon/typings';

export type DropdownFactoryStyles = {
  BodyClass: string;
  OverlayWrapper: string;
  Open: string;
  Wrapper: string;
  CloseWrapper: string;
  OptionsWrapper: string;
  Right: string;
  Disabled?: string;
  FullWidthOnMobile?: string;
};

export type DropdownFactoryOptions = {
  Icon: IconComponent;
  ButtonWithLoading: ButtonWithLoadingComponent;
  styles: DropdownFactoryStyles;
};

export type DropdownProps = {
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconTypeLeft?: string;
  iconTypeRight?: string;
  iconTypeRightActive?: string;
  avoidUpdateOnButtonLabel?: boolean;
  children: any;
  align?: 'left' | 'right';
  loading?: boolean;
  isDisabled?: boolean;
  mobileFullWidth?: boolean;
};
