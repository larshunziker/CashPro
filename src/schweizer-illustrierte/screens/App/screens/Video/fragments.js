/**
 * @file   video graphql fragments
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-02-01 09:06:54
 *
 */

import { gql } from '@apollo/client';

export const videoRecommendationFragment = gql`
  fragment VideoRecommendation on Video {
    id
    preferredUri
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
    editContentUri
    editRelationUri
    cloneContentUri
    metaCanonicalUrl
    activeMenuTrail {
      edges {
        node {
          id
          label
          link
        }
      }
    }
    brightcoveId
    caption
    changeDate
    createDate
    duration
    channel {
      id
      tid
      channelType
      landingPage {
        id
        preferredUri
      }
      title
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
    gcid
    nid
    credit
    id
    metaDescription
    metaKeywords
    metaTitle
    publicationDate
    preferredUri
    shortTitle
    relatedTopics {
      edges {
        node {
          ... on Topic {
            id
            title
            preferredUri
          }
        }
      }
    }
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
