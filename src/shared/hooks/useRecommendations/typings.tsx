import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../constants/recommendations';

export type RecommendationsNode = {
  index?: number;
  id: string;
  gcid: string;
} & TeasableInterfaceNode;

export type RecommendationsItem = {
  node: RecommendationsNode;
  skeleton?: boolean;
};

// recommendation[operation]....

export type Recommendations = Record<
  string,
  {
    metaData: {
      contentId: string;
      type: string;
      correlationId: string;
    };
    items: Array<RecommendationsItem>;
  }
>;

export type useRecommendationsConfig = {
  contentId: string;
  articleKeywords: KeywordConnection;
  mainChannel?: string;
  publication: string;
  excludeHistory?: boolean;
  operation?: RECOMMENDATION_OPERATION;
  origin?: string;
  limit?: number;
  type?: RECOMMENDATION_TYPE;
  nativeAdvertisingConfig?: number[];
  hasRelatedContentField?: boolean;
  ignoreTeaserImpressions?: boolean;
  fallbackNativeAdvertisingGcIds?: string[];
};

export type useRecommendationsResponse = {
  recommendations: Recommendations;
  fetchRecommendations: (
    options: useRecommendationsConfig,
    dynamicOperationsConfig?: string[],
  ) => Promise<RecommendationsItem[]>;
};
