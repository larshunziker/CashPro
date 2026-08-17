import React, { ComponentType, MouseEventHandler } from 'react';
import { IconComponent } from './../Icon/typings';
import { AutocompleteComponent } from './components/Autocomplete/typings';

export type SearchFormFactoryProps = {
  placeholder?: string;
  initialQuery?: string;
  menuCloseHandler?: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
  focusOnMount?: boolean;
  focusOnMountDelay?: number;
  minQueryLength?: number;
  theme?: string;
  router?: Record<string, any>; // TODO: delete after all apps have been changed to Reach Router.
  onStartIconClick?: MouseEventHandler;
  isOverlaySearch?: boolean;
  isErrorPageSearch?: boolean;
  vertical?: string;
  routePathname?: string;
};

export type SearchFormFactoryOptionsStyles = {
  Wrapper: string;
  InputWrapper?: string;
  Input: string;
  InputIcon?: string;
  SubmitButton: string;
  SubmitButtonActive: string;
  SubmitIcon: string;
  ResetIcon: string;
  InputStylesInputFocused?: string;
  InputWithIconWrapper?: string;
  ButtonStylesInputHasFocus?: string;
  StartIcon?: string;
  InputWrapperStylesInputFocused?: string;
  StartButton?: string;
};

export type IconTypes = {
  closeIconType?: string;
  inputIconType?: string;
  submitIconType?: string;
  startIconType?: string;
};

export type SearchFormFactoryOptions = {
  Icon: IconComponent;
  Autocomplete: AutocompleteComponent;
  IconTypes?: IconTypes | ((props: SearchFormFactoryProps) => IconTypes);
  styles:
    | SearchFormFactoryOptionsStyles
    | ((props: SearchFormFactoryProps) => SearchFormFactoryOptionsStyles);
  withRouter?: (
    Component: ComponentType<SearchFormFactoryProps>,
  ) => (props: SearchFormFactoryProps) => ComponentType<SearchFormFactoryProps>;
  appPlaceholderMessage?: string;
  appResetButtonAriaLabel?: string;
  appSearchButtonAriaLabel?: string;
  appSearchRoute?: string | ((props: SearchFormFactoryProps) => string);
  appInputAriaLabel?: string;
  isButtonShown?: boolean;
  isHybridApp?: boolean;
  isBrowserAutoCompleteEnabled?:
    | boolean
    | ((props: SearchFormFactoryProps) => boolean);
};
