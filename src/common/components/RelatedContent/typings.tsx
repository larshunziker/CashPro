import { ComponentType, ReactElement } from 'react';

export type RelatedContentProps = {
  teaserGridOptions?: Function;
  getGridOptions?: Function;
  gridOptionType?: string;
  itemCount?: number;
  title: string | ReactElement;
  titleHasContainer?: boolean;
  relatedContent:
    | RelatedContentUnionConnection
    | ArticleConnection
    | NativeAdvertisingConnection
    | ArticleUnionConnection;
  outerWrapperClass?: string;
  titleInverted?: boolean;
  page?: number;
  pageSize?: number;
  pagerType?: string;
  hasContainer?: boolean;
  teaserGridLayout: string;
};

export type RelatedContentFactoryOptionsStyles = {
  OuterWrapper: string;
  Wrapper: string;
  TitleWrapper: string;
  Title: string;
  TeaserListSpacing: string;
  Container: string;
};

export type RelatedContentFactoryOptions = {
  TeaserList?: Function;
  teaserGrid?: Function;
  Pager?: ComponentType<{
    itemsCount: number;
    itemsPerPage: number;
    currentPage: number;
    component: string;
    anchorScrollId?: string;
  }>;
  styles:
    | RelatedContentFactoryOptionsStyles
    | ((props: Object) => RelatedContentFactoryOptionsStyles);
};
