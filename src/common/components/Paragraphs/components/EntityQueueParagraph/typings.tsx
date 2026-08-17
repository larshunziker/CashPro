import React, { ReactElement } from 'react';
import { RecommendationsNode } from '../../../../../shared/hooks/useRecommendations/typings';
import { IconComponent } from '../../../Icon/typings';

export type EntityQueueParagraphProps = {
  entityQueue: EntityQueueParagraph;
  isFirst?: boolean;
  origin?: string;
  paragraphIndex?: number;
  latestNAGenerator?: Generator<RecommendationsNode, any, any>;
  iconTypeRight?: string;
};

export type EntityQueueParagraphFactoryOptionsStyles = {
  TitleWrapper?: string;
  InnerContainer: string;
  Title?: string;
  IconRight?: string;
};

export type EntityQueueParagraphComponent = (
  props: EntityQueueParagraphProps,
) => ReactElement;

export type EntityQueueParagraphFactoryOptions = {
  ensureTeaserInterface: Function;
  TeaserGrid: React.ComponentType<any>;
  styles?: EntityQueueParagraphFactoryOptionsStyles;
  utmTrackingParams?: string;
  gridConfigLayout: string | Function;
  trackingClass?: string;
  Icon?: IconComponent;
  appTitle?: (props: EntityQueueParagraphProps) => ReactElement | string;
};
