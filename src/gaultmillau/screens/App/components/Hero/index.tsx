import React, { Suspense, lazy } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/work/rasch-s */
import { ensureVideoItem } from '../../../../../shared/helpers/ensureVideo';
import SuspenseFallback from '../../../../../common/components/SuspenseFallback';
import HeroImage from '../Hero/components/HeroImage';
import HeroVideo from '../Hero/components/HeroVideo';
import HeroVideoLoop from '../Hero/components/HeroVideoLoop';
import { ANCHOR_HERO } from '../../../../../shared/constants/content';
import {
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
  VIDEO_LOOP_PARAGRAPH,
  VIDEO_PARAGRAPH,
} from '../../../../../shared/constants/paragraphs';
import { TRACKING_CLASS_ARTICLE_HERO } from '../../../../../shared/constants/tracking';
import type { HeroProps } from './typings';

const HeroImageGallery = lazy(
  () =>
    import(
      /* webpackChunkName: "HeroImageGallery" */ '../Hero/components/HeroImageGallery'
    ),
);

type HeroPropsInner = HeroProps;

const Hero = ({ heroImageBody, children, article }: HeroPropsInner) => {
  if (
    !heroImageBody ||
    !Array.isArray(heroImageBody) ||
    heroImageBody.length === 0
  ) {
    return null;
  }

  const imageGallery = heroImageBody[0] as ImageGalleryParagraph;

  let jsx = null;

  switch (heroImageBody[0].__typename) {
    case VIDEO_PARAGRAPH:
      const ensuredVideo = ensureVideoItem(heroImageBody[0])
        .video as VideoParagraph;
      jsx = (
        <HeroVideo
          key={article?.id || heroImageBody?.[0]?.id}
          video={ensuredVideo}
        >
          {children}
        </HeroVideo>
      );
      break;
    case IMAGE_GALLERY_PARAGRAPH:
      jsx = (
        <Suspense fallback={<SuspenseFallback />}>
          <HeroImageGallery
            key={article?.id || Date.now()}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ImageGallery> | undefined' is not assignable to type 'ImageGallery'. */
            gallery={imageGallery.gallery}
          >
            {children}
          </HeroImageGallery>
        </Suspense>
      );
      break;
    case VIDEO_LOOP_PARAGRAPH:
      jsx = (
        <HeroVideoLoop
          key={article?.id || Date.now()}
          videoLoop={heroImageBody[0]}
          article={article}
        >
          {children}
        </HeroVideoLoop>
      );
      break;
    case IMAGE_PARAGRAPH:
    default:
      jsx = (
        <HeroImage image={heroImageBody[0] as ImageParagraph} article={article}>
          {children}
        </HeroImage>
      );
  }
  return (
    <div id={ANCHOR_HERO} className={TRACKING_CLASS_ARTICLE_HERO}>
      {jsx}
    </div>
  );
};

export default Hero;
