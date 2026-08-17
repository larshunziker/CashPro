import { gql } from '@apollo/client';

export const imageParagraphFragment = gql`
  fragment ImageParagraphFragment on ImageParagraph {
    id
    anchorId
    title
    caption
    suppressSource
    fullWidth
    image {
      id
      credit
      showOriginal
      file(style: "inline_image_1200", calculateDimensions: true) {
        id
        relativeOriginPath
        focalPointX
        focalPointY
        alt
        height
        width
        origin
      }
    }
  }
`;
