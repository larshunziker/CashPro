import { ReactNode } from 'react';

export type ArrowButtonProps = {
  children?: ReactNode;
  addClass?: string;
  theme?: string;
  origin?: string;
  extraSmall?: boolean;
  small?: boolean;
  large?: boolean;
  onClick?: () => void;
  disableHover?: boolean;
};
