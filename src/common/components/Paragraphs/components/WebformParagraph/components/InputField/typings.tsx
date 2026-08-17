import { ComponentType, ReactElement, Ref } from 'react';
import { IconComponent } from '../../../../../Icon/typings';

export type InputFieldProps = FieldComponentProps & {
  addClass?: string;
  animatedLabel?: boolean;
  addLabelClass?: string;
  rows?: number;
  dateMin?: string;
  dateMax?: string;
  maxlengthMessage?: string;
  handleChange?: (value: string) => void;
  handleBlur?: (value: string) => void;
  withErrorIcon?: boolean;
  hasError?: boolean;
  innerRef?: Ref<any>;
  skipValidation?: string;
  validate?: Function;
  getValue?: Function;
  setValue?: Function;
  getId?: Function;
  errorMessage: string;
};

export type InputFieldFactoryOptions = {
  TextareaDefaultMinRows?: number;
  locale?: string;
  appErrorMessage?: ReactElement | string;
  minDateErrorMessage?: ReactElement | string;
  maxDateErrorMessage?: ReactElement | string;
  Icon?: IconComponent;
  IconTypes?: {
    errorIconType: string;
    checkmarkIconType: string;
  };
  styles: {
    HasError?: string;
    Label: string;
    LabelAbove: string;
    LabelInside: string;
    ActiveCheckbox: string;
    TextareaLabel: string;
    TextareaMaxlengthMessage?: string;
    Row: string;
    LabelsColumns: string;
    InputDateWrapper: string;
    InputDateTransparentText: string;
    CheckmarkIcon?: string;
  };
  commonStyles: {
    Wrapper: string;
    FieldWithHelperTextWrapper: string;
    HasError: string;
    Textarea: string;
    OptionWrapper: string;
    Option: string;
    Input: string;
    Labels: string;
    Required: string;
    Description: string;
    ErrorMessage: string;
    ErrorIcon?: string;
    HelperText?: string;
    ReplacedHelperText?: string;
    HelperCheckboxText?: string;
    Disabled?: string;
  };
};

export type InputFieldComponent = ComponentType<InputFieldProps>;
