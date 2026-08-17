import React, { ReactNode } from 'react';

export type ButtonProps = {
  iconTypeLeft?: string;
  iconTypeRight?: string;
  type?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  addClass?: string;
  children?: ReactNode;
};

export type ButtonFactoryOptionsStyles = {
  Button: string;
  IconLeft?: string;
  IconRight?: string;
};

export type ButtonFactoryOptions = {
  Icon?: React.ComponentType<any>;
  styles:
    | ButtonFactoryOptionsStyles
    | ((props: any) => ButtonFactoryOptionsStyles);
};
