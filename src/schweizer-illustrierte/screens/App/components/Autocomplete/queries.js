import { gql } from '@apollo/client';

export const GET_AUTOCOMPLETE = gql`
  query Autocomplete(
    $char: String!
    $pageSize: Int!
    $publication: PublicationEnum
    $contentTypes: [ContentTypeEnum]
  ) {
    globalSearch(
      search: $char
      limit: $pageSize
      publication: $publication
      content_types: $contentTypes
    ) {
      edges {
        node {
          ... on LandingPage {
            id
            title
            preferredUri
          }
          ... on Article {
            id
            title
            preferredUri
            hasVideo
          }
          ... on ImageGallery {
            title
            id
            preferredUri
          }
          ... on NativeAdvertising {
            title
            id
            preferredUri
          }
          ... on Keyword {
            id
            label
            preferredUri
            settings {
              title
            }
          }
          ... on Video {
            id
            title
            preferredUri
          }
        }
      }
    }
  }
`;
