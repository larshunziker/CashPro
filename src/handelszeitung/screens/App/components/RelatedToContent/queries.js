/**
 * @file   queries related to
 * @author Pascal Tan <pascal.tan@ringieraxelspringer.ch>
 * @date   2019-09-24
 *
 */
import { gql } from '@apollo/client';

export const GET_RELATED_TO_CONTENT = gql`
  query RelatedToContent(
    $query: String!
    $sort: SearchOrderByField
    $filter: SearchFilterEnum
    $offset: Int
    $pageSize: Int
  ) {
    environment(publication: HZ, additionalPublications: [SV, HZB]) {
      globalSearch(
        search: $query
        filter: $filter
        offset: $offset
        limit: $pageSize
        sort: $sort
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              title
              lead
              shortTitle
              changeDate
              publicationDate
              preferredUri
              subtypeValue: articleType
              teaserImage {
                id
                title
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
              authors(limit: 10) {
                edges {
                  node {
                    id
                    name
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
