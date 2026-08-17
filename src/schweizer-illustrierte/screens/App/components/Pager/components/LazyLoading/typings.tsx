export type LazyLoadingPagerProps = {
  hasNextPage: () => boolean;
  handleNextPage: () => void;
};

export type LazyLoadingProps = {
  isLoading: boolean;
  loadMore?: (event: React.MouseEvent) => void;
  hasMoreResults: boolean;
  children: Function;
};
