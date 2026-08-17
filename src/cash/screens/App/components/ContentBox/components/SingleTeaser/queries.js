import { gql } from '@apollo/client';

export const LATEST_NATIVE_ADVERTISING_BY_VALOR_QUERY = gql`
  query LatestNativeAdvertisingByValor(
    $query: String!
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
    $limit: Int!
    $publication: PublicationEnum
    $valors: [String]
  ) @api(name: cms) {
    environment(publication: $publication) {
      globalSearch(
        search: $query
        limit: $limit
        sort: $sort
        content_types: $contentTypes
        valors: $valors
      ) {
        count
        edges {
          node {
            ... on NativeAdvertising {
              id
              title
              lead
              hasVideo
              publicationDate
              trackingTeaserImpression
              trackingTeaserClick
              subtypeValue: advertisingTypeValue
              restrictionStatus
              channel {
                id
                title
              }
              link {
                path
                label
              }
              preferredUri(additionalPublications: [GM, HZ, BEO])
              publication(additionalPublications: [GM, HZ, BEO])
              teaserImage {
                id
                image {
                  id
                  file {
                    id
                    alt
                    relativeOriginPath
                    focalPointX
                    focalPointY
                  }
                }
              }
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
