import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import DefaultImageGallery from './components/Default';
import StageImageGallery from './components/Stage';
import {
  IMAGE_GALLERY_LAYOUT_DEFAULT,
  IMAGE_GALLERY_LAYOUT_STAGE,
} from './constants';
import { ImageGalleryProps } from './typings';

export type ImageGalleryPropsInner = ImageGalleryProps;

const Switch = createComponentSwitch({
  [IMAGE_GALLERY_LAYOUT_DEFAULT]: DefaultImageGallery,
  [IMAGE_GALLERY_LAYOUT_STAGE]: StageImageGallery,
});

const ImageGallery = (props: ImageGalleryPropsInner): ReactElement => {
  const newProps = {
    ...props,
    gallery: props?.gallery?.gallery || {},
  };

  return <Switch {...newProps} />;
};

export default ImageGallery;
