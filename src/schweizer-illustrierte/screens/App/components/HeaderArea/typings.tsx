import { ComponentType } from 'react';

export type HeaderAreaProps = {
  isStickyEnabled?: boolean;
  isMarketingPageReducedHeader?: boolean;
  isPuzzlePage?: boolean;
};

export type HeaderAreaComponent = ComponentType<HeaderAreaProps>;
