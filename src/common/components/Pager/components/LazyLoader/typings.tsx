import { ReactNode } from 'react';
import { IconComponent } from '../../../Icon/typings';

type PagerFactoryStyles = {
  LoadMore?: string;
  IconArrowRotateRight?: string;
  IsLoading?: string;
};

export type PagerFactoryProps = {
  isLoading?: boolean;
  hasMoreResults?: boolean;
  className?: string;
  children?: ReactNode;
  label?: string;
  currentPage?: number;
  itemsCount?: number;
  itemsPerPage?: number;
  updatePage?: Function;
};

export type PagerFactoryOptions = {
  styles: PagerFactoryStyles;
  Icon: IconComponent;
  label?: string;
};
