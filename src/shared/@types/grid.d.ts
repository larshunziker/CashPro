declare type GridItem = {
  type: string;
  offset?: number;
  col?: number;
  width?: number;
  count?: number;
  position?: string;
  component?: string;
  data?: Array<TeaserInterfac>;
  adConfig?: Array<Record<string, any>>;
  items?: Array<GridItem>;
  showRankingPosition?: boolean;
};

declare type GridRow = {
  items: Array<GridItem>;
  defaultItemWidth?: number;
  hasContainer?: boolean;
  isGridEnabled?: boolean;
  isMarginDisabled?: boolean;
  hasTeaserDivider?: boolean;
};

declare type GridConfig = {
  rows: Array<GridRow>;
};

declare type GridOptionsCols = {
  adConfig?: Array<any>;
  colSpan: number;
  hasContainer?: boolean;
  position?: string;
  type?: string;
  showRankingPosition?: boolean;
};

declare type GridOptions = {
  cols: Array<GridOptionsCols>;
  colsPerRow?: number;
};
