import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const landingPageFragment = gql`
  fragment LandingPageFragment on LandingPage {
    id
    nid
    gcid
    title
    preferredUri
    metaTitle
    metaOgTitle
    metaDescription
    metaOgDescription
    metaCanonicalUrl
    canonicalUri
    editContentUri
    editRelationUri
    cloneContentUri
    shortTitle
    subtypeValue
    activeMenuTrail {
      edges {
        node {
          label
          link
        }
      }
    }
    channel {
      id
      title
      suppressAds
      settings {
        mainChannel {
          id
          title
        }
        hierarchy {
          count
          edges {
            node {
              id
              title
              tid
            }
          }
        }
      }
    }
    publication
    restrictionStatus
    sponsorLabel
    sponsor {
      id
      title
      colorCode
      preferredUri
      teaserImage {
        id
        title
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
    }
    body {
      ...ParagraphsFragment
    }

    grid(
      publication: $publication
      additionalPublications: []
      limit: $landingPageGridPageSize
      offset: $landingPageGridOffset
      sort: $sort
    ) {
      count
      edges {
        node {
          ... on Article {
            id
            authorPrefix
            authors {
              edges {
                node {
                  id
                  name
                }
              }
            }
            nid
            title
            lead
            restrictionStatus
            shortTitle
            changeDate
            preferredUri
            showUpdated
            publication
            publicationDate
            subtypeValue: articleType
            useNativeAdvertising
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

          ... on Video {
            id
            preferredUri
            shortTitle
            title
            lead
            brightcoveId
            publicationDate
            changeDate
            caption
            credit
            showUpdated
            teaserImage {
              id
              image {
                id
                file(style: "large") {
                  id
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
            authorPrefix
            authors {
              edges {
                node {
                  id
                  name
                }
              }
            }
            gcid
            title
            lead
            shortTitle
            changeDate
            trackingTeaserImpression
            trackingTeaserClick
            publication
            publicationDate
            preferredUri
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            showUpdated
            channel {
              id
              title
              channelType
              suppressAds
              settings {
                mainChannel {
                  id
                  title
                }
                hierarchy {
                  count
                  edges {
                    node {
                      id
                      title
                      tid
                    }
                  }
                }
              }
            }
            link {
              path
              label
            }
            sponsor {
              id
              title
              preferredUri
              teaserImage {
                id
                title
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
        }
      }
    }
  }

  ${paragraphsFragment}
`;
