import { gql } from '@apollo/client';

export const videoParagraphFragment = gql`
  fragment VideoParagraphFragment on VideoParagraph {
    anchorId
    id
    suppressSource
    title
    shortTitle
    brightcoveId
    caption
    credit
    duration
    image {
      id
      file(style: "large") {
        id
        alt
        relativeOriginPath
        focalPointX
        focalPointY
      }
      credit
    }
    video {
      id
      brightcoveId
      jwPlayerId
      publicationDate
      preferredUri
      changeDate
      caption
      shortTitle
      title
      credit
      duration
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
  }
`;
