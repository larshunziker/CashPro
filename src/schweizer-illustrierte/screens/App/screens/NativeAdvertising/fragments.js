/**
 * @file   native advertising graphql fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-06-21
 *
 */

import { gql } from '@apollo/client';
import { keywordsFragment } from 'Keywords/fragments';
import { imageGalleryParagraphFragment } from 'Paragraphs/components/ImageGalleryParagraph/fragments';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { videoParagraphFragment } from 'Paragraphs/components/VideoParagraph/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const nativeAdvertisingFragment = gql`
  fragment NativeAdvertisingFragment on NativeAdvertising {
    id
    nid
    gcid
    title
    editContentUri
    editRelationUri
    cloneContentUri
    lead
    authorPrefix
    subtypeValue: advertisingTypeValue
    advertisingTypeLabel
    shortTitle
    seoTitle
    metaTitle
    socialMediaTitle
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
    keywords(limit: 20) {
      ...KeywordsFragment
    }
    metaOgDescription
    metaCanonicalUrl
    showUpdated
    changeDate
    createDate
    publicationDate
    preferredUri
    trackingDetailImpression
    metaKeywords
    source
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
    sponsor {
      id
      title
      colorCode
      preferredUri
      prefix
      hasProfilePage
      teaserImage {
        id
        caption
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
      backgroundImage {
        file(style: "large") {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    channel {
      id
      title
      channelType
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
      sponsor {
        id
        title
        colorCode
        teaserImage {
          id
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
      special {
        id
        title
        colorCode
        logo {
          source
        }
      }
      partners(limit: 3) {
        edges {
          node {
            ... on Sponsor {
              id
              title
            }
          }
        }
      }
      landingPage {
        id
        shortTitle
        title
        preferredUri
        teaserImage {
          id
          caption
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
      authors(limit: 1) {
        edges {
          node {
            id
            name
            description
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
    activeMenuTrail {
      edges {
        node {
          id
          label
          link
        }
      }
    }
    teaserImage {
      id
      caption
      suppressSource
      format
      image {
        id
        credit
        file(style: "large") {
          id
          relativeOriginPath
          focalPointX
          focalPointY
          alt
        }
      }
    }
    body {
      ...ParagraphsFragment
    }
    authors(limit: 5) {
      edges {
        node {
          id
          name
          description
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
    heroImageBody {
      ...VideoParagraphFragment
      ...ImageParagraphFragment
      ...ImageGalleryParagraphFragment
    }
  }
  ${paragraphsFragment}
  ${keywordsFragment}
  ${videoParagraphFragment}
  ${imageParagraphFragment}
  ${imageGalleryParagraphFragment}
`;
