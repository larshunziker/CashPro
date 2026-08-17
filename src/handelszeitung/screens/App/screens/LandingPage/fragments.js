import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const landingPageFragment = gql`
  fragment LandingPageFragment on LandingPage {
    id
    nid
    gcid
    title
    shortTitle
    lead
    subtypeValue
    metaTitle
    metaDescription
    metaOgTitle
    metaOgDescription
    metaCanonicalUrl
    canonicalUri
    publication
    editContentUri
    editRelationUri
    cloneContentUri
    preferredUri
    restrictionStatus
    activeMenuTrail {
      edges {
        node {
          label
          link
        }
      }
    }
    teaserImage {
      id
      caption
      image {
        id
        credit
        file(style: "16x9_560", calculateDimensions: true) {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
          width
          height
        }
      }
    }
    channel {
      id
      channelType
      title
      suppressAds
      settings {
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
      sponsors(limit: 5) {
        edges {
          node {
            title
            preferredUri
            teaserImage {
              id
              title
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
          }
        }
      }
    }
    channels {
      edges {
        node {
          title
        }
      }
    }
    sponsorLabel
    sponsor {
      id
      title
      colorCode
      preferredUri
      teaserImage {
        id
        title
        image {
          id
          file(style: "large", calculateDimensions: true) {
            id
            alt
            width
            height
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
      additionalPublications: [SV, HZB]
      limit: $landingPageGridPageSize
      offset: $landingPageGridOffset
    ) {
      count
      edges {
        node {
          ... on Article {
            id
            title
            lead
            restrictionStatus
            subtypeValue: articleType
            shortTitle
            changeDate
            publicationDate
            preferredUri
            publication
            hasVideo
            channel {
              id
              title
            }
            authors(limit: 5) {
              edges {
                node {
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
          ... on LandingPage {
            id
            title
            preferredUri
            channel {
              id
              channelType
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
          ... on NativeAdvertising {
            id
            gcid
            title
            lead
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            shortTitle
            trackingTeaserImpression
            trackingTeaserClick
            publicationDate
            changeDate
            preferredUri
            publication
            channel {
              id
              title
              settings {
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
            sponsor {
              id
              title
              teaserImage {
                id
                title
                image {
                  id
                  file(style: "scaleh_120", calculateDimensions: true) {
                    id
                    alt
                    width
                    height
                    relativeOriginPath
                    focalPointX
                    focalPointY
                  }
                }
              }
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
          ... on Dossier {
            id
            preferredUri
            title
            teaserImage {
              id
              image {
                id
                file(style: "large", calculateDimensions: true) {
                  id
                  alt
                  relativeOriginPath
                  focalPointX
                  focalPointY
                  width
                  height
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
