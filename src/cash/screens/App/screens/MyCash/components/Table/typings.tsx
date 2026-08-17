import { AlertListData } from '../Alerts/typings';
import { PortfolioGroupings } from '../Portfolio/typings';
export type TableProps = {
  tableFieldHeaders?: string[];
  component?: string;
  data: Portfolio & Watchlist & AlertListData;
  groupType?: PortfolioGroupings;
  sortFunction?: (column: string, direction: number) => void;
  isDirtySortTableRef: React.MutableRefObject<boolean>;
  type:
    | 'portfolio'
    | 'watchlist'
    | 'muster-portfolio'
    | 'transactions-sell'
    | 'transactions-buy'
    | 'cash-item-overview'
    | 'alert-overview'
    | 'quote-list'
    | 'chart-comparison';
  tableHeaders: Record<string, any>;
  location: Partial<RaschRouterLocation>;
  origin?: string;
  itemsPerPage?: number;
  depotPrice?: string;
};

export type TableLegendProps = Pick<
  TableProps,
  'tableHeaders' | 'component' | 'type' | 'data'
>;
