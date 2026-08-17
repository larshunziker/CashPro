import { AdZoneProps } from '../../../../../../components/Widgets/components/AdZone/typings';
import { AlertListData, ExtendedAlertListItem } from '../../../Alerts/typings';

export type ExtendedInstrument = Partial<Instrument> &
  Partial<ExtendedAlertListItem> &
  Partial<Omit<Transaction, '__typename'>> &
  Pick<AdZoneProps, 'adSlots'> & {
    identifier?: string;
    toggleable?: boolean;
    receiveType?: string;
  };

export type TableRowProps = {
  instrument: ExtendedInstrument;
  data: Portfolio & Watchlist & AlertListData;
  index: number;
  tableFieldHeaders: string[];
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
  fallbackValue?: string | JSX.Element;
  disableDropdown?: boolean;
};
