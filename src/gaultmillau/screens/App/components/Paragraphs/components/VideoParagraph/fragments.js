import { gql } from '@apollo/client';

export const videoParagraphFragment = gql`
  fragment VideoParagraphFragment on VideoParagraph {
    id
    title
    brightcoveId
    suppressSource
    duration
    updatedAt
    createdAt
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
