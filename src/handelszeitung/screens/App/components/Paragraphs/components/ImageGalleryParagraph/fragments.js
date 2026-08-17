//

import { gql } from '@apollo/client';

export const imageGalleryParagraphFragment = gql`
  fragment ImageGalleryParagraphFragment on ImageGalleryParagraph {
    anchorId
    hasTitleOverride
    title
    gallery {
      id
      title
      shortTitle
      preferredUri
      lead
      items: body {
        ... on ImageParagraph {
          id
          title
          caption
          suppressSource
          image {
            id
            credit
            showOriginal
            file(style: "inline_image_1200", calculateDimensions: true) {
              id
              alt
              relativeOriginPath
              focalPointX
              focalPointY
              height
              width
            }
          }
        }
      }
    }
  }
`;
