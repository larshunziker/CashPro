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
export type RecommendationProps = {
  items?: RecommendationsItem[];
  title?: string;
  titleLinkPath?: string;
  isInsideParagraph?: boolean;
  isBlack?: boolean;
};
