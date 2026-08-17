import { ReactNode } from 'react';

export type CardProps = {
  title: string;
  children: ReactNode;
  urlLabel: string;
  url: string;
  addClass?: string;
};
