import { gql } from '@apollo/client';

export const GET_AUTHORS_PAGE = gql`
  query AuthorsPageByPath($path: String!) @api(name: cms) {
    environment(publication: BEO) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on Page {
            id
            nid
            gcid
            title
            lead
            shortTitle
            editRelationUri
            cloneContentUri
            editContentUri
            metaTitle
            metaOgTitle
            metaDescription
            metaOgDescription
            metaCanonicalUrl
            metaKeywords
            channel {
              id
              title
              channelType
              settings {
                mainChannel {
                  id
                  title
                }
              }
            }
            teaserImage {
              id
              caption
              image {
                id
                file(style: "header_16_9_large") {
                  id
                  relativeOriginPath
                  focalPointX
                  focalPointY
                }
              }
            }
          }
        }
      }
      authors(publication: BEO, limit: 500) {
        count
        edges {
          node {
            id
            aid
            preferredUri
            name
            headline
            hasProfilePage
            imageParagraph {
              image {
                file {
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
    }
  }
`;
