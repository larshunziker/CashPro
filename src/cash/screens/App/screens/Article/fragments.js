/**
 * @file   article screen fragments
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-05-16
 *
 */

import { gql } from '@apollo/client';
import { heroFragment } from '../../components/Hero/fragments';
import { articleFooterFragment } from 'Article/components/ArticleAlerts/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const articleFragment = gql`
  fragment ArticleFragment on Article {
    id
    gcid
    nid
    title
    publication
    lead
    shortTitle
    metaTitle
    seoTitle
    editContentUri
    editRelationUri
    cloneContentUri
    socialMediaTitle
    canonicalUri
    metaDescription
    metaKeywords
    time2read
    source
    valors {
      edges {
        node {
          id
          tid
          label
          valorNumber
          valorName
          fullquoteUrl
          valorCurrency {
            id
            label
            originalId
          }
          valorType {
            id
            originalId
          }
          valorStockExchange {
            id
            label
            originalId
          }
        }
      }
    }
    keywords(limit: 100) {
      edges {
        node {
          label
          tid
        }
      }
    }
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
    changeDate
    createDate
    publicationDate
    showUpdated
    preferredUri
    subtypeValue: articleType
    restrictionStatus
    activeMenuTrail {
      edges {
        node {
          id
          label
          link
        }
      }
    }
    issue {
      id
      nid
    }
    authorPrefix
    metaCanonicalUrl
    authors(limit: 5) {
      edges {
        node {
          id
          name
          firstName
          lastName
          shortDescription
          hasProfilePage
          publications
          preferredUri
          headline
          associations
          awards
          website {
            path
          }
          facebook {
            path
          }
          instagram {
            path
          }
          linkedin {
            path
          }
          twitter {
            path
          }
          xing {
            path
          }
          imageParagraph {
            id
            image {
              id
              file {
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
    commentStatus
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
      articles(limit: 2) {
        edges {
          node {
            ... on Article {
              id
              title
              lead
              hasVideo
              subtypeValue: articleType
              shortTitle
              changeDate
              publicationDate
              showUpdated
              restrictionStatus
              preferredUri
              authorPrefix
              channel {
                id
                title
              }
              authors(limit: 2) {
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
          }
        }
      }
    }
    topics {
      ...ArticleFooterFragment
    }
    heroImageBody {
      ...HeroFragment
    }
    teaserImage {
      id
      caption
      suppressSource
      format
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
    body(processors: [TextSplit]) {
      ...ParagraphsFragment
    }
  }

  ${articleFooterFragment}
  ${paragraphsFragment}
  ${heroFragment}
`;
