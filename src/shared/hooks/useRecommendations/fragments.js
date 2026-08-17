export const teaserListFragment = `
  fragment teaserList on Recommendations {
    metaData {
      type
      domainUserId
      correlationId
      timestamp
      contentId
    }
    items {
      id
      gcid
      publication
      title
      shortTitle
      lead
      createDate
      revisionDate
      changedDate
      publicationDate
      hasVideo
      showUpdated
      restrictionStatus
      score
      teaserImage {
        image {
          file {
            relativeOriginPath
            focalPointX
            focalPointY
          }
        }
      }
      channel {
        channelType
        title
      }
      ... on Article {
        preferredUri
      }
      ... on Video {
        preferredUri
      }
      ... on Recipe {
        preferredUri
        gcid
      }
      ... on Organization {
        preferredUri
        organizationTeaserData {
          zipCode
          city
          address
          points
          secondaryName
        }
      }
      ... on ImageGallery {
        preferredUri
      }
      ... on NativeAdvertising {
        preferredUri
        link {
          path
          label
        }
        subtypeValue
        advertisingTypeLabel
        trackingTeaserClick
        trackingTeaserImpression
      }
      ... on Teaser {
        link {
          path
          label
        }
      }
      __typename
    }
  }
`;
