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
      filter: [Article, ExplainingArticle, NativeAdvertising, Video, Product]
      additionalPublications: [GM, HZ, BEO]
    ) {
      count
      edges {
        node {
          ... on Article {
            id
            title
            shortTitle
            lead
            changeDate
            publicationDate
            revisionDate
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            subtypeValue: articleType
            hasVideo
            restrictionStatus
            channel {
              id
              title
            }
            authors(first: 10) {
              edges {
                node {
                  id
                  name
                  headline
                  imageParagraph {
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
                }
              }
            }
            teaserImage {
              id
              format
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
            badgeLabel
            badgeColor
          }
          ... on ExplainingArticle {
            id
            title
            shortTitle
            preferredUri(additionalPublications: [GM, HZ, BEO])
            changeDate: changedDate
            publicationDate
            restrictionStatus            
            hasVideo
            channel {
              id
              title
            }
            authors(first: 10) {
              edges {
                node {
                  id
                  name
                  imageParagraph {
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
                }
              }
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
            useAutoHyphens
          }
          ... on NativeAdvertising {
            id
            title
            shortTitle
            hasVideo
            trackingTeaserImpression
            trackingTeaserClick
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            restrictionStatus
            lead
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
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            link {
              path
              label
            }
            authors(first: 10) {
              edges {
                node {
                  id
                  name
                  imageParagraph {
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
                }
              }
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
          ... on Video {
            id
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            shortTitle
            title
            brightcoveId
            publicationDate
            restrictionStatus
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
                  relativeOriginPath
                  focalPointX
                  focalPointY
                }
              }
            }
            useAutoHyphens
          }
          ... on Product {
            id
            gcid
            number
            title
            shortTitle
            price
            pricePrefix
            description
            showUpdated
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
