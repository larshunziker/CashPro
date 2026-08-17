import React, { Suspense, lazy } from 'react';
import imageGalleryParagraphFactory from '../../../../../../../common/components/Paragraphs/components/ImageGalleryParagraph/factory';
import ClientSideOnly from '../../../../../../../common/components/ClientSideOnly';
import SuspenseFallback from '../../../../../../../common/components/SuspenseFallback';

const ImageGalleryFinal = lazy(
  () => import(/* webpackChunkName: "ImageGallery" */ '../../../ImageGallery'),
);

const ImageGalleryParagraph = imageGalleryParagraphFactory({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  ImageGallery: (props) => (
    <ClientSideOnly>
      <Suspense fallback={<SuspenseFallback />}>
        <ImageGalleryFinal {...props} />
      </Suspense>
    </ClientSideOnly>
  ),
});

export default ImageGalleryParagraph;
