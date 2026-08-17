import { gql } from '@apollo/client';
import { heroFragment } from '../../components/Hero/fragments';
import { relatedContentFragment } from '../../components/RelatedContent/fragments';

export const organizationFragment = gql`
  fragment OrganizationFragment on Organization {
    id
    metaTitle
    metaDescription
    title
    address
    zipCode
    city
    cityList
    description
    organizationType
    restaurantType
    editRelationUri
    cloneContentUri
    editContentUri
    phone
    email
    website
    preferredUri
    metaCanonicalUrl
    createDate
    changeDate: changedDate
    heroImageBody {
      ...HeroFragment
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

    recommendations(limit: 3) {
      ...RelatedContentFragment
    }

    organizationData {
      id
      acceptsNoCreditCards
      chefName
      closedDe
      closedFr
      reviewDe
      reviewFr
      dinerPriceHigh
      dinerPriceLow
      lunchPriceHigh
      lunchPriceLow
      hasNoPoints
      hasParkingAvailable
      hasTerraceOrGarden
      hasWheelchairAccess
      isNew
      owners {
        id
        name
      }
      points
      pointsChange
      trendIsDisabled
      isProvisional
      restaurantName
      secondaryName
      chiefCooks {
        lastName
        hasProfilePage
        preferredUri
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
    }
    sponsors {
      items {
        id
        title
        teaserImage {
          link {
            path
          }
          image {
            id
            file(style: "scaleh_120") {
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

  ${heroFragment}
  ${relatedContentFragment}
`;
