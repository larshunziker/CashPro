import { ReactNode } from 'react';

export type SortableHeadersProps = {
  column: string;
  children: ReactNode;
  isDirtySortTableRef: React.MutableRefObject<boolean>;
  location: Partial<RaschRouterLocation>;
  hasCustomOrder: boolean;
  hasCustomGroup: boolean;
  group: string;
};
