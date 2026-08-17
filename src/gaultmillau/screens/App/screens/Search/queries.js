import { gql } from '@apollo/client';

export const GET_SEARCH_PAGE = gql`
  query Search(
    $language: String
    $publication: PublicationEnum
    $query: String!
    $sort: SearchOrderByField
    $offset: Int
    $pageSize: Int
  ) {
    environment(publication: $publication) {
      globalSearch(
        search: $query
        offset: $offset
        limit: $pageSize
        sort: $sort
        publication: $publication
        language: $language
      ) {
        count
        edges {
          node {
            ... on Organization {
              id
              title
              description
              preferredUri
              address
              zipCode
              city
              cityList
              organizationType
              restaurantType
              organizationData {
                id
                restaurantName
                secondaryName
                hasNoPoints
                points
                pointsChange
                trendIsDisabled
                isProvisional
              }
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
            }
            ... on Article {
              id
              title
              lead
              publicationDate
              subtypeValue: articleType
              preferredUri
              shortTitle
              hasVideo
              channel {
                id
                title
              }
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
            ... on Recipe {
              id
              title
              shortTitle
              lead
              createDate
              preferredUri
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
          }
        }
      }
    }
  }
`;
