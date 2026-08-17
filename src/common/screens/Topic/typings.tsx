import { ComponentType } from 'react';
import { ScrollButtonComponent } from '../../components/Breadcrumbs/components/scrollButton/typings';
import { BreadcrumbsComponent } from '../../components/Breadcrumbs/typings';

export type TopicFactoryOptions = {
  Pager: ComponentType<{
    itemsCount: number;
    itemsPerPage: number;
    currentPage: number;
    component: string;
  }>;
  TeaserGrid: any;
  gridConfig: string;
  ensureTeaserInterface: (node: TeaserInterface) => TeaserInterface;
  Breadcrumbs: BreadcrumbsComponent | ScrollButtonComponent;
  pagerType: string;
  styles: TopicFactoryStyles;
};

export type TopicFactoryStyles = {
  readonly SubscribeButtonWrapperDefault: string;
  readonly SubscribeButtonWrapperPerson: string;
  readonly SubscribeButtonWrapperKeyword: string;
  readonly HeaderImageWrapper: string;
  readonly HeaderImageWrapperInner: string;
  readonly HeaderImageKeyword: string;
  readonly HeaderImagePerson: string;
  readonly HeaderWrapperKeyword: string;
  readonly HeaderWrapperDefault: string;
  readonly HeaderWrapperPerson: string;
  readonly HeaderPerson: string;
  readonly HeaderKeyword: string;
  readonly HeaderDefault: string;
  readonly WrapperKeyword: string;
  readonly WrapperPerson: string;
  readonly WrapperDefault: string;
  readonly LeadKeyword: string;
  readonly LeadDefault: string;
  readonly LeadPerson: string;
};

export type TopicProps = Pick<RouterProps, 'page'> &
  TopicFactoryOptions & {
    topic: Topic;
  };

export type TopicComponent = ComponentType<TopicProps>;

export type TopicContentProps = Pick<RouterProps, 'page'> & {
  topic: Topic;
} & Pick<
    TopicFactoryOptions,
    | 'TeaserGrid'
    | 'gridConfig'
    | 'ensureTeaserInterface'
    | 'Pager'
    | 'pagerType'
  >;
