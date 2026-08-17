import { gql } from '@apollo/client';

export const keywordSearchResultFragment = gql`
  fragment KeywordSearchResultFragment on SearchableUnionConnection {
    edges {
      node {
        ... on Article {
          id
          title
          subtypeValue: articleType
          preferredUri
          shortTitle
          publicationDate
          hasVideo
          channel {
            id
            title
          }
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
          preferredUri
          shortTitle
          createDate
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
`;
