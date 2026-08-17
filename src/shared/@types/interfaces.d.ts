declare type TeaserImageInterface = TypeUnion & {
  credit?: string;
  relativeOriginPath?: string;
  alt?: string;
  caption?: string;
  image?: Image;
};

declare type TeaserInterface = TypeUnion &
  Partial<TeasableInterfaceNode> & {
    title?: string;
    teaserImage?: TeaserImageInterface;
    shortTitle?: string;
    preferredUri?: string;
    node?: TeasableInterfaceNode;
  };

declare type TeasableInterfaceNode = TypeUnion & {
  id?: string;
  changedDate?: string;
  hasVideo?: boolean;
  revisionDate?: string;
  showUpdated?: boolean;
  subtypeValue?: string;
  publications?: PublicationList;
  publication?: string;
  authors?: AuthorGraphList;
  channel?: Channel;
  trackingTeaserImpression?: string;
  trackingTeaserClick?: string;
  title?: string;
  teaserImage?: TeaserImageInterface | null;
  shortTitle?: string;
  preferredUri?: string;
  lead?: string;
  style?: string;
  sponsor?: Sponsor;
  createDate?: string;
  publicationDate?: string;
  changeDate?: string;
  relatedPersons?: RelatedPersons;
  canonicalUri?: string;
  organizationType?: string;
  teaserType?: string;
  organizationData?: Restaurant;
  articleType?: string;
  link?: Link;
  restrictionStatus?: RestrictionStatusEnum | string;
};

declare type TeasableInterfaceGraphList = {
  edges?: Array<TeasableInterfaceGraphListItem>;
};

declare type TeasableInterfaceGraphListItem = {
  node?: TeasableInterfaceNode;
};

declare type MetatagInterface = {
  metaAbstract?: string;
  metaArticlePublisher?: string;
  metaCanonicalUrl?: string;
  metaDescription?: string;
  metaImage?: string;
  metaKeywords?: string;
  metaNewsKeywords?: string;
  metaOgDescription?: string;
  metaOgLatitude?: string;
  metaOgLongitude?: string;
  metaOgTitle?: string;
  metaOgType?: string;
  metaOgUrl?: string;
  metaRobots?: string;
  metaStandout?: string;
  metaTitle?: string;
  metaTwitterAccount?: string;
  metaTwitterCardsDescription?: string;
  metaTwitterCardsTitle?: string;
  metaTwitterCardType?: string;
};
