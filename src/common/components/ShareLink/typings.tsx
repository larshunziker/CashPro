import React, { ReactNode } from 'react';

export type ShareLinkProps = {
  iconType: string;
  url: string;
  addClass?: string;
  iconAddClass?: string;
  targetType?: string;
  ariaLabel?: string;
  children?: ReactNode;
};

export type ShareLinkFactoryOptionsStyles = {
  SharePanelItem: string;
};

export type GetShareLinkFactoryOptionsStylesByProps<T> = (
  props: T,
) => ShareLinkFactoryOptionsStyles;

export type ShareLinkFactoryOptions<T> = {
  generateIconByProps: Function;
  getTargetTypeByProps?: (props: ShareLinkProps) => '_self' | '_blank';
  Link: React.ComponentType<any>;
  styles:
    | ShareLinkFactoryOptionsStyles
    | GetShareLinkFactoryOptionsStylesByProps<T>;
};
