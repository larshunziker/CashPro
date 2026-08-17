import { HIGHCHART_INTERACTIVE_CHART, HIGHCHART_LINE_CHART } from './constants';

export type TimeRange =
  | 'intraday'
  | 'oneWeek'
  | 'oneMonth'
  | 'threeMonth'
  | 'sixMonths'
  | 'ytd'
  | 'oneYear'
  | 'all'
  | 'threeYear'
  | 'fiveYears'
  | 'allIntraday';

export type HighchartsWrapperProps = {
  activeState?: number;
  isTabVisible?: boolean;
  isInterActiveButtonVisible?: boolean;
  component: typeof HIGHCHART_LINE_CHART | typeof HIGHCHART_INTERACTIVE_CHART;
  widgetParagraph: WidgetParagraph;
  origin?: string;
  externalFullquoteUrl?: string;
};

export type Variant = 'singleValor' | 'multipleValors' | 'context';

export type Price = {
  high: number | null;
  low: number | null;
  open: number | null;
  close: number | null;
  date: Date | null;
  volume: number | null;
};
