import { gql } from '@apollo/client';

export const GET_RESTAURANTS_SEARCH_QUERY = gql`
  query RestaurantSearch(
    $path: String!
    $publication: PublicationEnum
    $language: String
    $query: String!
    $pageSize: Int
    $offset: Int
    $sort: SearchSortInput
  ) {
    environment(publication: $publication, language: $language) {
      restaurantsSearch(
        search: $query
        offset: $offset
        limit: $pageSize
        sort: $sort
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
                isNew
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
          }
        }
      }

      routeByPath(path: $path) {
        preferred
        object {
          ... on LandingPage {
            id
            nid
            title
            lead
            shortTitle
            editRelationUri
            cloneContentUri
            editContentUri
            metaTitle
            seoTitle
            metaDescription
            metaCanonicalUrl
          }
        }
      }
    }
  }
`;
