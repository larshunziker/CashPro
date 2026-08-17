import { gql } from '@apollo/client';

export const GET_VIDEO_PAGE = gql`
  query Video(
    $query: String!
    $sort: SearchOrderByField
    $offset: Int
    $pageSize: Int
    $hasVideo: Boolean
    $publication: PublicationEnum
    $path: String!
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path, publication: $publication) {
        canonical
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
                file(style: "16x9_560", calculateDimensions: true) {
                  id
                  alt
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
        has_video: $hasVideo
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

            ... on Recipe {
              id
              title
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
