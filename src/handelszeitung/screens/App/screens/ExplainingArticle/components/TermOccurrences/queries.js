import { gql } from '@apollo/client';

export const GET_TERM_OCCURRENCE = gql`
  query TermOccurrences(
    $query: String!
    $limit: Int
    $contentTypes: [ContentTypeEnum]
    $publication: PublicationEnum
    $sort: SearchOrderByField
  ) {
    environment(publication: $publication) {
      globalSearch(
        search: $query
        limit: $limit
        content_types: $contentTypes
        sort: $sort
      ) {
        edges {
          node {
            ... on Article {
              id
              subtypeValue: articleType
              lead
              preferredUri
              title
              restrictionStatus
              shortTitle
              publicationDate
              authors {
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
          }
        }
      }
    }
  }
`;
