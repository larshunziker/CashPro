declare type FieldOption = {
  value: string | number;
  label?: string | number;
  content: string | number;
};

declare type Option = string | number;

declare type Options = Array<Option>;

declare type Select = {
  id: string;
  name: string;
  options: Array<FieldOption>;
  placeholder?: string;
};

declare type Input = {
  id: string;
  name?: string;
  type: string;
  placeholder?: string | ReactElement;
  animated?: boolean;
  require?: boolean;
  maxlength?: number;
  errorMessage?: string;
  addClass?: string;
  addLabelClass?: string;
  required?: boolean;
  disabled?: boolean;
};

declare type Fieldset = {
  fieldset: string;
  name?: string;
  selects?: Array<Select>;
  inputs?: Array<Input>;
};

declare type Form = Array<Fieldset>;
