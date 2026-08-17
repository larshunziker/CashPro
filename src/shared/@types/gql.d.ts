import { RouterProps } from './routerLocation.d.ts';

// Since the RouteObjectInterface has only two fields in common, we have to create our own ContentTypeUnion with canonicalUri, preferredUri and all possible fields form the remaining content_types.
declare type ContentTypeUnion =
  | Article
  | Channel
  | Sponsor
  | NativeAdvertising
  | Keyword
  | ExplainingArticle
  | ImageGallery
  | LandingPage
  | Organization
  | Person
  | Ranking
  | Branch
  | Recipe
  | Product
  | Teaser
  | Topic
  | Video
  | Dossier
  | ContentBox
  | Page;

declare type RaschRouter = {
  canonical?: string;
  id?: string;
  object?: Partial<ContentTypeUnion>;
  preferred?: string;
  statusCode?: number;
};

declare type TeaserInterface = {
  __typename?: string;
  title?: string;
  teaserImage?: Image | any;
  shortTitle?: string;
  preferredUri?: string;
  hasVideo?: boolean;
  authors?: AuthorConnection;
  channel?: Channel;
  style?: string;
  node?: TeasableInterfaceNode;
  publicationDate?: string;
};

declare type TeasableInterface = {
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
  teaserImage?: Image | null;
  shortTitle?: string;
  preferredUri?: string;
  lead?: string;
  sponsor?: Sponsor;
  createDate?: string;
  relatedPersons?: RelatedPersons;
  canonicalUri?: string;
  __typename: string;
  publicationDate?: string;
};

declare type TeasableInterfaceEdge = {
  node?: Maybe<TeasableInterface>;
};

declare type WithRaschRouter = {
  loading: Pick<LocationState, 'loading'>;
  location?: RaschRouterLocation;
  error?: Record<string, any>;
  lastLocation?: RaschRouterLocation;
  refetchLoading?: boolean;
  data: Maybe<Query> & {
    error?: Record<string, any>;
    isStatic?: boolean;
    environment?: Partial<Environment> & {
      routeByPath?: Partial<Route> & {
        object: Partial<
          ContentTypeUnion & { subtypeValue: string; specialInterest: string }
        >;
      };
    };
    breadcrumbsData?: any;
  };
} & Pick<RouterProps, 'page'>;
