export type VideoProps = Pick<RouterProps, 'location'> & {
  video: Video;
};

export type VideoDetailFactoryStyles = {
  BreadcrumbsContainer: string;
  Container: string;
  Row: string;
  VideoContainer: string;
  SocialBarWrapper: string;
  RecommendationsWrapper: string;
  CTAWrapper: string;
  Loading?: string;
  ArticleAlertsWrapper?: string;
  ArticleAlertsInnerWrapper?: string;
  Topic?: string;
};

export type VideoDetailFactoryOptions = {
  origin: string;
  styles: VideoDetailFactoryStyles | any;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  ArticleAlerts: (props) => JSX.Element;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  ArticleHeader?: (props) => JSX.Element;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  Breadcrumbs?: (props) => JSX.Element;
  ErrorMessage: Function;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  LinkButton: (props) => JSX.Element;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  OverviewPageHeader?: (props) => JSX.Element;
  getRecommendationItems?: Function;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  EditButtons?: (props) => JSX.Element;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  Paragraphs: (props) => JSX.Element;
  Recommendations?: Function;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  SocialBar?: (props) => JSX.Element;
  videoBlogChannelType?: string;
  videoRecommendationsQuery?: any;
  videosRouteUrl: string;
  publication: string;
  appMessageVideosOfChannel?: string;
  appMessageMoreVideos?: string;
  appMessageLoadingVideos?: string;
};
