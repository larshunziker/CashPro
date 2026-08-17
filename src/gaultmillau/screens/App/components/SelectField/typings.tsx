export type SelectFieldProps = FieldComponentProps & {
  hidePlaceholderFromOptions?: string;
  name: string;
  hasError: boolean;
  placeholder: string;
  values: [string, string];
  setValues: ({}) => void;
  options: { content: string; value: string }[];
  addIconClass?: string;
};
