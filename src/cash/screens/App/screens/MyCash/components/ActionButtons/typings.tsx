import { TableType } from '../Watchlist/helpers';

export type ActionButtonsProps = {
  currentKey: string;
  name: string;
  isDefault: boolean;
  userSettings: PortfolioSettings;
  query: any;
  isDirty: React.MutableRefObject<any>;
  isDirtySortTableRef: React.MutableRefObject<any>;
  tableType: TableType;
  isLoading: boolean;
  isEmpty: boolean;
  soldOutPositions?: boolean;
  portfolio?: Portfolio;
  headers: string[];
};
