import { ReactNode } from 'react';

export type SmoothScrollProps = {
  anchorId: string;
  offset: number;
  behavior?: string;
  children?: ReactNode;
};
