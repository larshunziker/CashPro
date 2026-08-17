/**
 *
 */

import { gql } from '@apollo/client';

export const videoRecommendationFragment = gql`
  fragment VideoRecommendation on Video {
    id
    preferredUri
    title
    shortTitle
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

export const videoFragment = gql`
  fragment VideoFragment on Video {
    activeMenuTrail {
      edges {
        node {
          id
          label
          link
        }
      }
    }
    metaCanonicalUrl
    publication
    brightcoveId
    jwPlayerId
    caption
    changeDate
    duration
    channel {
      id
      tid
      title
      suppressAds
      channelType
      landingPage {
        id
        preferredUri
      }
      settings {
        title
        lead
        mainChannel {
          id
          title
        }
        hierarchy {
          count
          edges {
            node {
              id
              title
              tid
            }
          }
        }
        headerImage {
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
    credit
    id
    gcid
    nid
    metaDescription
    metaKeywords
    metaTitle
    createDate
    publicationDate
    preferredUri
    shortTitle
    restrictionStatus
    keywords(limit: 100) {
      edges {
        node {
          preferredUri
          label
          tid
          id
        }
      }
    }
    teaserImage {
      id
      image {
        id
        file(style: "16x9_560") {
          id
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    title
  }
`;
