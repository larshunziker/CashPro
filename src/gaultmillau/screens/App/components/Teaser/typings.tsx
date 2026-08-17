import { TeaserFactoryProps } from '../../../../../common/components/Teaser/typings';

export type { TeaserFactoryTeaserImage } from '../../../../../common/components/Teaser/typings';

export type TeaserProps = TeaserFactoryProps &
  TeasableInterfaceNode & {
    component: string;
    landingPage?: LandingPage;
    addClass?: string;
    showRankingPosition?: boolean;
    itemIndex?: number;
    noLink?: boolean;
    disableIntersectionObserver?: boolean;
    sponsor?: Sponsor | null;
    origin?: string;
    isActive?: boolean;
  };
