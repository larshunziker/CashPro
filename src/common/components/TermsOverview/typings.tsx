import { ReactElement } from 'react';

export type TermsOverviewProps = {
  activeLetter: string;
  enableOverlay?: boolean;
  lettersUrl: string;
  showDivider?: boolean;
  title: string;
  breadcrumbItems?: Pick<ActiveMenuTrailItemConnection, 'edges'>;
};

export type TermsOverviewFactoryOptionsStyles = {
  BreadcrumbsSection?: string;
  Container: string;
  Divider?: string;
  DividerInnerWrapper?: string;
  DividerWrapper?: string;
  Title: string;
  TitleInnerWrapper?: string;
  TitleWrapper: string;
  Wrapper?: string;
};

export type TermsOverviewFactoryOptions = {
  AlphabeticNavigation: (props: TermsOverviewProps) => ReactElement;
  Breadcrumbs?: ReactElement | ((props: TermsOverviewProps) => ReactElement);
  styles:
    | TermsOverviewFactoryOptionsStyles
    | ((props: TermsOverviewProps) => TermsOverviewFactoryOptionsStyles);
};
