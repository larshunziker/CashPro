export type AutocompleteProps = {
  addClass: string;
  queryString?: string;
  updateQueryString: (queryString: string) => void;
  minQueryLength: number;
};
