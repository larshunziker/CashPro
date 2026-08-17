import { ComponentType } from 'react';
import { AspectRatioItem } from '../../../../../shared/helpers/@types/resizeByAspectRatio';
import { ImageCaptionsComponent } from '../../../ImageCaption/typings';

export type SlideLabelProps = {
  activeIndex: number;
  labels: Record<string, any>;
  slideDimensions: Array<AspectRatioItem>;
};

export type SlideLabelFactoryOptions = {
  ImageCaption: ImageCaptionsComponent;
  styles: {
    Wrapper: string;
    Centered?: string;
  };
};

export type SlideLabelComponent = ComponentType<SlideLabelProps>;
