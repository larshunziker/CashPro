import { ComponentType } from 'react';

export type HeaderInnerProps = {
  isCollapsed?: boolean;
  hasStickiness?: boolean;
  params?: Record<string, any>;
};

export type HeaderInnerComponent = ComponentType<HeaderInnerProps>;
