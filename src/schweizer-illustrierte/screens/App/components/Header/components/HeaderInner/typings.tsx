import { ComponentType } from 'react';

export type HeaderInnerProps = {
  isCollapsed?: boolean;
  isVisible?: boolean;
  isSticky?: boolean;
  hasStickiness?: boolean;
  isMarketingPage?: boolean;
  isPuzzlePage?: boolean;
  isMarketingPageReducedHeader?: boolean;
  params?: Record<string, any>;
  subtypeValue: string;
};

export type HeaderInnerComponent = ComponentType<HeaderInnerProps>;
