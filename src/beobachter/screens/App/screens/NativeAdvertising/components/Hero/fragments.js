import { gql } from '@apollo/client';
import { imageGalleryHeroFragment } from 'Article/components/ArticleHero/components/ImageGalleryHero/fragments';
import { heroImageFragment } from 'NativeAdvertising/components/Hero/components/HeroImage/fragments';

export const heroFragment = gql`
  fragment HeroFragment on ParagraphInterface {
    ...HeroImageFragment
    ...ImageGalleryHeroFragment
  }

  ${heroImageFragment}
  ${imageGalleryHeroFragment}
`;
