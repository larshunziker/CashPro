/**
 *
 */

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
    publication
    landingPageType
    metaCanonicalUrl
    metaTitle
    preferredUri
    metaDescription
    sponsorLabel
    changeDate: changedDate
    createDate
    restrictionStatus
    editContentUri
    editRelationUri
    cloneContentUri
    channel {
      channelType
      id
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
    }
    sponsor {
      id
      title
      colorCode
      preferredUri
      teaserImage {
        id
        title
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
    }
    correspondingLandingPage {
      preferredUri
    }
    activeMenuTrail {
      count
      edges {
        node {
          label
          link
        }
      }
    }
    teaserImage {
      id
      image {
        id
        file(style: "16x9_560") {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
          origin
        }
      }
    }
    body {
      ...ParagraphsFragment
    }
    grid(limit: $landingPageGridPageSize, offset: $landingPageGridOffset) {
      count
      edges {
        node {
          ... on Video {
            id
            preferredUri
            shortTitle
            title
            lead
            brightcoveId
            publicationDate
            restrictionStatus
            changeDate
            caption
            credit
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
          ... on Article {
            id
            title
            lead
            subtypeValue: articleType
            shortTitle
            publicationDate
            preferredUri
            restrictionStatus
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
            channel {
              id
              title
            }
            hasVideo
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
            useAutoHyphens
            badgeLabel
            badgeColor
          }
          ... on ExplainingArticle {
            id
            title
            preferredUri
            shortTitle
            publicationDate
            authors(first: 10) {
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
            hasVideo
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
            advertisingType
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
            link {
              path
              label
            }
            sponsor {
              id
              title
              teaserImage {
                id
                title
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
        }
      }
    }
  }

  ${paragraphsFragment}
`;
