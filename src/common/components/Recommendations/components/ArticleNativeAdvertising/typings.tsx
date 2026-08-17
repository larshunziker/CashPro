import { useRecommendationsConfig } from '../../../../../shared/hooks/useRecommendations/typings';

export type ArticleNativeAdvertisingProps = Maybe<
  Pick<
    useRecommendationsConfig,
    'nativeAdvertisingConfig' | 'ignoreTeaserImpressions' | 'type'
  >
> & {
  contentGcid: string;
  origin: string;
  articleKeywords: KeywordConnection;
  publication: string;
  articleColStyle: string;
  title?: string;
  prerenderSkeletonItems?: number;
  pageLayoutType?: string;
  isInRightColumn: boolean;
};

export type ArticleRecommendationsFactoryOptionsStyles = {
  Container: string;
  Row: string;
  Title: string;
  TitleWrapper: string;
  Wrapper: string;
};

export type ArticleRecommendationsFactoryOptions = {
  ensureTeaserInterface: Function;
  TeaserGrid: any; //TODO: add TeaserGrid typing here
  teaserGridLayout?:
    | string
    | ((props: ArticleNativeAdvertisingProps) => string);
  fallbackNativeAdvertisingGcIds?: string[];
  styles:
    | ArticleRecommendationsFactoryOptionsStyles
    | ((
        props: ArticleNativeAdvertisingProps,
      ) => ArticleRecommendationsFactoryOptionsStyles);
};
