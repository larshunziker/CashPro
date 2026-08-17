export const hasNextPage = (
  currentPage: number,
  itemsCount: number,
  itemsPerPage: number,
): boolean => currentPage * itemsPerPage < itemsCount;

export const hasPreviousPage = (currentPage: number): boolean =>
  currentPage > 1;

export const calculateNextOffset = (
  itemsCount: number,
  itemsPerPage: number,
  nextPage: number,
): number =>
  // if the next offset is bigger than the amount of items, set the maximum to itemscount
  nextPage * itemsPerPage > itemsCount ? itemsCount : nextPage * itemsPerPage;

export const calculateNextLimit = (
  itemsCount: number,
  itemsPerPage: number,
  nextPage: number,
): number =>
  // if can't fetch a "full" set of items per page, we have to reduce the limit
  nextPage * itemsPerPage <= itemsCount
    ? itemsPerPage
    : itemsCount % itemsPerPage;
