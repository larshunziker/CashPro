/**
 *
 */

import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const explainingArticleFragment = gql`
  fragment OnmedaArticleFragment on ExplainingArticle {
    id
    nid
    gcid
    category
    synonyms
    title
    metaTitle
    metaDescription
    metaCanonicalUrl
    canonicalUri
    preferredUri
    socialMediaTitle
    publication
    createDate
    publicationDate
    changeDate: changedDate
    restrictionStatus
    editContentUri
    editRelationUri
    cloneContentUri
    teaserImage {
      id
      image {
        id
        file(style: "16x9_560") {
          id
          alt
          origin
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
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
            lead
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
    activeMenuTrail {
      count
      edges {
        node {
          label
          link
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
    authors(limit: 10) {
      edges {
        node {
          ... on Author {
            id
            name
          }
        }
      }
    }
    sections {
      title
      body {
        ...ParagraphsFragment
      }
    }
    relatedArticles(limit: 3) {
      edges {
        node {
          ... on Article {
            id
            title
            shortTitle
            lead
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
            lead
            preferredUri
            publicationDate
            advertisingTypeLabel
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
  }

  ${paragraphsFragment}
`;
