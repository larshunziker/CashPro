import { gql } from '@apollo/client';

export const imageGalleryHeroFragment = gql`
  fragment ImageGalleryHeroFragment on ImageGalleryParagraph {
    id
    gallery {
      id
      title
      shortTitle
      preferredUri
      items: body {
        ... on ImageParagraph {
          anchorId
          id
          format
          caption
          suppressSource
          image {
            id
            credit
            file(style: "large") {
              id
              alt
              relativeOriginPath
              focalPointX
              focalPointY
            }
          }
        }
      }
    }
  }
`;
