/**
 * @file   article graphql fragments
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
import { imageGalleryTeaserFragment } from 'Teaser/fragments';

export const articleFragment = gql`
  fragment ArticleFragment on Article {
    id
    nid
    gcid
    title
    lead
    shortTitle
    seoTitle
    editContentUri
    editRelationUri
    cloneContentUri
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
    commentStatus
    keywords(limit: 20) {
      ...KeywordsFragment
    }
    metaOgDescription
    metaCanonicalUrl
    changeDate
    showUpdated
    createDate
    publicationDate
    preferredUri
    metaKeywords
    restrictionStatus
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
    }
    issue {
      id
      nid
    }
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
      sponsors {
        edges {
          node {
            ... on Sponsor {
              id
              title
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
    subtypeValue: articleType
    authorPrefix
    body(processors: [TextSplit]) {
      ...ParagraphsFragment
    }
    showAuthorBox
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
  ${imageGalleryTeaserFragment}
`;
