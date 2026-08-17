import { ReactElement } from 'react';
import { LinkComponent } from 'src/common/components/LinkLegacy/typings';
import { ScrollButtonComponent } from './components/scrollButton/typings';

export type BreadcrumbsItems = {
  timestamp?: number;
  edges?: {
    node?: Partial<ActiveMenuTrailItem>;
  }[];
};

export type BreadcrumbsProps = {
  items?: BreadcrumbsItems;
  pageUrl?: string;
  addClass?: string;
  origin?: string;
  staticData?: boolean;
  title?: string;
  ScrollButton?: ScrollButtonComponent;
  isInApp?: boolean;
};

export type GetBreadcrumbsFactoryStylesByProps<T> = (
  props: T,
) => BreadcrumbsFactoryOptionsStyles;

export type BreadcrumbsFactoryOptionsStyles = {
  OuterWrapper: string;
  Wrapper: string;
  List: string;
  Link: string;
  Title?: string;
  Placeholder?: string;
};

export type BreadcrumbsFactoryOptions<T> = {
  Link: LinkComponent;
  styles:
    | BreadcrumbsFactoryOptionsStyles
    | GetBreadcrumbsFactoryStylesByProps<T>;
  hasPlaceholder?: (props: BreadcrumbsProps) => boolean;
  isAuthorPage?: (origin: string) => boolean;
  ScrollButton?: ScrollButtonComponent;
  homeLabel?: string;
};

export type BreadcrumbsComponent = (props: BreadcrumbsProps) => ReactElement;
