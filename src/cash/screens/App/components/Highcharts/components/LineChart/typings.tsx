import { TimeRange } from '../../typings';

export type LineChartProps = {
  data: Record<any, any>;
  origin: string;
  isInterActiveButtonVisible?: boolean;
  timeRange?: TimeRange;
  fullquoteUrl?: string;
  loading?: boolean;
  error?: any;
};
