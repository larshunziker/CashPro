declare type Recommendation = Organization | Article | Recipe | Teaser;

declare type RecommendationsGraphList = {
  count?: number;
  edges?: Array<RecommendationListItem>;
};

declare type RecommendationListItem = {
  node?: Recommendation;
};
