/**
 *
 */

import { gql } from '@apollo/client';
import { heroFragment } from './components/Hero/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const nativeAdvertisingFragment = gql`
  fragment NativeAdvertisingFragment on NativeAdvertising {
    heroImageBody {
      ...HeroFragment
    }
    id
    nid
    gcid
    title
    lead
    subtypeValue: advertisingTypeValue
    advertisingTypeLabel
    metaTitle
    metaDescription
    metaOgTitle
    ogImage {
      ... on ImageParagraph {
        id
        caption
        suppressSource
        format
        image {
          id
          credit
          file {
            id
            relativeOriginPath
            focalPointX
            focalPointY
            alt
          }
        }
      }
    }
    metaOgDescription
    body {
      ...ParagraphsFragment
    }
    trackingDetailImpression
    shortTitle
    preferredUri
    publication
    createDate
    publicationDate
    changeDate
    metaCanonicalUrl
    showUpdated
    socialMediaTitle
    restrictionStatus
    source
    editContentUri
    editRelationUri
    cloneContentUri
    authorPrefix
    channel {
      id
      title
      link
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
      articles(limit: 16) {
        edges {
          node {
            title
            shortTitle
            subtypeValue: articleType
            publicationDate
            preferredUri
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
          }
        }
      }
    }
    relatedArticles(limit: 3) {
      edges {
        node {
          ... on Article {
            id
            title
            shortTitle
            preferredUri
            publicationDate
            authorPrefix
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
            shortTitle
            preferredUri
            publicationDate
            channel {
              id
              title
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
            title
            shortTitle
            advertisingTypeLabel
            preferredUri
            publicationDate
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
        }
      }
    }
    keywords(limit: 100) {
      edges {
        node {
          id
          tid
          label
          preferredUri
        }
      }
    }
    sponsor {
      id
      title
      colorCode
      preferredUri
      prefix
      hasProfilePage
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

    authors(first: 10) {
      edges {
        node {
          id
          name
          hasProfilePage
          preferredUri
          shortDescription
          imageParagraph {
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
        }
      }
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
      title
      caption
      suppressSource
      format
      image {
        id
        credit
        file(style: "16x9_560") {
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

  ${paragraphsFragment}
  ${heroFragment}
`;
