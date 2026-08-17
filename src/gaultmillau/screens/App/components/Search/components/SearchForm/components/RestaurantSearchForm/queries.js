import { gql } from '@apollo/client';

export const GET_RESTAURANT_AUTOCOMPLETE_RESULTS = gql`
  query RestaurantAutocomplete(
    $query: String!
    $pageSize: Int!
    $publication: PublicationEnum
    $language: String
  ) {
    environment(publication: $publication, language: $language) {
      restaurantsSearch(search: $query, limit: $pageSize, offset: 0) {
        edges {
          node {
            ... on Organization {
              id
              city
              title
              phone
              preferredUri
              cityList
              description
              organizationType
              restaurantType
              organizationData {
                id
                secondaryName
              }
            }
          }
        }
      }

      citySearch(search: $query, limit: $pageSize, offset: 0) {
        edges {
          node {
            name
            count
          }
        }
      }
    }
  }
`;
