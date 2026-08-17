import type { ComponentType } from 'react';
import { SubscribeButtonComponent } from '../../../SubscribeButton/typings';
// Remove after gql types
interface TemporaryAuthor extends Author {
  link?: Link;
}

export type TeaserAuthorFactoryProps = {
  author: TemporaryAuthor;
  isSmallColumn?: boolean;
  insideArticle?: boolean;
  withAuthorImage?: boolean;
  readMoreLabel?: string;
  styles?: TeaserAuthorFactoryOptionsStyles;
};

export type TeaserAuthorFactoryOptionsStyles = {
  Wrapper?: string;
  Name?: string;
  SmName?: string;
  ShortDescriptionWrapper?: string;
  ShortDescription?: string;
  InsideArticleName?: string;
  OutsideArticleName?: string;
  AuthorAvatar?: string;
  Initials?: string;
  Headline?: string;
  SmHeadline?: string;
  Grid?: string;
  Box?: string;
  Link?: string;
  SubscribeButtonWrapper?: string;
};

export type TeaserAuthorFactoryOptionsStylesByProps<T> = (
  props: T,
) => TeaserAuthorFactoryOptionsStyles;

export type TeaserAuthorFactoryOptions<T = {}> = {
  SubscribeButton?: SubscribeButtonComponent;
  styles:
    | TeaserAuthorFactoryOptionsStyles
    | TeaserAuthorFactoryOptionsStylesByProps<T>;
};

export type TeaserAuthorComponent = ComponentType<TeaserAuthorFactoryProps>;
