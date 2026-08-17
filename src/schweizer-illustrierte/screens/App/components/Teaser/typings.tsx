import { ReactElement } from 'react';

export type TeaserProps = TeaserInterface & {
  component?: string;
  isActive?: boolean;
  trackingSelector?: string;
  trackingData?: Array<TrackingData>;
  isBlack?: boolean;
  isSkeleton?: boolean;
  skeletonPlaceholderImg?: string;
};

export type TeaserComponent = (props: TeaserProps) => ReactElement;
