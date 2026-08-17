import React, { ReactElement } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import DefaultImageParagraph from './components/DefaultImageParagraph';
import GalleryDetailImageParagraph from './components/GalleryDetailImageParagraph';
import { IMAGE_GALLERY_DETAIL_SCREEN } from '../../../../screens/ImageGalleryArticle/constants';
import { ImageParagraphProps } from './typings';

const ImageParagraph = (props: ImageParagraphProps): ReactElement => {
  if (!props.imageParagraph || !props.imageParagraph.image) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  switch (props.origin) {
    case IMAGE_GALLERY_DETAIL_SCREEN:
      return (
        <TestFragment data-testid="imageparagraph-gallery-detail-image-paragraph-wrapper">
          <GalleryDetailImageParagraph {...props} />
        </TestFragment>
      );

    default:
      return (
        <TestFragment data-testid="imageparagraph-default-image-paragraph-wrapper">
          <DefaultImageParagraph {...props} />
        </TestFragment>
      );
  }
};

export default ImageParagraph;
