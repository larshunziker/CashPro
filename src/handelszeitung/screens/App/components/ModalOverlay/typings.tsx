import { ReactNode } from 'react';

export type ModalOverlayProps = {
  children?: ReactNode;
  component: string;
  isVisible: boolean;
};
