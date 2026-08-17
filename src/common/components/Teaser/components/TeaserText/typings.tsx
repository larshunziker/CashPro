import type { ComponentType, ReactElement } from 'react';
import { LinkComponent } from '../../../Link/typings';

export type TeaserTextFactoryProps = {
  title: string;
  shortTitle: string;
  shortTitleElement?: ReactElement | null;
  preferredUri?: string;
  lead?: string;
  theme?: string;
};

export type TeaserTextFactoryOptionsStyles = {
  Wrapper: string;
  Title: string;
  LinkWrapper?: string;
  ShortTitle: string;
  Lead: string;
};

export type TeaserTextFactoryOptionsStylesByProps<T> = (
  props: T,
) => TeaserTextFactoryOptionsStyles;

export type TeaserTextFactoryOptions<T = {}> = {
  Link: LinkComponent;
  styles:
    | TeaserTextFactoryOptionsStyles
    | TeaserTextFactoryOptionsStylesByProps<T>;
};

export type TeaserTextComponent = ComponentType<TeaserTextFactoryProps>;
