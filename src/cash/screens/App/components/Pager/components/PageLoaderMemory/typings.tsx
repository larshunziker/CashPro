export type PagerProps = {
  currentIndex?: number;
  isRight?: boolean;
  anchorScrollId?: string;
  hasNextPage: () => boolean;
  hasPreviousPage: () => boolean;
  currentPage: number;
  itemsPerPage: number;
  itemsCount: number;
  handleClick: (pageNumber: number) => void;
};
