/**
 *
 */

import { gql } from '@apollo/client';

export const videoParagraphFragment = gql`
  fragment VideoParagraphFragment on VideoParagraph {
    alt
    anchorId
    brightcoveId
    suppressSource
    caption
    credit
    createdAt
    duration
    id
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
    shortTitle
    title
    updatedAt
    video {
      id
      brightcoveId
      jwPlayerId
      preferredUri
      publicationDate
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
