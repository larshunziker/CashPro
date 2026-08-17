import { RefObject } from 'react';

type InputTypes =
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'hidden'
  | 'checkboxes'
  | 'radios'
  | 'text'
  | 'textfield';

export type FormFieldProps = {
  id: string;
  name?: string;
  values: Record<string, any>;
  validate: (target: EventTarget) => void;
  setValues: (values: Record<string, any>, id?: string, name?: string) => void;
  placeholder?: string;
  addClass?: string;
  addFieldClass?: string;
  addLabelClass?: string;
  addLabelAboveClass?: string;
  required?: boolean;
  type?: InputTypes;
  animated?: boolean;
  hasError: boolean;
  errorMessage?: string;
  maxlength?: number;
  rows?: number;
  innerRef?: RefObject<any>;
  disabled?: boolean;
  defaultValue?: any;
  multi?: boolean;
  hasPattern?: boolean;
};
