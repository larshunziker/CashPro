export type AutoSuggestSearchProps = {
  isDisabled?: boolean;
  showErrorMessage?: boolean;
  placeholder: string;
  onClickResult: Function;
  appInputAriaLabel: string;
  searchResultConfig?: Array<String>;
  resultWithBorder?: boolean;
  placeholderStyle: string;
  errorMessage?: string;
  searchResultHeight?: number;
  isInsideDrawer?: boolean;
  origin: string;
};
