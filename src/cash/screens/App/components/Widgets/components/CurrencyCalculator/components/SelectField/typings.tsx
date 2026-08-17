export type SelectOption = {
  currency: string;
  value: string;
  flag: {
    url: string;
    styles: string;
  };
};

export type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  hasError: boolean;
  initialSelect: SelectOption;
  register: (value: any) => void;
  onChange: (opt: SelectOption) => void;
  options: SelectOption[];
  disabledOption: SelectOption;
};
