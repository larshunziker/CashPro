/**
 *
 */

import { gql } from '@apollo/client';

export const teaserStageParagraphFragment = gql`
  fragment TeaserStageParagraphFragment on TeaserStageParagraph {
    anchorId
    id
    style
    termReference {
      ... on Channel {
        id
        title
        landingPage {
          id
          preferredUri
        }
      }
      ... on Keyword {
        id
        label
        preferredUri
      }
    }
    title
    entities(
      filter: [Article, ExplainingArticle, NativeAdvertising, Video]
      additionalPublications: [GM, HZ, BEO]
    ) {
      count
      edges {
        node {
          ... on Article {
            id
            title
            lead
            changeDate
            publicationDate
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            subtypeValue: articleType
            hasVideo
            restrictionStatus
            channel {
              id
              title
            }
            teaserImage {
              id
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
            authors {
              edges {
                node {
                  id
                  name
                }
              }
            }
            useAutoHyphens
          }
          ... on ExplainingArticle {
            id
            title
            publicationDate
            preferredUri(additionalPublications: [GM, HZ, BEO])
            changeDate: changedDate
            hasVideo
            channel {
              id
              title
            }
            teaserImage {
              id
              title
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
            authors {
              edges {
                node {
                  id
                  name
                }
              }
            }
            useAutoHyphens
          }
          ... on NativeAdvertising {
            id
            title
            shortTitle
            lead
            hasVideo
            publicationDate
            trackingTeaserImpression
            trackingTeaserClick
            subtypeValue: advertisingTypeValue
            restrictionStatus
            channel {
              id
              title
              settings {
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
              }
            }
            link {
              path
              label
            }
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            teaserImage {
              id
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
            useAutoHyphens
          }
          ... on Video {
            id
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            title
            brightcoveId
            publicationDate
            changeDate
            caption
            credit
            lead
            channel {
              id
              title
            }
            teaserImage {
              id
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
            useAutoHyphens
          }
        }
      }
    }
  }
`;
