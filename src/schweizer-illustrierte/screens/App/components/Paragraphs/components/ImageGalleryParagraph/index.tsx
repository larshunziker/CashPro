import React, { Suspense, lazy } from 'react';
import imageGalleryParagraphFactory from '../../../../../../../common/components/Paragraphs/components/ImageGalleryParagraph/factory';
import ClientSideOnly from '../../../../../../../common/components/ClientSideOnly';
import SuspenseFallback from '../../../../../../../common/components/SuspenseFallback';
import { LANDING_PAGE_TYPE } from '../../../../screens/LandingPage/constants';
import {
  IMAGE_GALLERY_LAYOUT_DEFAULT,
  IMAGE_GALLERY_LAYOUT_STAGE,
} from '../../../ImageGallery/constants';
import { GetComponentSwitchValueByProps } from '../../../../../../../common/components/Paragraphs/components/ImageGalleryParagraph/typings';

const ImageGalleryFinal = lazy(
  () => import(/* webpackChunkName: "ImageGallery" */ '../../../ImageGallery'),
);

const getComponentSwitchValueByProps: GetComponentSwitchValueByProps = ({
  origin,
}) => {
  return origin === LANDING_PAGE_TYPE
    ? IMAGE_GALLERY_LAYOUT_STAGE
    : IMAGE_GALLERY_LAYOUT_DEFAULT;
};

const ImageGalleryParagraph = imageGalleryParagraphFactory({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  ImageGallery: (props) => (
    <ClientSideOnly>
      <Suspense fallback={<SuspenseFallback />}>
        <ImageGalleryFinal {...props} />
      </Suspense>
    </ClientSideOnly>
  ),
  getComponentSwitchValueByProps,
});

export default ImageGalleryParagraph;
