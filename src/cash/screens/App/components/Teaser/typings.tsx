export type { TeaserFactoryTeaserImage } from '../../../../../common/components/Teaser/typings';

export type TeaserProps = TeaserInterface & {
  component?: string;
  isActive?: boolean;
  trackingSelector?: string;
  trackingData?: Array<TrackingData>;
  isBlack?: boolean;
  isSkeleton?: boolean;
  skeletonPlaceholderImg?: string;
  subtypeValue?: string;
  sponsor?: Sponsor | null;
  addClass?: string;
  origin?: string;
  itemIndex?: number;
  node?: TeaserInterface;
};
