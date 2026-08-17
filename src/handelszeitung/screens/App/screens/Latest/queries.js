import { gql } from '@apollo/client';

export const LATEST_QUERY = gql`
  query LatestSearch(
    $query: String!
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
    $pageSize: Int
    $offset: Int
    $path: String!
    $publication: PublicationEnum
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on LandingPage {
            id
            nid
            gcid
            title
            metaTitle
            metaDescription
            metaOgTitle
            metaOgDescription
            metaCanonicalUrl
            lead
            preferredUri
            channel {
              id
              title
            }
            createDate
            metaKeywords
          }
        }
      }
      globalSearch(
        search: $query
        limit: $pageSize
        offset: $offset
        sort: $sort
        content_types: $contentTypes
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              preferredUri
              title
              shortTitle
              hasVideo
              restrictionStatus
              publicationDate
              channel {
                id
                title
                preferredUri
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
  }
`;
