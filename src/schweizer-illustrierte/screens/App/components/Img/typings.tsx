import { ReactNode } from 'react';

export type ImgProps = {
  id?: string;
  alt?: string;
  url: string;
  title?: string;
  width?: any;
  height?: any;
  children?: ReactNode;
  addClass?: string;
};
