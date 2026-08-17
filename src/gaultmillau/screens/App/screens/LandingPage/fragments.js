//

import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const landingPageFragment = gql`
  fragment LandingPageFragment on LandingPage {
    id
    nid
    title
    lead
    shortTitle
    seoTitle
    metaTitle
    editRelationUri
    cloneContentUri
    editContentUri
    metaDescription
    metaCanonicalUrl
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
    body {
      ...ParagraphsFragment
    }
    grid(
      publication: $publication
      limit: $landingPageGridLimit
      offset: $landingPageGridOffset
    ) {
      count
      edges {
        node {
          ... on Organization {
            id
            title
            createDate
            preferredUri
            hasVideo
            cityList
            description
            organizationType
            restaurantType
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
            id
            title
            lead
            shortTitle
            createDate
            preferredUri
            hasVideo
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

          ... on Article {
            id
            title
            lead
            shortTitle
            publicationDate
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

  ${paragraphsFragment}
`;
