import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
  query Search(
    $query: String!
    $limit: Int
    $offset: Int
    $sort: SearchSortEnum
    $filter: ContentFilterTypesEnum
  ) @api(name: "graphql-service") {
    contentSearch(
      query: $query
      limit: $limit
      offset: $offset
      sort: $sort
      filter: $filter
    ) {
      facets {
        name
        count
      }
      suggestion
      count
      items {
        preferredUri
        id
        type
        gcid
        subtypeValue
        title
        shortTitle
        lead
        hasVideo
        restrictionStatus
        badgeLabel
        badgeColor
        trackingTeaserImpression
        trackingTeaserClick
        description
        teaserImage {
          format
          image {
            file {
              relativeOriginPath
              focalPointX
              focalPointY
            }
          }
        }
        channel {
          title
        }
        authors
        toolType
        publication
      }
    }
  }
`;
