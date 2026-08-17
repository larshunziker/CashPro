import { gql } from '@apollo/client';

export const GET_LATEST_TICKER_ARTICLES = gql`
  query GetLatestTickerArticlesContentBoxTab(
    $channel: Int!
    $limit: Int
    $contentTypes: [ContentTypeEnum]
  ) @api(name: cms) {
    environment(publication: HZ, additionalPublications: [SV, HZB]) {
      content(channel: $channel, limit: $limit, contentTypes: $contentTypes) {
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
