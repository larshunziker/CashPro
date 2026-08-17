import { gql } from '@apollo/client';

export const imageParagraphFragment = gql`
  fragment ImageParagraphFragment on ImageParagraph {
    id
    anchorId
    title
    caption
    suppressSource
    format
    alt
    link {
      label
      path
      routed
    }
    fullWidth
    image {
      id
      showOriginal
      credit
      file(style: "inline_image_1200", calculateDimensions: true) {
        id
        relativeOriginPath
        focalPointX
        focalPointY
        alt
        width
        height
        origin
      }
    }
  }
`;
