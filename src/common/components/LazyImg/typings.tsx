import { ReactNode } from 'react';

export type LazyImgProps = {
  alt: string;
  src: string;
  thumbnailSrc?: string;
  placeholderSrc: string;
  title?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
  className?: string;
  isIntersecting?: boolean;
  rootMargin?: string;
  threshold?: number;
  dataTestId?: string;
  isLoaded?: boolean;
};
