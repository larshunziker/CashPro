import { gql } from '@apollo/client';

export const heroImageGalleryFragment = gql`
  fragment HeroImageGalleryFragment on ImageGalleryParagraph {
    anchorId
    gallery {
      items: body {
        ... on ImageParagraph {
          id
          title
          caption
          suppressSource
          image {
            id
            credit
            file(style: "3x2_770") {
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
