import { ReactNode } from 'react';

export type ImgProps = {
  id?: string;
  alt?: string;
  url: string;
  title?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
  addClass?: string;
  cropped?: boolean;
  role?: string;
  allowUpscaling?: boolean;
};
