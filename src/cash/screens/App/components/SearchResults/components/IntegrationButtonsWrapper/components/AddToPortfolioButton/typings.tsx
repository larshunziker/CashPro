import {
  PORTFOLIO_TRADE_FORM_TYPE_BUY,
  PORTFOLIO_TRADE_FORM_TYPE_EDIT,
  PORTFOLIO_TRADE_FORM_TYPE_SELL,
} from '../../../../../PortfolioTradeForm/constants';

export type AddToPortfolioButtonProps = {
  listingId: string;
  instrumentType: string;
  iconName?: string;
  children: React.ReactNode;
  origin:
    | 'search'
    | 'muster-portfolio'
    | 'quote-list'
    | 'chart-comparison'
    | 'instrument-actions';
  type?:
    | typeof PORTFOLIO_TRADE_FORM_TYPE_BUY
    | typeof PORTFOLIO_TRADE_FORM_TYPE_SELL
    | typeof PORTFOLIO_TRADE_FORM_TYPE_EDIT;
};
