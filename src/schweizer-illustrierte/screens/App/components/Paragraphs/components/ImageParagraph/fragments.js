import { gql } from '@apollo/client';

export const imageParagraphFragment = gql`
  fragment ImageParagraphFragment on ImageParagraph {
    anchorId
    id
    format
    caption
    suppressSource
    fullWidth
    title
    image {
      id
      credit
      showOriginal
      file(style: "large") {
        id
        alt
        relativeOriginPath
        focalPointX
        focalPointY
        origin
      }
    }
  }
`;
