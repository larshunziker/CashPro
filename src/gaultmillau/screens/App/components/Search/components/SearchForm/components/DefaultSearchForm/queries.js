/*
 *
 */

import { gql } from '@apollo/client';

export const GET_AUTOCOMPLETE_RESULTS = gql`
  query Autocomplete(
    $char: String!
    $pageSize: Int!
    $publication: PublicationEnum
    $language: String
  ) {
    globalSearch(
      search: $char
      limit: $pageSize
      publication: $publication
      language: $language
    ) {
      edges {
        node {
          ... on Article {
            id
            title
            preferredUri(publication: $publication)
          }
          ... on Organization {
            id
            city
            title
            phone
            cityList
            description
            organizationType
            restaurantType
            preferredUri(publication: $publication)
            organizationData {
              id
              secondaryName
            }
          }
        }
      }
    }
  }
`;
