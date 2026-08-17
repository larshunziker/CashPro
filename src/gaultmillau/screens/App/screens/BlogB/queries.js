import { gql } from '@apollo/client';

export const GET_ARTICLE_BLOG_B = gql`
  query ArticleBlogB(
    $path: String!
    $publication: PublicationEnum
    $query: String!
    $filter: SearchFilterEnum
    $articleType: String
    $sort: SearchOrderByField
    $offset: Int
    $pageSize: Int
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        preferred
        object {
          ... on LandingPage {
            id
            nid
            title
            lead
            shortTitle
            metaTitle
            seoTitle
            editContentUri
            editRelationUri
            cloneContentUri
            metaDescription
            metaCanonicalUrl
            teaserImage {
              id
              caption
              image {
                id
                file(style: "16x9_560") {
                  id
                  alt
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
