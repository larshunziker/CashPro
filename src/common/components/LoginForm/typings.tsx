import { ReactElement } from 'react';

export type LoginFormProps = {
  message?: string;
  isDefaultLoginCase?: boolean;
  isCommentForm?: boolean;
  webFormId?: string;
  oneLogLoginCase?: 'webform_gp_mandatory' | 'webform_gp_optional';
  redirectPath?: string;
};

export type LoginFormFactoryOptions = {
  styles: LoginFormFactoryOptionsStyles;
  Icon?: any;
  iconType?: string;
  loginText?: string;
  Button?: ({
    clickHandler,
    text,
  }: {
    clickHandler: any;
    text: string;
  }) => ReactElement;
  provideUsernameText?: string;
};

export type LoginFormFactoryOptionsStyles = {
  LoginFormWrapper?: string;
  Icon?: string;
  Message: string;
  Button?: string;
};

export type LoginFormComponent = (
  props: LoginFormProps,
) => ReactElement<LoginFormProps>;
