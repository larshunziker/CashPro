import { gql } from '@apollo/client';

export const GET_ALL_AMEX_RESTAURANTS_QUERY = gql`
  query AmexRestaurantsAll(
    $query: String!
    $sortOrder: SortOrderEnum
    $offset: Int
    $pageSize: Int
    $path: String!
    $publication: PublicationEnum
    $language: String
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

      globalSearch(
        search: $query
        offset: $offset
        limit: $pageSize
        content_types: [Organization]
        organizationType: $organizationType
        sort: Points
        sortOrder: $sortOrder
        sponsor: 249154
        filter: $filter
      ) {
        count
        edges {
          node {
            __typename
            ... on Organization {
              id
              nid
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
              sponsors {
                edges {
                  node {
                    id
                    title
                    gcid
                  }
                }
              }
              organizationData {
                id
                points
                province
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
    }
  }
`;

export const GET_AMEX_RESTAURANTS_QUERY = gql`
  query AmexRestaurants(
    $query: String!
    $sortOrder: SortOrderEnum
    $offset: Int
    $pageSize: Int
    $path: String!
    $publication: PublicationEnum
    $language: String
    $organizationType: OrganizationTypeEnum
    $province: ProvinceEnum
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

      globalSearch(
        search: $query
        offset: $offset
        limit: $pageSize
        content_types: [Organization]
        organizationType: $organizationType
        sort: Points
        sortOrder: $sortOrder
        sponsor: 249154
        province: $province
        filter: $filter
      ) {
        count
        edges {
          node {
            __typename
            ... on Organization {
              id
              nid
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
              sponsors {
                edges {
                  node {
                    id
                    title
                    gcid
                  }
                }
              }
              organizationData {
                id
                points
                province
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
    }
  }
`;
