export type AutoSuggestSearchResultsProps = {
  title: string;
  titleLink?: string;
  items: QuotesUnion[];
  handleSearchResults: Function;
  handleTitleSearchResults?: Function;
  filteredSearchResults?: { type: string; title: string; items: any }[];
};
