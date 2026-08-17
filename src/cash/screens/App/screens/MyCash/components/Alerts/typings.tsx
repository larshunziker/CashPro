import { RasRouterProps } from '../../../../components/Router/typings';

export type AlertsProps = RasRouterProps & {
  data: Maybe<AlertList>;
};

export type ExtendedAlertListItem = Omit<AlertListItem, '__typename'> & {
  id: string;
  mName?: string;
  fullquoteUri?: string;
  mValor?: string;
  brokenTime?: string;
  receiveType?: string;
  transactionKey?: string;
  instrumentKey?: string;
};

export type AlertListData = {
  id: string;
  items: ExtendedAlertListItem[];
};
