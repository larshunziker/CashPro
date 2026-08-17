import { ComponentType, ReactElement, ReactNode } from 'react';

export type TeaserFactoryProps = {
  component?: string; // used for component switch
  id: string;
  gcid?: string;
  authors?: AuthorConnection;
  authorPrefix?: string;
  __typename?: string;
  articleType?: string;
  isBlack?: boolean;
  badgeColor?: string;
  badgeLabel?: string;
  KMULabel?: string;
  bookmarkListState?: BookmarkListState;
  subtypeValue?: string;
  advertisingTypeLabel?: string;
  channel?: Channel;
  preferredUri: string;
  teaserImage?: ImageParagraph;
  image?: Image;
  title: string;
  hasVideo?: boolean;
  useAutoHyphens?: boolean;
  lead?: string;
  summary?: string;
  publication?: string;
  restrictionStatus?: string;
  publicationDate: string;
  link?: Link;
  shortTitle?: string;
  sponsor?: Sponsor;
  body?: ReactElement;
  openInFullscreen?: boolean;
  trackingEnabled?: boolean;
  trackingTeaserImpression?: string;
  trackingTeaserClick?: string;
  trackingData?: Array<TrackingData>;
  trackingSelector?: string;
  index?: number;
  contentBoxType?: string;
  isSkeleton?: boolean;
  skeletonPlaceholderImg?: string;
  relatedPersons?: PersonConnection;
  teaserType?: string;
  downloadPriority?: 'high' | 'default';
  showUpdated?: boolean;
  itemIndex?: number;
  origin?: string;
  isNumbered?: boolean;
  score?: number;
};

export type TeaserComponent = ComponentType<TeaserFactoryProps>;

export type TeaserFactoryState = {
  isInView: boolean;
  id: string;
};

export type GetTeaserFactoryStylesByProps<T> = (
  props: T,
) => TeaserFactoryOptionsStyles;

export type GetTeaserFactoryImageStylesByProps<T> = (
  props: T,
) => ImageStylesObject;

export type GetTeaserFactoryImageByProps<T> = (props: T) => ImageParagraph;

export type GetElementByProps<T> = (props: T) => ReactElement;

type IsVisibleByProps<T> = (props: T) => boolean;

export type TeaserFactoryOptions<T> = {
  icon?: ReactElement | GetElementByProps<T>;
  titleBadge?: ReactElement | GetElementByProps<T>;
  sponsorImage?: ReactElement | GetElementByProps<T>;
  shortTitleElement?: ReactElement | GetElementByProps<T> | null;
  hasPublicationLogo?: boolean;
  isShortTitleHidden?: boolean | Function;
  formattedPublicationDate?: (
    props: TeaserFactoryProps,
  ) => string | ReactElement | null;
  isPublicationDateVisible?: boolean | IsVisibleByProps<T>;
  isAuthorVisible?: boolean | IsVisibleByProps<T>;
  isAuthorPrefixVisible?: boolean | IsVisibleByProps<T>;
  isIconPositionOnImage?: boolean | IsVisibleByProps<T>;
  teaserImageIdentifier?: string;
  badge?: ReactElement | GetElementByProps<T>;
  children?: ReactElement | ReactNode | GetElementByProps<T> | null;
  innerContent?: ReactElement | GetElementByProps<T> | null;
  outerContent?: ReactElement | GetElementByProps<T> | null;
  trackingTeaserHandler?: (payload: string) => void;
  teaserImageStyles?: ImageStylesObject | GetTeaserFactoryImageStylesByProps<T>;
  teaserImage?: ImageParagraph | GetTeaserFactoryImageByProps<T>;
  sponsorImageStyles?: Array<string>;
  fullScreenHashTeaserClick?: string;
  fullScreenHash?: string;
  leadOptions?: TeaserFactoryLeadOptions;
  styles: TeaserFactoryOptionsStyles | GetTeaserFactoryStylesByProps<T>;
  disableWrapperClassName?: boolean;
  disableLineHeightResetClassName?: boolean;
  allowHtmlTagsInTitle?: boolean;
  fusionSignal?: (props: T) => void;
};

export type TeaserFactoryOptionsStyles = {
  Wrapper: string;
  Image?: string;
  ImageWrapper?: string;
  PublicationLogo?: string;
  Title: string;
  TitleInner?: string;
  ShortTitle?: string;
  ContentWrapper?: string;
  IconStyle?: string;
  Lead?: string;
  BottomLineWrapper?: string;
  BottomLine?: string;
  ShowMore?: string;
  OuterWrapper?: string;
  SkeletonWrapper?: string;
  SkeletonContentWrapper?: string;
  SkeletonShortTitle?: string;
  SkeletonTitle?: string;
  Summary?: string;
  TitleTickerBox?: string;
};

export type TeaserFactoryLeadOptions = {
  truncateCount?: number;
  suffixText?: string;
  append?: string;
};

export type TeaserFactoryTeaserImage = {
  caption: string;
  credit: string;
  relativeOriginPath: string;
  initialThumbnailImage: string;
  initialGreyPlaceholderImage: string;
  alt: string;
};
