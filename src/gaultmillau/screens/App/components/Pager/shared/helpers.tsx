import range from 'lodash/range';

export const hasNextPage = (
  currentPage: number,
  itemsCount: number,
  itemsPerPage: number,
) => currentPage * itemsPerPage < itemsCount;

export const hasPreviousPage = (currentPage: number) => currentPage > 1;

export const generatePaginationItems = (
  currentPage: number,
  totalPages: number,
  startPage: number,
  maxItems: number,
): Array<number> => {
  const start: number = startPage;
  let end: number = startPage;
  const remainingPages: number = totalPages - currentPage;

  if (remainingPages === 0) {
    end = currentPage;
  } else {
    end = Math.min(start + maxItems - 1, currentPage + remainingPages);
  }
  return start === end ? [start] : range(start, end + 1);
};
