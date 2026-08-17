import { gql } from '@apollo/client';
import { keywordDisruptorFragment } from 'Article/components/KeywordDisruptor/fragments';
import { heroFragment } from 'Hero/fragments';
import { videoLoopParagraphFragment } from 'Paragraphs/components/VideoLoopParagraph/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';
import { relatedContentFragment } from 'RelatedContent/fragments';

export const articleFragment = gql`
  fragment ArticleFragment on Article {
    id
    nid
    gcid
    canonicalUri
    metaTitle
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
      id
      caption
      image {
        id
        credit
        file(style: "16x9_560") {
          id
          relativeOriginPath
          focalPointX
          focalPointY
          alt
        }
      }
    }
    metaDescription
    title
    seoTitle
    socialMediaTitle
    lead
    editRelationUri
    cloneContentUri
    editContentUri
    shortTitle
    changeDate
    createDate
    publicationDate
    showUpdated
    preferredUri
    subtypeValue: articleType
    authorPrefix
    metaCanonicalUrl
    metaKeywords
    restrictionStatus
    authors(limit: 3) {
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
            title
            image {
              id
              credit
              file {
                id
                alt
                relativeOriginPath
                focalPointX
                focalPointY
              }
            }
          }
          image: imageParagraph {
            id
            title
            image {
              id
              credit
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

    keywords(limit: 100) {
      ...KeywordDisruptorFragment
    }

    heroImageBody {
      ...HeroFragment

      # TODO: move this fragment into Hero when react-apollo bug is fixed
      ...VideoLoopParagraphFragment
    }

    body {
      ...ParagraphsFragment
    }

    sponsor {
      id
      title
    }

    recommendations(limit: 3) {
      ...RelatedContentFragment
    }
  }

  ${paragraphsFragment}
  ${keywordDisruptorFragment}
  ${heroFragment}
  ${videoLoopParagraphFragment}
  ${relatedContentFragment}
`;
