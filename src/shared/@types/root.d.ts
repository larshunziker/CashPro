declare type QueryRoot = Environment & {
  environment?: Environment;
  dailyHoroscope?: string;
  refetch?: Function;
};

declare type Environment = {
  citySearch?: FacetedSearchGraphList;
  commentsById?: CommentGraphList;
  globalSearch?: SearchableUnionGraphList;
  gridByLandingPage?: SearchableUnionGraphList;
  jobFeed?: JobFeed;
  keywordsByChar?: KeywordGraphList;
  mailchimpSearchRequest?: string;
  menuByName?: MenuGraphList;
  onmedaByChar?: TitleAliasGraphList;
  personByChar?: PersonGraphList;
  rankingList?: RankingGraphList;
  restaurantSearch?: RestaurantSearchList;
  restaurantSearchNew?: OrganizationGraphList;
  routeByPath?: Route;
  search?: SearchableUnionGraphList;
  socialFeed?: SocialPostGraphList;
  sponsors?: SponsorGraphList;
  termsByVocabulary?: ChannelGraphList;
};
