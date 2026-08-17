import { gql } from '@apollo/client';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';

export const imageGalleryParagraphFragment = gql`
  fragment ImageGalleryParagraphFragment on ImageGalleryParagraph {
    id
    anchorId
    hasTitleOverride
    title
    gallery {
      id
      title
      shortTitle
      preferredUri
      items: body {
        ...ImageParagraphFragment
      }
    }
  }
  ${imageParagraphFragment}
`;
