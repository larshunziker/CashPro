import { ReactElement } from 'react';
import { RecommendationsNode } from '../../../../../../../shared/hooks/useRecommendations/typings';
import { AppNexusFactoryProps } from '../../../../../../../common/components/AppNexus/typings';

export type ParagraphsRendererProps = Pick<
  AppNexusFactoryProps,
  'isAdSuppressed'
> & {
  pageBody: Array<ParagraphInterface>;
  params?: Record<string, any>;
  colStyle?: string;
  hasContainer?: boolean;
  addClass?: string;
  origin: string;
  addSectionClass?: string;
  recommendationsEl?: ReactElement<any> | null;
  forceUpdate?: any;
  latestNAGenerator?: Generator<RecommendationsNode> | null;
};
