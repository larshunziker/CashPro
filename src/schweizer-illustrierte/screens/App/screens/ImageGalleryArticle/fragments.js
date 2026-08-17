/**
 *
 */

import { gql } from '@apollo/client';
import { keywordsFragment } from 'Keywords/fragments';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { imageGalleryTeaserFragment } from 'Teaser/fragments';

export const imageGalleryArticleFragment = gql`
  fragment ImageGalleryArticleFragment on ImageGallery {
    id
    nid
    gcid
    title
    shortTitle
    seoTitle
    metaTitle
    metaDescription
    metaOgTitle
    metaOgDescription
    metaCanonicalUrl
    changeDate
    createDate
    publicationDate
    lead
    preferredUri
    editContentUri
    editRelationUri
    cloneContentUri
    relatedTopics {
      edges {
        node {
          ... on Topic {
            id
            title
            preferredUri
          }
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
    metaKeywords
    keywords(limit: 100) {
      ...KeywordsFragment
    }
    teaserImage {
      id
      caption
      format
      suppressSource
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
    body {
      ...ImageParagraphFragment
    }
    activeMenuTrail {
      edges {
        node {
          id
          label
          link
        }
      }
    }
    authors(limit: 1) {
      edges {
        node {
          id
          name
        }
      }
    }
    recommendations(limit: 4) {
      edges {
        node {
          ...ImageGalleryTeaserFragment
          ... on Article {
            id
            title
            preferredUri
            badgeLabel
            badgeColor
            hasVideo
            shortTitle
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
          ... on Video {
            id
            title
            shortTitle
            preferredUri
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
  ${imageGalleryTeaserFragment}
  ${imageParagraphFragment}
  ${keywordsFragment}
`;
