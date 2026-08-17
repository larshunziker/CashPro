import { ComponentType, ReactElement } from 'react';

type getDynamicGridOptionsType = (getDynamicGridOptions: {
  pageSize: number;
  itemsPerRow: number;
  teaserType?: string;
  hasContainer?: boolean;
}) => GridConfig;

export type BookmarkListFactoryOptions = {
  styles: {
    BookmarkListWrapper: string;
  };
  getDynamicGridOptions?: getDynamicGridOptionsType;
  TeaserGrid: any; //TODO: add TeaserGrid typing here
  teaserType?: string;
  itemsPerRow?: number;
  Pager?: ComponentType<{
    itemsCount: number;
    itemsPerPage: number;
    currentPage: number;
    component: string;
  }>;
  pagerType?: string;
  teaserGridLayout?: string;
  pageSize?: number;
  withPagePagerDecorator?: boolean;
};

export type BookmarkListComponent = (props: BookmarkListProps) => ReactElement;

export type BookmarkListProps = {
  items: Array<Bookmark>;
};
