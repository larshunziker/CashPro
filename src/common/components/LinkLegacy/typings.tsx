import { CSSProperties, ComponentType, ReactNode } from 'react';

type LinkType = Link & {
  linkRel?: string;
};

export type LinkProps = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  onClick?: (event) => void;
  className?: string;
  link?: MenuLink | LinkType;
  target?: string;
  nofollow?: boolean;
  trackingData?: Array<any>;
  rel?: string;
  style?: CSSProperties;
  to?: string;
  title?: string;
  children?: ReactNode;
  routed?: boolean;
};

export type LinkComponent = ComponentType<LinkProps>;
