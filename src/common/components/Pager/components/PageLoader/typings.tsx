import { IconComponent } from '../../../Icon/typings';

export type PagerProps = {
  currentIndex?: number;
  isRight?: boolean;
  anchorScrollId?: string;
  hasNextPage: () => boolean;
  hasPreviousPage: () => boolean;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  itemsCount: number;
};

export type PagerFactoryStyles = {
  Wrapper: string;
  PageLink: string; // check
  ActiveItem: string; // check
  PagerPlaceholder: string; // check
  NextButton: string; // check
  Disabled: string; // check
  Icon: string; // check
  PrevButton: string; // check
};

export type PagerFactoryOptions = {
  Icon: IconComponent;
  styles: PagerFactoryStyles;
};
