import { gql } from '@apollo/client';

export const GET_RESTAURANTS_QUERY = gql`
  query Restaurants(
    $query: String!
    $sort: SearchSortInput
    $offset: Int
    $pageSize: Int
    $path: String!
    $publication: PublicationEnum
    $language: String
    $sticky: Boolean
  ) {
    environment(publication: $publication, language: $language) {
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
            teaserImage {
              id
              caption
              image {
                id
                file(style: "header_16_9_large", calculateDimensions: true) {
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
          }
        }
      }

      restaurantsSearch(
        search: $query
        offset: $offset
        limit: $pageSize
        sort: $sort
        sticky: $sticky
      ) {
        count
        edges {
          node {
            ... on Organization {
              id
              title
              foundationDate
              address
              zipCode
              city
              cityList
              description
              organizationType
              restaurantType
              organizationData {
                id
                secondaryName
                hasNoPoints
                points
                pointsChange
                trendIsDisabled
                isProvisional
              }
              preferredUri
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
    }
  }
`;
