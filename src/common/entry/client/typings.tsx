import { ComponentType } from 'react';

export type ClientFactoryOptions = {
  RaschProviders?: ComponentType;
  AutoUpdateProvider?: ComponentType;
  AppRoutes: ComponentType;
  configureClientStore: Function;
  mountNode: HTMLElement | null;
  preRender?: Function;
  generateApolloCache: Function;
  datadog?: boolean;
};
