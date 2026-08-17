import { RECOMMENDATION_TYPE } from '../../../../../shared/constants/recommendations';
import { useRecommendationsConfig } from '../../../../../shared/hooks/useRecommendations/typings';

export type ArticleRecommendationsProps = Maybe<
  Pick<useRecommendationsConfig, 'nativeAdvertisingConfig'>
> & {
  contentGcid: string;
  origin: string;
  articleKeywords: KeywordConnection;
  publication: string;
  articleColStyle: string;
  title?: string;
  prerenderSkeletonItems?: number;
  pageLayoutType?: string;
  type?: RECOMMENDATION_TYPE;
  ignoreTeaserImpressions?: boolean;
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
  teaserGridLayout?: string | ((props: ArticleRecommendationsProps) => string);
  fallbackNativeAdvertisingGcIds?: string[];
  styles:
    | ArticleRecommendationsFactoryOptionsStyles
    | ((
        props: ArticleRecommendationsProps,
      ) => ArticleRecommendationsFactoryOptionsStyles);
};
