import { gql } from '@apollo/client';

export const GET_RECIPES_QUERY = gql`
  query Recipies(
    $query: String!
    $sort: SearchOrderByField
    $sortOrder: SortOrderEnum
    $offset: Int
    $pageSize: Int
    $filter: SearchFilterEnum
    $path: String
    $publication: PublicationEnum
    $contentTypes: [ContentTypeEnum]
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
            editRelationUri
            cloneContentUri
            editContentUri
            metaTitle
            seoTitle
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
        sort: $sort
        sortOrder: $sortOrder
        publication: $publication
        content_types: $contentTypes
      ) {
        count
        edges {
          node {
            ... on Recipe {
              id
              title
              seoTitle
              shortTitle
              lead
              createDate
              preferredUri
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
