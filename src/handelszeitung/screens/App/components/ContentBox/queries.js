import { gql } from '@apollo/client';

export const GET_LATEST_TICKER_ARTICLES = gql`
  query GetLatestTickerArticles(
    $channel: Int!
    $limit: Int
    $contentTypes: [ContentTypeEnum]
  ) {
    environment(publication: HZ, additionalPublications: [SV, HZB]) {
      content(channel: $channel, limit: $limit, contentTypes: $contentTypes) {
        count
        edges {
          node {
            ... on Article {
              id
              title
              canonicalUri
              preferredUri
              publicationDate
              useAutoHyphens
              channel {
                id
                tid
                title
              }
            }
          }
        }
      }
    }
  }
`;
