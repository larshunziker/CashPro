import React from 'react';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../shared/constants/recommendations';

export type GetGridLayoutByProps = (
  props: RecommendedContentSectionProps,
) => string;

export type RecommendedContentSectionProps = {
  article: Partial<Article>;
  title: string;
  outerWrapperClass?: string;
  limit?: number;
  nativeAdvertisingConfig?: number[];
  type?: RECOMMENDATION_TYPE;
  operation?: RECOMMENDATION_OPERATION;
  hasRelatedContentField?: boolean;
  skipInArticleRecommendations?: number;
  isSplittedPageLayout?: boolean;
};

export type RecommendedContentSectionFactoryOptions = {
  RelatedContent: React.ComponentType<any>; //TODO: add RelatedContent typing here
  ensureTeaserInterface: (
    nodes: Array<TeasableInterfaceGraphListItem>,
  ) => Array<TeasableInterfaceGraphListItem>;
  publication: string;
  gridLayout: string | GetGridLayoutByProps;
  hasTitleContainer?: boolean;
};
