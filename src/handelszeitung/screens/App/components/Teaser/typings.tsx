import { TeaserFactoryProps } from '../../../../../common/components/Teaser/typings';
import { TeaserSummaryProps } from './components/TeaserSummary/typings';

export type { TeaserFactoryTeaserImage } from '../../../../../common/components/Teaser/typings';

type TeaserTypings = TeaserFactoryProps &
  TeaserSummaryProps &
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

export type TeaserProps = TeaserTypings & {
  node?: TeaserTypings;
};
