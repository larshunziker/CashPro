import { ReactElement } from 'react';
import { RecommendationsNode } from '../../../../../shared/hooks/useRecommendations/typings';
import { AppNexusFactoryProps } from '../../../../../common/components/AppNexus/typings';

export type ParagraphsProps = Pick<AppNexusFactoryProps, 'isAdSuppressed'> & {
  pageBody: Array<ParagraphInterface>;
  applyDataFilter?: Function;
  colStyle?: string;
  params?: Record<string, any>;
  hasContainer?: boolean;
  addClass?: string;
  origin: string;
  addSectionClass?: string;
  recommendationsEl?: ReactElement;
  latestNAGenerator?: Generator<RecommendationsNode> | null;
  forceUpdate?: any;
  isMarketingPageReducedHeader?: boolean;
};
