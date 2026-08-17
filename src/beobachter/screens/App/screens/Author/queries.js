import { gql } from '@apollo/client';

export const GET_CONTENT_BY_AUTHOR = gql`
  query GetContentByAuthor(
    $limit: Int
    $offset: Int
    $contentTypes: [ContentTypeEnum]
    $publication: PublicationEnum
    $authorId: Int
    $sortOrder: SortOrderEnum
    $sort: SearchOrderByField
  ) @api(name: cms) {
    globalSearch(
      search: "*"
      limit: $limit
      offset: $offset
      authorId: $authorId
      content_types: $contentTypes
      publication: $publication
      sortOrder: $sortOrder
      sort: $sort
    ) {
      count
      edges {
        node {
          ... on Article {
            preferredUri
            id
            title
            shortTitle
            lead
            hasVideo
            subtypeValue: articleType
            restrictionStatus
            authors(first: 10) {
              edges {
                node {
                  id
                  name
                  headline
                  hasProfilePage
                  preferredUri
                  imageParagraph {
                    id
                    image {
                      id
                      file {
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
          ... on NativeAdvertising {
            preferredUri
            id
            title
            shortTitle
            lead
            hasVideo
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            restrictionStatus
            trackingTeaserImpression
            trackingTeaserClick
            link {
              path
              label
            }
            authors(first: 10) {
              edges {
                node {
                  id
                  name
                  headline
                  hasProfilePage
                  preferredUri
                  imageParagraph {
                    id
                    image {
                      id
                      file {
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
          }
        }
      }
    }
  }
`;
