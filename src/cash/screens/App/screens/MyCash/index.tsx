import React, { ReactElement, memo } from 'react';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import Alerts from './components/Alerts';
import CashItems from './components/CashItems';
import CustomView from './components/CustomView';
import CustomPortfoliosOrder from './components/CustomView/components/CustomPortfoliosOrder';
import Portfolio from './components/Portfolio';
import PortfolioInstrument from './components/PortfolioInstrument';
import Portfolios from './components/Portfolios';
import Watchlist from './components/Watchlist';
import {
  MY_CASH_ALERTS,
  MY_CASH_PORTFOLIO,
  MY_CASH_PORTFOLIOS,
  MY_CASH_PORTFOLIOS_ORDER,
  MY_CASH_PORTFOLIO_CASH_ITEMS,
  MY_CASH_PORTFOLIO_CUSTOM_VIEW,
  MY_CASH_PORTFOLIO_INSTRUMENT,
  MY_CASH_PORTFOLIO_TRANSACTIONS,
  MY_CASH_WATCHLIST,
  MY_CASH_WATCHLIST_CUSTOM_VIEW,
} from './constants';
import { AlertsProps } from './components/Alerts/typings';
import { PortfolioProps } from './components/Portfolio/typings';
import { WatchlistProps } from './components/Watchlist/typings';

const Switch = createComponentSwitch({
  [MY_CASH_ALERTS]: Alerts,
  [MY_CASH_PORTFOLIOS]: Portfolios,
  [MY_CASH_PORTFOLIOS_ORDER]: CustomPortfoliosOrder,
  [MY_CASH_PORTFOLIO]: Portfolio,
  [MY_CASH_PORTFOLIO_TRANSACTIONS]: PortfolioInstrument,
  [MY_CASH_PORTFOLIO_INSTRUMENT]: PortfolioInstrument,
  [MY_CASH_PORTFOLIO_CUSTOM_VIEW]: CustomView,
  [MY_CASH_WATCHLIST]: Watchlist,
  [MY_CASH_WATCHLIST_CUSTOM_VIEW]: CustomView,
  [MY_CASH_PORTFOLIO_CASH_ITEMS]: CashItems,
});

type MyCashProps = {
  component:
    | typeof MY_CASH_ALERTS
    | typeof MY_CASH_PORTFOLIOS
    | typeof MY_CASH_PORTFOLIOS_ORDER
    | typeof MY_CASH_PORTFOLIO
    | typeof MY_CASH_WATCHLIST
    | typeof MY_CASH_PORTFOLIO_CUSTOM_VIEW
    | typeof MY_CASH_WATCHLIST_CUSTOM_VIEW
    | typeof MY_CASH_PORTFOLIO_INSTRUMENT
    | typeof MY_CASH_PORTFOLIO_TRANSACTIONS
    | typeof MY_CASH_PORTFOLIO_CASH_ITEMS;
} & (AlertsProps | PortfolioProps | WatchlistProps);

const MyCash = (props: MyCashProps): ReactElement => {
  /* @ts-ignore TODO: TS2783 ->  'component' is specified more than once, so this usage will be overwritten. */
  return <Switch component={props.component} {...props} />;
};

export default memo<MyCashProps>(MyCash);
