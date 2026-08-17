import { gql } from '@apollo/client';

export const MENU_TEASER_QUERY = gql`
  query MenuTeaserNavigation(
    $query: String!
    $filter: SearchFilterEnum
    $articleType: String
    $sort: SearchOrderByField
    $publication: PublicationEnum
  ) {
    environment(publication: $publication) {
      menuTeaser: globalSearch(
        search: $query
        offset: 0
        limit: 1
        sort: $sort
        filter: $filter
        article_type: $articleType
        has_video: true
        publication: $publication
      ) {
        edges {
          node {
            ... on Article {
              nid
              id
              title
              lead
              shortTitle
              publicationDate
              canonicalUri
              preferredUri
              subtypeValue: articleType
              channel {
                id
                title
              }
              sponsor {
                id
              }
              hasVideo
              teaserImage {
                id
                caption
                link {
                  path
                }
                image {
                  id
                  file(style: "large") {
                    id
                    alt
                    relativeOriginPath
                    focalPointX
                    focalPointY
                  }
                }
              }
              authors(limit: 1) {
                edges {
                  node {
                    id
                    name
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
