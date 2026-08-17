import { gql } from '@apollo/client';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { videoParagraphFragment } from 'Paragraphs/components/VideoParagraph/fragments';

export const heroImageGalleryFragment = gql`
  fragment HeroImageGalleryFragment on ImageGalleryParagraph {
    id
    gallery {
      id
      title
      body {
        ...ImageParagraphFragment
        ...VideoParagraphFragment
      }
    }
  }
  ${imageParagraphFragment}
  ${videoParagraphFragment}
`;
