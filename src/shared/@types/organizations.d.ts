declare type Organization = MetatagInterface &
  TypeUnion & {
    activeMenuTrail?: ActiveMenuTrailGraphList | null;
    address?: string;
    canonicalUri?: string;
    changedDate?: string;
    city?: string;
    commercialSector?: CommercialSector | null;
    country?: Country | null;
    createDate?: string;
    description?: string;
    email?: string;
    foundationDate?: string;
    geolocation?: string;
    hasProfilePage?: boolean;
    hasVideo?: boolean;
    heroImageBody?: ParagraphInterface | null;
    id?: string;
    lead?: string;
    legalForm?: string;
    moneyhousePreferredUri?: string;
    nid?: string;
    organizationArticles?: ArticleGraphList | null;
    organizationData?: Restaurant | null;
    organizationPositions?: PositionGraphList | null;
    phone?: string;
    preferredUri?: string;
    publication?: string;
    publications?: PublicationList | null;
    recommendations?: RecommendationsGraphList | null;
    recommendedContent?: RouteInterface;
    revisionDate?: string;
    status?: string;
    teaserImage?: Image | null;
    title?: string;
    website?: string;
    zipCode?: string;
    cityList?: string;
    organizationType?: string;
    restaurantType?: string;
    editRelationUri?: string | null;
    editContentUri?: string | null;
    __typename?: string;
  };

declare type OrganizationGraphList = {
  edges?: Array<OrganizationGraphListItem>;
};

declare type OrganizationGraphListItem = {
  node?: Organization;
};
