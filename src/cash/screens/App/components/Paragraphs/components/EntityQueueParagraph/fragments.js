import { gql } from '@apollo/client';
import { contentBoxFragment } from '../../../ContentBox/fragments';

export const entityQueueParagraphFragment = gql`
  fragment EntityQueueParagraphFragment on EntityQueueParagraph {
    id
    anchorId
    title
    landingPage {
      title
      preferredUri
    }
    style
    entityQueue {
      items {
        edges {
          node {
            ...ContentBoxFragment
            ... on LandingPage {
              id
              title
              lead
              shortTitle
              preferredUri
              useNativeAdvertising
              channel {
                id
                title
                channelType
                suppressAds
                settings {
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
            ... on Dossier {
              id
              preferredUri
              title
              teaserImage {
                id
                image {
                  id
                  file(style: "large", calculateDimensions: true) {
                    id
                    alt
                    relativeOriginPath
                    width
                    height
                    focalPointX
                    focalPointY
                  }
                }
              }
              useAutoHyphens
            }
            ... on NativeAdvertising {
              id
              authorPrefix
              authors {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              gcid
              title
              lead
              shortTitle
              changeDate
              trackingTeaserImpression
              trackingTeaserClick
              publicationDate
              showUpdated
              preferredUri
              subtypeValue: advertisingTypeValue
              advertisingTypeLabel
              channel {
                id
                title
                channelType
                suppressAds
                settings {
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
                }
              }
              link {
                path
                label
              }
              hasVideo
              teaserImage {
                id
                caption
                image {
                  id
                  file(style: "large", calculateDimensions: true) {
                    id
                    alt
                    relativeOriginPath
                    width
                    height
                    focalPointX
                    focalPointY
                  }
                }
              }
              useAutoHyphens
            }
            ... on Teaser {
              id
              link {
                path
              }
              trackingEnabled
              trackingTeaserImpression
              trackingTeaserClick
              title
              shortTitle
              lead
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
              useAutoHyphens
            }
            ... on Article {
              id
              authorPrefix
              authors {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              title
              lead
              restrictionStatus
              shortTitle
              changeDate
              showUpdated
              preferredUri
              publication
              publicationDate
              subtypeValue: articleType
              useNativeAdvertising
              channel {
                id
                title
              }
              hasVideo
              teaserImage {
                id
                caption
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
            ... on Widget {
              id
              title
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
          }
        }
      }
    }
  }

  ${contentBoxFragment}
`;
