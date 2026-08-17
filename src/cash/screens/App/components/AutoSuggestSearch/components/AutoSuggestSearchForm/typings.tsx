export type AutoSuggestSearchFormProps = {
  formSubmit: React.FormEventHandler<HTMLElement>;
  handleUpdateQuery: React.ChangeEventHandler<HTMLElement>;
  searchQuery: string;
  showLoader: boolean;
  placeholder: string;
  isDisabled: boolean;
  showErrorMessage: boolean;
  appInputAriaLabel: string;
  addClass: string;
  errorMessage: string;
  hasInputFocus: boolean;
  setHasInputFocus: Function;
  inputRef: React.RefObject<HTMLInputElement>;
};
