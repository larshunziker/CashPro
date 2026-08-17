import { gql } from '@apollo/client';
import { articleFragment } from 'Article/fragments';
import { nativeAdvertisingFragment } from 'NativeAdvertising/fragments';

export const GET_PREV_NEXT_CHANNEL_ENTITIES = gql`
  query GetPrevNextChannelEntities(
    $path: String!
    $publication: PublicationEnum
    $limit: Int
  ) @api(name: cms) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        object {
          ... on Article {
            id
            prevChannelEntities(
              limit: $limit
              filter: [Article, NativeAdvertising]
            ) {
              edges {
                node {
                  ...ArticleFragment
                  ...NativeAdvertisingFragment
                }
              }
            }
            nextChannelEntities(
              limit: $limit
              filter: [Article, NativeAdvertising]
            ) {
              edges {
                node {
                  ...ArticleFragment
                  ...NativeAdvertisingFragment
                }
              }
            }
          }
          ... on NativeAdvertising {
            id
            prevChannelEntities(
              limit: $limit
              filter: [Article, NativeAdvertising]
            ) {
              edges {
                node {
                  ...ArticleFragment
                  ...NativeAdvertisingFragment
                }
              }
            }
            nextChannelEntities(
              limit: $limit
              filter: [Article, NativeAdvertising]
            ) {
              edges {
                node {
                  ...ArticleFragment
                  ...NativeAdvertisingFragment
                }
              }
            }
          }
        }
      }
    }
  }
  ${articleFragment}
  ${nativeAdvertisingFragment}
`;
