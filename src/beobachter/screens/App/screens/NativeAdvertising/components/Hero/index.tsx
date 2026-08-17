import React, { Suspense, lazy } from 'react';
import ClientSideOnly from '../../../../../../../common/components/ClientSideOnly';
import SuspenseFallback from '../../../../../../../common/components/SuspenseFallback';
import HeroImage from './components/HeroImage';
import {
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { HeroProps } from './typings';

const ImageGalleryHero = lazy(
  () =>
    import(
      /* webpackChunkName: "ImageGalleryHero" */
      '../../../Article/components/ArticleHero/components/ImageGalleryHero'
    ),
);

type HeroPropsInner = HeroProps;

const Hero = ({ heroImageBody, node }: HeroPropsInner) => {
  const randomKey = 1;
  if (
    !heroImageBody ||
    !Array.isArray(heroImageBody) ||
    heroImageBody.length === 0
  ) {
    if (node?.teaserImage) {
      return <HeroImage key={node?.id || randomKey} node={node} />;
    }
    return null;
  }

  const imageGallery = heroImageBody[0];

  switch (imageGallery.__typename) {
    case IMAGE_GALLERY_PARAGRAPH:
      return (
        <ClientSideOnly>
          <Suspense fallback={<SuspenseFallback />}>
            <ImageGalleryHero
              key={(node && node.id) || randomKey}
              gallery={imageGallery.gallery as Gallery}
            />
          </Suspense>
        </ClientSideOnly>
      );

    case IMAGE_PARAGRAPH:
    default:
      return <HeroImage key={(node && node.id) || randomKey} node={node} />;
  }
};

export default Hero;
