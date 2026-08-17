import gql from 'graphql-tag';

export const GET_SEARCHFORM_AUTOCOMPLETE = gql`
  query Autocomplete(
    $char: String!
    $pageSize: Int!
    $contentTypes: [ContentTypeEnum]
    $publication: PublicationEnum
    $additionalPublications: [PublicationEnum]
  ) {
    environment(
      publication: $publication
      additionalPublications: $additionalPublications
    ) {
      globalSearch(
        search: $char
        limit: $pageSize
        content_types: $contentTypes
      ) {
        edges {
          node {
            ... on Article {
              id
              title
              preferredUri
            }
            ... on LandingPage {
              id
              title
              preferredUri
            }
            ... on NativeAdvertising {
              id
              title
              preferredUri
            }
          }
        }
      }
    }
  }
`;
