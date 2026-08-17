import { gql } from '@apollo/client';

export const relatedContentFragment = gql`
  fragment RelatedContentFragment on RelatedContentUnionConnection {
    edges {
      node {
        ... on Article {
          id
          subtypeValue: articleType
          title
          lead
          shortTitle
          preferredUri
          publicationDate
          channel {
            id
            title
          }
          teaserImage {
            id
            title
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

        ... on Organization {
          id
          title
          address
          zipCode
          city
          preferredUri
          cityList
          description
          organizationType
          restaurantType
          organizationData {
            id
            secondaryName
            hasNoPoints
            points
            pointsChange
            trendIsDisabled
            isProvisional
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
        }

        ... on Recipe {
          id
          title
          shortTitle
          lead
          preferredUri
          # using the teaserImage here can cause 404 errors, see (https://jira.ringieraxelspringer.ch/browse/GM-322)
          heroImageBody {
            id
            ... on ImageParagraph {
              id
              suppressSource
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
            ... on VideoParagraph {
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
            ... on ImageGalleryParagraph {
              id
              gallery {
                id
                body {
                  id
                  ... on ImageParagraph {
                    id
                    suppressSource
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
          useAutoHyphens
        }

        ... on Teaser {
          id
          title
          shortTitle
          lead
          teaserType
          teaserImage {
            id
            link {
              label
              path
              routed
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
`;
