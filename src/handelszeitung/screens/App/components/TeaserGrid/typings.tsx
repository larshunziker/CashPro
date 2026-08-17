export type BookmarkTeaserGridProps = {
  gridConfig: BookmarkGridConfig;
  items: TeaserInterface[];
  origin?: string;
};

export type BookmarkGridConfig = {
  rows: BookmarkGridRow[];
};

export type BookmarkGridRow = {
  defaultItemWidth?: number;
  hasContainer?: boolean;
  isGridEnabled?: boolean;
  isMarginDisabled?: boolean;
  hasTeaserDivider?: boolean;
  items: BookmarkGridItem[];
};

export type BookmarkGridItem = {
  type: string;
  offset?: number;
  col?: number;
  width?: number;
  count?: number;
  position?: string;
  component?: string;
  data?: TeasableInterfaceNode;
};
