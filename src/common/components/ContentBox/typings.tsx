import { ComponentType } from 'react';
import { RecommendationsItem } from '../../../shared/hooks/useRecommendations/typings';

export type ContentBoxProps = {
  component: string;
  node: ContentBox;
  origin?: string;
  publication?: string;
};

export type ContentBoxData = {
  contentBoxType: string;
  items: RecommendationsItem[] | NodeInterfaceEdge[] | LatestArticlesItem[];
};

export type LatestArticlesItem = {
  node: ContentBox | SearchableUnion;
};

export type ContentBoxFactoryOptionsStyles = {
  Wrapper: string;
  Title: string;
  Link?: string;
  TeaserWrapper?: string;
  LinkWrapper?: string;
};

export type SkeletonThemeProps = 'GreyC';

export type ContentBoxFactoryOptions = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  TeaserGridRenderer: () => (props) => JSX.Element;
  SingleTeaser?: ComponentType<
    TeaserInterface & {
      component: string;
      node?: TeaserInterface;
      origin?: string;
      itemIndex?: number;
    }
  >;
  getContentBoxRowGridOptions: (
    pageSize: number,
    teaserType: string,
  ) => GridConfig;
  teaserLayout: string;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  Skeleton: (props) => JSX.Element;
  skeletonTheme?: SkeletonThemeProps;
  contentBoxType?: string | ((props: ContentBoxProps) => string);
  title?: string | ((props: ContentBoxProps) => string);
  linkLabel?: string | ((props: ContentBoxProps) => string);
  publication: string | ((props: ContentBoxProps) => string);
  styles:
    | ContentBoxFactoryOptionsStyles
    | ((props: ContentBoxProps) => ContentBoxFactoryOptionsStyles);
};

export type ContentBoxComponent = ComponentType<ContentBoxProps>;
