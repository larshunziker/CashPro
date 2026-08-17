export type RecommendationsItem = {
  node: {
    index?: number;
    id: string;
    gcid: string;
    points: number;
    zipCode: string;
    city: string;
    address: string;
    secondaryName: string;
    organizationTeaserData: OrganizationTeaserData;
  } & TeasableInterfaceNode;
  skeleton?: boolean;
};

export type OrganizationTeaserData = {
  points?: number;
  zipCode?: string;
  city?: string;
  address?: string;
  secondaryName?: string;
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
