import { TimeRange } from '../../typings';

export type InteractiveChartProps = {
  data: Record<any, any>;
  timeRange?: TimeRange;
  colorSet?: Record<string, number>;
  setColorSet?: (colorSet: Record<string, number>) => void;
  forceUpdate?: () => void;
};
