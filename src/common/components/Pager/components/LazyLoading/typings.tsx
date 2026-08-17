import { ReactNode } from 'react';
import { IconComponent } from '../../../Icon/typings';

type PagerFactoryStyles = {
  LoadMore?: string;
  IconArrowRotateRight: string;
  IsLoading: string;
};

export type PagerFactoryProps = {
  isLoading?: boolean;
  loadMore?: (event: React.MouseEvent) => void;
  hasMoreResults?: boolean;
  className?: string;
  children?: ReactNode;
  label?: string;
};

export type PagerFactoryOptions = {
  styles: PagerFactoryStyles;
  Icon: IconComponent;
};
