import { ComponentType } from 'react';

export type ImageCaptionProps = {
  caption: string;
  credit?: string;
};

export type GetImageCaptionFactoryStylesByProps<T> = (
  props: T,
) => ImageCaptionFactoryOptionsStyles;

export type ImageCaptionFactoryOptions<T> = {
  prefix?: string;
  styles:
    | ImageCaptionFactoryOptionsStyles
    | GetImageCaptionFactoryStylesByProps<T>;
};

export type ImageCaptionFactoryOptionsStyles = {
  Wrapper: string;
  CreditWrapper?: string;
  Credit: string;
};

export type ImageCaptionsComponent = ComponentType<ImageCaptionProps>;
