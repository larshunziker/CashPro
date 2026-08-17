import { TeaserFactoryProps } from '../../../../../common/components/Teaser/typings';

export type { TeaserFactoryTeaserImage } from '../../../../../common/components/Teaser/typings';

export type TeaserProps = TeaserFactoryProps & {
  addClass?: string;
  component: string;
  counter?: number;
  disableIntersectionObserver?: boolean;
  isActive?: boolean;
  landingPage?: LandingPage;
  noLink?: boolean;
  origin?: string;
  sponsor?: Sponsor | null;
  changeDate?: string;
  createDate?: string;
  itemIndex?: number;
  node?: TeaserInterface;
};
