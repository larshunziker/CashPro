import { gql } from '@apollo/client';

export const GET_ARTICLE_HOT_TEN = gql`
  query ArticleHotTen(
    $query: String!
    $sort: SearchOrderByField
    $offset: Int
    $filter: SearchFilterEnum
    $articleType: String
    $pageSize: Int
  ) {
    environment(publication: GM) {
      routeByPath(path: "hot-ten") {
        preferred
        object {
          ... on LandingPage {
            id
            nid
            title
            lead
            editRelationUri
            cloneContentUri
            editContentUri
            shortTitle
            metaTitle
            seoTitle
            metaDescription
            metaCanonicalUrl
            teaserImage {
              id
              caption
              image {
                id
                file(style: "header_16_9_large", calculateDimensions: true) {
                  id
                  alt
                  source
                  width
                  height
                  relativeOriginPath
                  focalPointX
                  focalPointY
                }
              }
            }
          }
        }
      }

      globalSearch(
        search: $query
        offset: $offset
        limit: $pageSize
        filter: $filter
        article_type: $articleType
        sort: $sort
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              title
              lead
              shortTitle
              publicationDate
              changeDate
              showUpdated
              preferredUri
              subtypeValue: articleType
              channel {
                id
                title
              }
              hasVideo
              teaserImage {
                id
                caption
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
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
