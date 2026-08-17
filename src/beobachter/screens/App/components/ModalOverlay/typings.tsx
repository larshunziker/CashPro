import { ReactNode } from 'react';

export type ModalOverlayProps = {
  addClass?: string;
  children?: ReactNode;
  component: string;
  state?: boolean;
  isVisible?: boolean;
  isLeftToRight?: boolean;
};
