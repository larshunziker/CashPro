import { gql } from '@apollo/client';

export const entityQueueParagraphFragment = gql`
  fragment EntityQueueParagraphFragment on EntityQueueParagraph {
    id
    anchorId
    title
    entityQueue {
      items(limit: $landingPageGridLimit, offset: $landingPageGridOffset) {
        count
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

            ... on Organization {
              id
              nid
              title
              address
              zipCode
              city
              cityList
              description
              organizationType
              restaurantType
              website
              canonicalUri
              preferredUri
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

              organizationData {
                id
                hasNoPoints
                points
                pointsChange
                trendIsDisabled
                isProvisional
              }
            }

            ... on Recipe {
              nid
              id
              title
              lead
              shortTitle
              createDate
              canonicalUri
              preferredUri
              recipeType
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
              useAutoHyphens
            }

            ... on Teaser {
              id
              title
              lead
              shortTitle
              createDate
              canonicalUri
              preferredUri
              hasVideo
              teaserType
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
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
