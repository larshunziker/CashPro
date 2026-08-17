/**
 *
 */

import { gql } from '@apollo/client';
import { imageGalleryHeroFragment } from 'Article/components/ArticleHero/components/ImageGalleryHero/fragments';
import { videoParagraphFragment } from 'Paragraphs/components/VideoParagraph/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const articleFragment = gql`
  fragment ArticleFragment on Article {
    id
    nid
    gcid
    title
    lead
    cliffhangerTitle
    cliffhangerBulletpoints
    shortTitle
    seoTitle
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
    teaserImage {
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
    metaTwitterCardsTitle
    metaTwitterCardsDescription
    metaCanonicalUrl
    canonicalUri
    publication
    createDate
    publicationDate
    changeDate
    showUpdated
    contentTypeLabel
    preferredUri
    subtypeValue: articleType
    metaKeywords
    socialMediaTitle
    restrictionStatus
    specialInterest
    time2read
    source
    editContentUri
    editRelationUri
    cloneContentUri
    activeMenuTrail {
      count
      edges {
        node {
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
    authors(limit: 10) {
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
    modifyingAuthors(limit: 10) {
      edges {
        node {
          id
          name
          hasProfilePage
          publications
          preferredUri
        }
      }
    }
    commentStatus
    channel {
      ...LegalAdviceChannelFragment
      id
      title
      link
      suppressAds
      relatedBook {
        id
        title
        description
        link {
          label
          path
        }
        teaserImage {
          image {
            file {
              relativeOriginPath
              focalPointY
              focalPointX
              alt
            }
          }
        }
      }
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
            subtypeValue: articleType
            shortTitle
            lead
            changeDate
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
      landingPage {
        id
        sponsorLabel
        sponsor {
          id
          colorCode
          teaserImage {
            id
            link {
              label
              path
              routed
            }
            image {
              id
              file(style: "large", calculateDimensions: true) {
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
      }
    }
    channels {
      ...LegalAdviceChannelFragment
    }
    relatedBook {
      id
      title
      description
      link {
        label
        path
      }
      teaserImage {
        image {
          file {
            relativeOriginPath
            focalPointY
            focalPointX
            alt
          }
        }
      }
    }
    keywords(limit: 100) {
      edges {
        node {
          tid
          label
          preferredUri
        }
      }
    }
    heroImageBody {
      ... on ImageParagraph {
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
      ...VideoParagraphFragment
      ...ImageGalleryHeroFragment
    }
    body(processors: [TextSplit]) {
      ...ParagraphsFragment
    }
    relatedArticles(first: 3) {
      edges {
        node {
          ... on Article {
            id
            subtypeValue: articleType
            title
            shortTitle
            lead
            canonicalUri
            preferredUri
            restrictionStatus
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
            hasVideo
            channel {
              id
              title
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
    recommendations {
      count
      edges {
        node {
          id
          title
          preferredUri
          shortTitle
          subtypeValue: articleType
          toolType
          toolTypeLabel
        }
      }
    }
    attachment(publication: BEO) {
      mimeType
      filename
      source
      systemFilename
    }
    toolType
    toolTypeLabel
  }
  ${videoParagraphFragment}
  ${paragraphsFragment}
  ${imageGalleryHeroFragment}
`;
