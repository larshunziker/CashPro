import { gql } from '@apollo/client';

export const GET_LATEST_TICKER_ARTICLES = gql`
  query GetLatestTickerArticlesNewestBody(
    $channel: Int!
    $limit: Int
    $contentTypes: [ContentTypeEnum]
  ) @api(name: cms) {
    environment(publication: CASH) {
      content(channel: $channel, limit: $limit, contentTypes: $contentTypes) {
        edges {
          node {
            ... on Article {
              id
              preferredUri
              canonicalUri
              title
              shortTitle
              hasVideo
              showUpdated
              publicationDate
              changeDate
              useAutoHyphens
              channel {
                id
                title
                preferredUri
              }
            }
            ... on NativeAdvertising {
              id
              gcid
              title
              shortTitle
              lead
              preferredUri
              publicationDate
              showUpdated
              changeDate
              subtypeValue: advertisingTypeValue
              advertisingTypeLabel
              trackingTeaserClick
              trackingTeaserImpression
              useAutoHyphens
              channel {
                id
                title
                suppressAds
                settings {
                  mainChannel {
                    id
                    title
                  }
                  hierarchy {
                    count
                    edges {
                      node {
                        id
                        title
                        tid
                      }
                    }
                  }
                }
              }
              sponsor {
                id
                title
              }
              link {
                path
                label
              }
            }
          }
        }
      }
    }
  }
`;

export const LATEST_QUERY = gql`
  query LatestSearch(
    $query: String!
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
    $limit: Int!
    $publication: PublicationEnum
  ) @api(name: cms) {
    environment(publication: $publication) {
      globalSearch(
        search: $query
        limit: $limit
        sort: $sort
        content_types: $contentTypes
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              preferredUri
              title
              shortTitle
              hasVideo
              publicationDate
              useAutoHyphens
              channel {
                id
                title
                preferredUri
              }
            }
          }
        }
      }
    }
  }
`;
