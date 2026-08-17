//
import { gql } from '@apollo/client';

export const ministageVideoFragment = gql`
  fragment MinistageVideoFragment on MinistageVideo {
    link {
      path
    }
    name
    items(limit: 4) {
      edges {
        node {
          ...VideoItem
        }
      }
    }
  }

  fragment VideoItem on Video {
    id
    brightcoveId
    jwPlayerId
    publicationDate
    changeDate
    caption
    shortTitle
    title
    credit
    preferredUri
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
    useAutoHyphens
  }
`;
