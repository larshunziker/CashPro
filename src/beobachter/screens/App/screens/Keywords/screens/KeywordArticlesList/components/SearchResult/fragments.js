/**
 *
 */

import { gql } from '@apollo/client';

export const keywordSearchResultFragment = gql`
  fragment KeywordSearchResultFragment on SearchableUnionConnection {
    edges {
      node {
        ... on Article {
          id
          title
          shortTitle
          preferredUri
          lead
          restrictionStatus
          channel {
            id
            title
          }
          teaserImage {
            id
            format
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
          badgeLabel
          badgeColor
          authors(first: 10) {
            edges {
              node {
                ... on Author {
                  id
                  name
                  imageParagraph {
                    id
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
                }
              }
            }
          }
        }
        ... on Video {
          id
          title
          shortTitle
          preferredUri
          lead
          restrictionStatus
          channel {
            id
            title
          }
          teaserImage {
            id
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
        ... on ExplainingArticle {
          id
          title
          shortTitle
          preferredUri
          teaserImage {
            id
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
