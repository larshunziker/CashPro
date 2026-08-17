export type MinistageTrendingTopicsProps = {
  ministageParagraph: MinistageParagraph;
  useFullwidthBackground?: boolean;
  origin?: string;
  isSplittedPageLayout?: boolean;
};

export type GetStylesByProps<T> = (
  props: T,
) => MinistageTrendingTopicsFactoryOptionsStyles;

export type MinistageTrendingTopicsFactoryOptions<T = {}> = {
  styles: GetStylesByProps<T> | MinistageTrendingTopicsFactoryOptionsStyles;
  labelPrefix?: string;
  titleFallback?: string;
};

export type MinistageTrendingTopicsFactoryOptionsStyles = {
  Wrapper: string;
  ContentWrapper: string;
  Title: string;
  KeywordWrapper?: string;
  Keyword: string;
  ActivePath?: string;
};
