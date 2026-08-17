import React, { Suspense, lazy } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/work/rasch-s */
import { ensureVideoItem } from '../../../../../shared/helpers/ensureVideo';
import ClientSideOnly from '../../../../../common/components/ClientSideOnly';
import SuspenseFallback from '../../../../../common/components/SuspenseFallback';
import HeroImage from './components/HeroImage';
import HeroVideo from './components/HeroVideo';
import { ANCHOR_HERO } from '../../../../../shared/constants/content';
import {
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
  VIDEO_PARAGRAPH,
} from '../../../../../shared/constants/paragraphs';
import { TRACKING_CLASS_ARTICLE_HERO } from '../../../../../shared/constants/tracking';
import { HeroProps } from './typings';

const HeroImageGallery = lazy(
  () =>
    import(
      /* webpackChunkName: "HeroImageGallery" */ './components/HeroImageGallery'
    ),
);

const Hero = ({ heroImageBody, children, article }: HeroProps) => {
  if (
    !heroImageBody ||
    !Array.isArray(heroImageBody) ||
    heroImageBody.length === 0
  ) {
    return null;
  }

  const heroParagraph = heroImageBody[0];
  const randomKey = Math.ceil(Math.random() * 1000);

  switch (heroParagraph.__typename) {
    case VIDEO_PARAGRAPH:
      const ensuredVideo = ensureVideoItem(heroParagraph);
      return (
        <HeroVideo
          key={`hero-video-${article?.id || randomKey}`}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Sponsor> | undefined' is not assignable to type 'Sponsor'. */
          sponsor={article?.sponsor}
          video={ensuredVideo.video}
        >
          {children}
        </HeroVideo>
      );
    case IMAGE_GALLERY_PARAGRAPH:
      return (
        <ClientSideOnly>
          <Suspense fallback={<SuspenseFallback />}>
            <HeroImageGallery
              key={`hero-image-gallery-${article?.id || randomKey}`}
              gallery={heroParagraph.gallery as Gallery}
            />
          </Suspense>
        </ClientSideOnly>
      );
    case IMAGE_PARAGRAPH:
    default:
      return (
        <HeroImage
          key={`hero-image-${article?.id || randomKey}`}
          /* @ts-ignore TODO: TS2322 ->  Type 'heroImageBody' is not assignable to type 'ImageParagraph'. */
          image={heroParagraph}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Sponsor> | undefined' is not assignable to type 'Sponsor | undefined'. */
          sponsor={article?.sponsor}
        >
          {children}
        </HeroImage>
      );
  }
};

const HeroWrapper = (props: HeroProps) => (
  <div id={ANCHOR_HERO} className={TRACKING_CLASS_ARTICLE_HERO}>
    <Hero {...props} />
  </div>
);

export default HeroWrapper;
