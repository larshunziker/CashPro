import { ComponentType, ReactElement, ReactNode } from 'react';

export type MetaTag = {
  name?: string;
  property?: string;
  title?: string;
  'http-equiv'?: string;
  content: string;
  rel?: string;
  href?: string;
  hreflang?: string;
};

export type RasHelmetProps = {
  meta?: MetaTag[];
  title?: string | ReactElement;
  socialMetaValues?: Record<string, any>;
  link?: Record<string, any>[];
  script?: Maybe<Record<string, any>[]>;
  node?: any;
  htmlAttributes?: Maybe<Record<string, any>>;
  titleTemplate?: string;
  children?: ReactNode;
};

export type RasHelmetFactoryOptions = {
  locationStateSelector: LocationStateSelector;
  socialMetaTags: MetaTag[];
  additionalMetaData: MetaTag[];
};

export type MetaIcons = {
  rel?: string;
  href?: string;
  name?: string;
  title?: string;
  sizes?: string;
  type?: string;
  media?: string;
  content?: string;
};

export type HelmetComponent = ComponentType<RasHelmetProps>;
