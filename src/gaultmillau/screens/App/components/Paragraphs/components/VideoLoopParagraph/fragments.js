import { gql } from '@apollo/client';

export const videoLoopParagraphFragment = gql`
  fragment VideoLoopParagraphFragment on VideoLoopParagraph {
    anchorId
    id
    title
    caption
    image {
      id
      credit
      showOriginal
      file {
        id
        alt
        relativeOriginPath
        focalPointX
        focalPointY
      }
    }
    videoLoop {
      videoOgg {
        source
        mimeType
        filename
        size
        extension
      }
      videoMp4 {
        source
        mimeType
        filename
        size
        extension
      }
      videoWebM {
        source
        mimeType
        filename
        size
        extension
      }
    }
  }
`;
