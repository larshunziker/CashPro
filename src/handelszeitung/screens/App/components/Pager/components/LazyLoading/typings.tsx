import { ReactNode } from 'react';

export type LazyLoadingProps = {
  isLoading: boolean;
  loadMore?: () => void;
  hasMoreResults: boolean;
  className?: string;
  children?: ReactNode;
};
