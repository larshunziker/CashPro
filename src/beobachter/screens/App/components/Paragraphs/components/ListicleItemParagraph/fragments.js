/**
 *
 */
import { gql } from '@apollo/client';

export const listicleItemParagraphFragment = gql`
  fragment ListicleItemParagraphFragment on ListicleItemParagraph {
    anchorId
    id
    title
    text
    footer
    image {
      id
      caption
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
    link {
      label
      path
    }
  }
`;
