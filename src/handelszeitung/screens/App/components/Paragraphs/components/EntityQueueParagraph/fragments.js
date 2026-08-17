/**
 * @file    entity queue paragraph fragments
 * @author  Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date    2019-04-24
 *
 */

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
                    focalPointX
                    focalPointY
                    width
                    height
                  }
                }
              }
              useAutoHyphens
            }
            ... on ImageGallery {
              id
              title
              lead
              shortTitle
              preferredUri
              authors(limit: 10) {
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
                caption
                image {
                  id
                  file(style: "large", calculateDimensions: true) {
                    id
                    alt
                    relativeOriginPath
                    focalPointX
                    focalPointY
                    width
                    height
                  }
                }
              }
              useAutoHyphens
            }
            ... on NativeAdvertising {
              id
              gcid
              title
              lead
              shortTitle
              changeDate
              publicationDate
              trackingTeaserImpression
              trackingTeaserClick
              publication
              preferredUri
              subtypeValue: advertisingTypeValue
              advertisingTypeLabel
              authors(limit: 10) {
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
              sponsor {
                id
                title
                preferredUri
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
                    focalPointX
                    focalPointY
                    width
                    height
                  }
                }
              }
              useAutoHyphens
            }
            ... on Teaser {
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
              title
              lead
              restrictionStatus
              shortTitle
              changeDate
              preferredUri
              publication
              publicationDate
              subtypeValue: articleType
              useNativeAdvertising
              authors(limit: 10) {
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
              relatedPersons {
                edges {
                  node {
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
                }
              }
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
              teaserDisplay
              teaserSummary
              teaserCTALabel
            }
          }
        }
      }
    }
  }

  ${contentBoxFragment}
`;
