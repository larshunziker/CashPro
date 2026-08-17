/**
 * @file   search queries
 *
 */

import { gql } from '@apollo/client';

export const GET_SEARCH_PAGE = gql`
  query Search(
    $query: String!
    $limit: Int
    $offset: Int
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
    $publication: PublicationEnum
    $additionalPublications: [PublicationEnum]
  ) {
    environment(
      publication: $publication
      additionalPublications: $additionalPublications
    ) {
      globalSearch(
        search: $query
        limit: $limit
        offset: $offset
        sort: $sort
        content_types: $contentTypes
      ) {
        count
        edges {
          node {
            ... on LandingPage {
              id
              title
              lead
              shortTitle
              preferredUri
              sponsor {
                id
              }
              channel {
                id
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
              link {
                path
                label
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
              sponsor {
                id
                title
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
            ... on Article {
              preferredUri
              subtypeValue: articleType
              id
              title
              restrictionStatus
              lead
              shortTitle
              changeDate
              publicationDate
              channel {
                id
                title
              }
              hasVideo
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
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
