import { gql } from '@apollo/client';

export const teaserStageParagraphFragment = gql`
  fragment TeaserStageParagraphFragment on TeaserStageParagraph {
    anchorId
    id
    style
    termReference {
      ... on Channel {
        id
        title
        landingPage {
          id
          preferredUri
        }
      }
      ... on Keyword {
        id
        label
        preferredUri
      }
    }
    title
    entities(
      filter: [
        Article
        Recipe
        Organization
        NativeAdvertising
        Video
        Person
        Teaser
      ]
      additionalPublications: [GM, HZ, BEO]
    ) {
      count
      edges {
        node {
          ... on Article {
            id
            title
            lead
            publicationDate
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            subtypeValue: articleType
            hasVideo
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
          ... on NativeAdvertising {
            id
            title
            lead
            hasVideo
            publicationDate
            trackingTeaserImpression
            trackingTeaserClick
            subtypeValue: advertisingTypeValue
            channel {
              id
              title
            }
            link {
              path
              label
            }
            preferredUri
            publication
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
          ... on Person {
            id
            preferredUri
            publication
            title
            nid
            domain {
              title
              tid
            }
            channel {
              id
              title
            }
            rolesLabel
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
          ... on Video {
            id
            preferredUri
            publication
            title
            brightcoveId
            publicationDate
            changeDate
            caption
            credit
            lead
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
        }
      }
    }
  }
`;
