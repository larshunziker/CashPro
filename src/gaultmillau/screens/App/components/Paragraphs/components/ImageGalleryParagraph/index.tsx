import React, { Suspense, lazy } from 'react';
import imageGalleryParagraphFactory from '../../../../../../../common/components/Paragraphs/components/ImageGalleryParagraph/factory';
import SuspenseFallback from '../../../../../../../common/components/SuspenseFallback';
// eslint-disable-next-line
import styles from '../../../ImageGallery/styles.legacy.css';

const ImageGalleryFinal = lazy(
  () => import(/* webpackChunkName: "ImageGallery" */ '../../../ImageGallery'),
);

const ImageGalleryParagraph = imageGalleryParagraphFactory({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  ImageGallery: (props) => (
    <Suspense fallback={<SuspenseFallback />}>
      <ImageGalleryFinal {...props} styles={styles} />
    </Suspense>
  ),
});

export default ImageGalleryParagraph;
