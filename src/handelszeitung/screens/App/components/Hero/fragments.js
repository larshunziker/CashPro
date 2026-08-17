//

import { gql } from '@apollo/client';
import { heroImageFragment } from './components/HeroImage/fragments';
import { heroImageGalleryFragment } from './components/HeroImageGallery/fragments';
import { videoParagraphFragment } from 'Paragraphs/components/VideoParagraph/fragments';

export const heroFragment = gql`
  fragment HeroFragment on ParagraphInterface {
    ...HeroImageFragment
    ...HeroImageGalleryFragment
    ...VideoParagraphFragment
  }

  ${heroImageFragment}
  ${heroImageGalleryFragment}
  ${videoParagraphFragment}
`;
