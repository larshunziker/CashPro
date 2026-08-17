/**
 * @file   pop stage graphql queries
 * @author Pascal Tan <pascal.tan@ringieraxelspringer.ch>
 * @date   2019-06-03 11:16:06
 *
 */

import { gql } from '@apollo/client';

export const GET_POP_STAGE_RESTAURANTS = gql`
  query PopStageRestaurants(
    $query: String!
    $sort: SearchOrderByField
    $sortOrder: SortOrderEnum
    $offset: Int
    $pageSize: Int
    $path: String!
    $publication: PublicationEnum
    $language: String
    $popCity: PopCityEnum
    $organizationType: OrganizationTypeEnum
    $filter: SearchFilterEnum
  ) {
    environment(publication: $publication, language: $language) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on LandingPage {
            id
            nid
            title
            lead
            shortTitle
            metaTitle
            seoTitle
            metaDescription
            metaCanonicalUrl
          }
        }
      }

      globalSearch(
        filter: $filter
        organizationType: $organizationType
        popCity: $popCity
        search: $query
        offset: $offset
        limit: $pageSize
        sort: $sort
        sortOrder: $sortOrder
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
