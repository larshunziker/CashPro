import { ReactElement } from 'react';
import { IconComponent } from '../../../../../Icon/typings';

export type MultiFieldProps = FieldComponentProps & {
  withErrorIcon?: boolean;
  displayOptionsInline?: boolean;
};

export type MultiFieldOptions = {
  Icon?: IconComponent;
  IconTypes?: {
    errorIconType: string;
    checkmarkIconType: string;
  };
  styles: {
    Wrapper: string;
    FieldWithHelperTextWrapper: string;
    OptionWrapper: string;
    Row: string;
    OptionsColumns: string;
    ActiveCheckbox?: string;
    LabelsColumns: string;
    HasError?: string;
    Description?: string;
    Required?: string;
    ErrorIcon?: string;
    CheckmarkIcon?: string;
    Label?: string;
  };
  appErrorMesssage?: ReactElement | string;
  commonStyles: {
    Option: string;
    Labels: string;
    Required: string;
    Description: string;
    HasError: string;
    ErrorMessage: string;
    HelperText: string;
    CheckmarkIcon?: string;
    Disabled?: string;
    DisplayOptionsInline?: string;
  };
};

export type MultiFieldState = {
  value: Array<string>;
  isDirty: boolean;
  isValid: boolean;
};
