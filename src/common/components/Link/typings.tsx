import { CSSProperties, ComponentType, ReactNode } from 'react';

export type LinkProps = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  onClick?: (event) => void;
  className?: string;
  target?: string;
  children?: ReactNode;
  trackingData?: Array<any>;
  rel?: string;
  style?: CSSProperties;
  to?: string;
  title?: string;
  label?: string;
  description?: string;
  path?: string;
  routed?: boolean;
  expanded?: boolean;
  ariaLabel?: string;
  nofollow?: boolean;
};

export type LinkComponent = ComponentType<LinkProps>;
