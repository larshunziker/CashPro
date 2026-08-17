import { WithRaschRouter } from '../../../shared/@types/gql';
import { ExpansionPanelComponent } from '../../components/ExpansionPanel/typings';
import { TeaserComponent } from '../../components/Teaser/typings';
import { StatusPageProps } from '../StatusPage/typings';
import { AuthorDetailsProps } from './components/AuthorDetails/typings';

export type AuthorPageProps = Pick<WithRaschRouter, 'page'> & {
  author: Author;
  contentByAuthor: any;
  loading?: boolean;
};

export type AuthorFactoryOptionsStyles = {
  HeaderWrapper: string;
  Description: string;
  ResultsWrapper: string;
  AuthorPage?: string;
  BreadcrumbsWrapper?: string;
  PagerWrapper?: string;
  PageHeading?: string;
  InnerWrapper?: string;
  JournalisticAgbWrapper?: string;
};

type AdditionalBreadcrumbProps = (props: AuthorDetailsProps) => string;

type TranslationsProps = (props: AuthorDetailsProps) => string;

export type PluralizationProps = {
  singular: string;
  plural: string;
};

type TranslationsPluralizationProps = (
  props: AuthorDetailsProps,
) => PluralizationProps;

export type AuthorFactoryOptions = {
  PAGE_SIZE: number;
  ensureTeaserInterface: Function;
  Teaser: TeaserComponent;
  teaserType?: string;
  StatusPage: React.ComponentType<StatusPageProps>;
  Breadcrumbs: (props: any) => JSX.Element;
  ROUTE_AUTHORS: AdditionalBreadcrumbProps | string;
  Pager: (props: any) => React.CElement<any, React.Component>;
  pagerType: string;
  AuthorDetails: (props: AuthorDetailsProps) => JSX.Element;
  ExpansionPanel: ExpansionPanelComponent;
  overviewPageTitle?: TranslationsProps | string;
  additionalBreadcrumbText?: AdditionalBreadcrumbProps | string;
  styles: AuthorFactoryOptionsStyles;
  latestNewsTitle?: TranslationsProps | string;
  inJournalismSinceTitle?: TranslationsProps | string;
  atPublisherSinceTitle?: TranslationsProps | string;
  descriptionTitle?: TranslationsProps | string;
  associationsTitle?: TranslationsProps | string;
  awardsTitle?: TranslationsProps | string;
  bookLinksTitle?: TranslationsProps | string;
  podcastLinksTitle?: TranslationsProps | string;
  newsletterLinksTitle?: TranslationsProps | string;
  yearsLabel?: PluralizationProps | TranslationsPluralizationProps;
  journalisticAgb?: {
    path: string;
    label: string;
  };
};
