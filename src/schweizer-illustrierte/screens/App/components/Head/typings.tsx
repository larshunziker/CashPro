import { ComponentType } from 'react';

export type HeadProps = {
  shortTitle: string;
  title: string;
  lead: string;
  noGrid?: boolean;
};

export type HeadComponent = ComponentType<HeadProps>;
