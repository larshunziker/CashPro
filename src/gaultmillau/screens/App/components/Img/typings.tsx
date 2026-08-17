import { ReactNode } from 'react';

export type ImgProps = {
  url: string;
  addClass?: string;
  width?: number;
  height?: number;
  alt: string;
  cropped?: boolean;
  children?: ReactNode;
};
