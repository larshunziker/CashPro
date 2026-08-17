/**
 * @file    Explaining Article Fragments
 * @author  Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date    2019-05-06
 *
 */

import { gql } from '@apollo/client';
import { sectionParagraphFragment } from 'Paragraphs/components/SectionParagraph/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const explainingArticleFragment = gql`
  fragment ExplainingArticleFragment on ExplainingArticle {
    id
    gcid
    nid
    title
    publication
    editContentUri
    editRelationUri
    cloneContentUri
    restrictionStatus
    createDate
    publicationDate
    changeDate: changedDate
    showUpdated
    metaCanonicalUrl
    channel {
      id
      title
      suppressAds
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
    }
    relatedArticles(limit: 3) {
      edges {
        node {
          ... on Article {
            id
            subtypeValue: articleType
            lead
            title
            shortTitle
            restrictionStatus
            preferredUri
            hasVideo
            publicationDate
            authors {
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
          ... on NativeAdvertising {
            id
            gcid
            title
            shortTitle
            lead
            preferredUri
            changeDate
            publicationDate
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            trackingTeaserImpression
            trackingTeaserClick
            sponsor {
              id
              title
            }
            link {
              path
              label
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
            useAutoHyphens
          }
          ... on ExplainingArticle {
            id
            title
            shortTitle
            preferredUri
            useAutoHyphens
          }
        }
      }
    }
    metaTitle
    socialMediaTitle
    canonicalUri
    metaDescription
    metaKeywords
    metaOgTitle
    metaOgDescription
    preferredUri
    activeMenuTrail {
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
          label
        }
      }
    }
    category
    sections {
      ...SectionParagraphFragment
    }
  }

  ${paragraphsFragment}
  ${sectionParagraphFragment}
`;
