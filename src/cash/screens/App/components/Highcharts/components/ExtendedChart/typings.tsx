import { TimeRange } from '../../typings';

export type ExtendedChartProps = {
  location?: ReachRouterLocation;
  isInternal?: boolean;
  internalData?: InternalData;
};

type InternalData = {
  listingId?: string;
  timePeriod: TimeRange[];
};
