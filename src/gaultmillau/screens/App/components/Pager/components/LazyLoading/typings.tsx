import { ReactNode } from 'react';

export type LazyLoadingProps = {
  IsLoading: boolean;
  loadMore?: (event: React.MouseEvent) => void;
  hasMoreResults: boolean;
  className?: string;
  children?: ReactNode;
};
