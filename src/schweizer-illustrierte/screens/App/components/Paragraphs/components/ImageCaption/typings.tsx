import { ComponentType } from 'react';

export type ImageCaptionProps = {
  caption: string;
  credit: string;
  addClass?: string;
  origin?: string;
  suppressSource?: boolean;
};

export type ImageCaptionComponent = ComponentType<ImageCaptionProps>;
