import { gql } from '@apollo/client';

export const imageGalleryParagraphFragment = gql`
  fragment ImageGalleryParagraphFragment on ImageGalleryParagraph {
    id
    anchorId
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
          format
          image {
            id
            file(style: "large") {
              id
              alt
              relativeOriginPath
              focalPointX
              focalPointY
              width
              height
              origin
            }
          }
        }
      }
    }
  }
`;
