/* istanbul ignore file */

import { gql } from '@apollo/client';

export const contentBoxFragment = gql`
  fragment ContentBoxFragment on ContentBox {
    id
    title
    hideTitle
    contentSourceValue
    linkLabel
    body {
      ... on TabParagraph {
        id
        title
        style
        sortBy
        linkLabel
        mode
        termReference {
          ... on Channel {
            id
            tid
            title
            link
          }
        }
        items {
          edges {
            node {
              ... on Article {
                id
                title
                publicationDate
                preferredUri
                useAutoHyphens
              }
            }
          }
        }
      }
    }
    termReference {
      ... on Channel {
        id
        tid
        title
        link
      }
    }
    useNativeAdvertising
    items {
      edges {
        node {
          id
          ... on LandingPage {
            id
            nid
            title
            preferredUri
            useAutoHyphens
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
          }
          ... on Page {
            id
            nid
            title
            preferredUri
            useAutoHyphens
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
          }
          ... on NativeAdvertising {
            id
            title
            lead
            hasVideo
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            shortTitle
            changeDate
            publicationDate
            showUpdated
            restrictionStatus
            preferredUri
            useAutoHyphens
            link {
              path
              label
            }
            authors(limit: 2) {
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
                file(style: "large", calculateDimensions: true) {
                  id
                  alt
                  width
                  height
                  relativeOriginPath
                  focalPointX
                  focalPointY
                }
              }
            }
          }
          ... on Article {
            title
            lead
            hasVideo
            subtypeValue: articleType
            shortTitle
            changeDate
            publicationDate
            showUpdated
            restrictionStatus
            preferredUri
            authorPrefix
            useAutoHyphens
            channel {
              id
              title
            }
            authors(limit: 2) {
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
                file(style: "large", calculateDimensions: true) {
                  id
                  alt
                  width
                  height
                  relativeOriginPath
                  focalPointX
                  focalPointY
                }
              }
            }
          }
          ... on Video {
            id
            preferredUri
            shortTitle
            title
            lead
            brightcoveId
            publicationDate
            changeDate
            caption
            credit
            showUpdated
            useAutoHyphens
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
          }
          ... on Widget {
            id
            link: url {
              label
              path
            }
            timePeriodValues
            valors {
              items {
                id
                shortName
                valorName
                valorNumber
                valorStockExchange {
                  id
                  originalId
                  __typename
                }
                valorCurrency {
                  id
                  originalId
                  __typename
                }
                __typename
              }
              __typename
            }
            sponsor {
              id
              title
              key
              preferredUri
              teaserImage {
                id
                image {
                  id
                  file {
                    id
                    relativeOriginPath
                    alt
                  }
                }
              }
            }
          }
          ... on Teaser {
            id
            trackingEnabled
            trackingTeaserImpression
            trackingTeaserClick
            title
            shortTitle
            lead
            useAutoHyphens
            link {
              path
            }
            teaserImage {
              caption
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
          }
        }
      }
    }
  }
`;
