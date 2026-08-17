import { gql } from '@apollo/client';

export const videosOverviewTeaserFragment = gql`
  fragment VideosOverviewTeaserFragment on Video {
    id
    title
    preferredUri
    shortTitle
    changeDate
    metaDescription
    metaKeywords
    metaTitle
    metaCanonicalUrl
    caption
    publicationDate
    brightcoveId
    credit
    restrictionStatus
    teaserImage {
      id
      image {
        id
        file(style: "16x9_560") {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    useAutoHyphens
  }
`;
