export type RecommendationsItem = {
  node: {
    index?: number;
    id: string;
    gcid: string;
  } & TeasableInterfaceNode;
  skeleton?: boolean;
};

export type SplitRecommendationsItems = {
  part1: RecommendationsItem[];
  part2: RecommendationsItem[];
};

export type RecommendationsProps = {
  items?: RecommendationsItem[];
  title?: string;
  titleLinkPath?: string;
  isInsideParagraph?: boolean;
  isBlack?: boolean;
  moreRecommendations?: boolean;
  teaserLayout?: string;
  trackingOrigin?: string;
};

export type RecommendationsFactoryOptionsStyles = {
  RecommendationItem?: string;
  Wrapper?: string;
  Title?: string;
  RecommendationsListContainer?: string;
};

export type RecommendationsFactoryOptions = {
  Teaser: React.ComponentType<any>;
  skeletonPlaceholderImg: string;
  styles:
    | RecommendationsFactoryOptionsStyles
    | ((props: RecommendationsProps) => RecommendationsFactoryOptionsStyles);
  ensureTeaserInterfaceItem?: (
    item: RecommendationsProps,
    index?: number,
  ) => any;
  mapTeaserInterface?: (item: RecommendationsItem) => RecommendationsItem;
};
