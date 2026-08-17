declare type WebformParagraph = {
  webform_id: string;
  restrictionMessage: string;
  restrictionValue: 'private' | 'public';
  items: Array<WebformFieldset>;
  reCaptchaEnabled: boolean;
  webformClosedMessage?: string;
  oneLogLoginCase?: string;
};

declare type WebformFieldset = WebformField & {
  items: Array<WebformField>;
};

declare type WebformField = {
  fieldName: string;
  title: string;
  type: string;
  value: string;
  disabled?: boolean;
  description?: string;
  empty_option?: string;
  maxlength?: number;
  options?: Array<WebformFieldOption>;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  required_error?: string;
  submit__label?: string;
  date_date_min?: string;
  date_date_max?: string;
  file_extensions?: string;
  max_filesize?: string;
  multiple?: boolean;
  help?: string;
  rows?: number;
  readonly?: boolean;
  inputmode?:
    | 'search'
    | 'none'
    | 'text'
    | 'numeric'
    | 'email'
    | 'tel'
    | 'url'
    | 'decimal';
  autocomplete?: string;
};

declare type FieldComponentProps = WebformField & {
  validate?: Function;
  getValue?: Function;
  setValue?: Function;
  setIsValid?: Function;
  getId?: Function;
  successCallback?: Function;
  id: string;
  register: Function;
  errorMessage: string;
  label?: string;
  initialValue?: any;
  helperText?: string;
};

declare type WebformFieldOption = {
  initiallyChecked?: boolean;
  disabled?: boolean;
  value?: string;
  label?: string;
  description?: string;
};
