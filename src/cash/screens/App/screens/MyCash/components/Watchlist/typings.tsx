import {
  CUSTOM_VIEW,
  DEFAULT_VIEW,
  LIMIT_VIEW,
  MONITOR_VIEW,
  ORIGINAL_CURRENCY_VIEW,
  PERFORMANCE_VIEW,
  SPECIAL_INFO_VIEW,
  TRADER_VIEW,
} from '../Table/constants';
import { RasRouterProps } from '../../../../components/Router/typings';

export type WatchlistProps = Partial<RasRouterProps>;

export type ViewType =
  | typeof DEFAULT_VIEW
  | typeof PERFORMANCE_VIEW
  | typeof ORIGINAL_CURRENCY_VIEW
  | typeof TRADER_VIEW
  | typeof LIMIT_VIEW
  | typeof MONITOR_VIEW
  | typeof CUSTOM_VIEW
  | typeof SPECIAL_INFO_VIEW;
