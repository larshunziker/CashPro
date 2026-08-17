import { ReactElement } from 'react';
import { IconComponent } from '../../../../../Icon/typings';

export type BirthdayFieldProps = FieldComponentProps & {
  addClass?: string;
  addLabelClass?: string;
  withErrorIcon?: boolean;
};

export type BirthdayFieldFactoryOptions = {
  Icon?: IconComponent;
  IconTypes?: {
    errorIconType: string;
  };
  locale?: string;
  styles: {
    Label: string;
    LabelAbove: string;
    LabelInside: string;
    HasError?: string;
  };
  appErrorMessage?: ReactElement | string;
  commonStyles: {
    Wrapper: string;
    FieldWithHelperTextWrapper: string;
    HasError: string;
    Input: string;
    Labels: string;
    Required: string;
    ErrorMessage: string;
    ErrorIcon?: string;
    HelperText?: string;
    Disabled?: string;
  };
};
