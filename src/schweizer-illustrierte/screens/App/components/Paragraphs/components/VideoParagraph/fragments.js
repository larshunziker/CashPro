import { gql } from '@apollo/client';

export const videoParagraphFragment = gql`
  fragment VideoParagraphFragment on VideoParagraph {
    anchorId
    id
    brightcoveId
    suppressSource
    caption
    alt
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
    video {
      id
      brightcoveId
      preferredUri
      caption
      shortTitle
      title
      credit
      duration
      restrictionStatus
      keywords(limit: 20) {
        edges {
          node {
            preferredUri
            label
            tid
            id
          }
        }
      }
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
