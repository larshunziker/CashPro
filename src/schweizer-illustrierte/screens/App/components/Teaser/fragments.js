//

import { gql } from '@apollo/client';

export const imageGalleryTeaserFragment = gql`
  fragment ImageGalleryTeaserFragment on ImageGallery {
    id
    title
    shortTitle
    badgeLabel
    badgeColor
    preferredUri
    openInFullscreen
    teaserImage {
      id
      image {
        id
        file(style: "large") {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    body(limit: 1) {
      ... on ImageParagraph {
        id
        suppressSource
      }
    }
    useAutoHyphens
  }
`;
