/**
 *
 */

import { gql } from '@apollo/client';

export const videoRecommendationFragment = gql`
  fragment VideoRecommendation on Video {
    id
    preferredUri
    restrictionStatus
    title
    shortTitle
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
          label
          link
        }
      }
    }
    gcid
    publication
    brightcoveId
    jwPlayerId
    caption
    changeDate
    duration
    metaCanonicalUrl
    channel {
      id
      tid
      title
      channelType
      suppressAds
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
          }
        }
      }
    }
    credit
    id
    metaDescription
    metaKeywords
    metaTitle
    createDate
    publicationDate
    preferredUri
    shortTitle
    restrictionStatus
    editContentUri
    editRelationUri
    cloneContentUri
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
