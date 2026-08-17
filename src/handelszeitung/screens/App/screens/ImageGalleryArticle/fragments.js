/**
 * @file   image gallery article fragments
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-05-15
 *
 */

import { gql } from '@apollo/client';
import { articleFooterKeywordsFragment } from 'Article/components/ArticleAlerts/fragments';

export const imageGalleryArticleFragment = gql`
  fragment ImageGalleryArticleFragment on ImageGallery {
    id
    nid
    gcid
    title
    lead
    shortTitle
    seoTitle
    metaTitle
    metaDescription
    canonicalUri
    changeDate
    publication
    publicationDate
    editContentUri
    editRelationUri
    cloneContentUri
    preferredUri
    restrictionStatus
    channel {
      id
      title
      channelType
      suppressAds
    }
    activeMenuTrail {
      edges {
        node {
          label
          link
        }
      }
    }
    metaCanonicalUrl
    authors(limit: 10) {
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
    keywords(limit: 100) {
      ...ArticleFooterKeywordsFragment
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
          width
          height
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    body {
      ... on ImageParagraph {
        anchorId
        id
        title
        alt
        caption
        suppressSource
        image {
          id
          credit
          showOriginal
          file(style: "inline_image_1200", calculateDimensions: true) {
            id
            alt
            height
            width
            relativeOriginPath
            focalPointX
            focalPointY
          }
        }
      }
    }
    relatedGalleries(limit: 6) {
      edges {
        node {
          title
          shortTitle
          preferredUri
          lead
          authors(limit: 10) {
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
      }
    }
  }
  ${articleFooterKeywordsFragment}
`;
