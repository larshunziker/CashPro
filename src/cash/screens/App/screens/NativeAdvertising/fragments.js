import { gql } from '@apollo/client';
import { heroFragment } from 'Hero/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const nativeAdvertisingFragment = gql`
  fragment NativeAdvertisingFragment on NativeAdvertising {
    id
    gcid
    nid
    title
    lead
    metaTitle
    seoTitle
    publication
    socialMediaTitle
    metaCanonicalUrl
    showUpdated
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
    subtypeValue: advertisingTypeValue
    advertisingTypeLabel
    editContentUri
    editRelationUri
    restrictionStatus
    source
    authorPrefix
    body {
      ...ParagraphsFragment
    }
    heroImageBody {
      ...HeroFragment
    }
    relatedArticles(limit: 3) {
      edges {
        node {
          ... on Article {
            id
            gcid
            title
            shortTitle
            preferredUri
            restrictionStatus
            lead
            changeDate
            publicationDate
            authorPrefix
            subtypeValue: articleType
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
          ... on NativeAdvertising {
            id
            gcid
            title
            shortTitle
            lead
            preferredUri
            publicationDate
            changeDate
            showUpdated
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            trackingTeaserClick
            trackingTeaserImpression
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
            }
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
    trackingDetailImpression
    shortTitle
    canonicalUri
    preferredUri
    changeDate
    createDate
    publicationDate
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
      articles(limit: 6) {
        edges {
          node {
            id
            gcid
            title
            lead
            subtypeValue: articleType
            shortTitle
            changeDate
            publicationDate
            restrictionStatus
            showUpdated
            preferredUri
            authorPrefix
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
          }
        }
      }
    }
    sponsor {
      colorCode
      preferredUri
      prefix
      id
      title
      hasProfilePage
      teaserImage {
        id
        link {
          path
        }
        title
        image {
          id
          file(style: "scaleh_120", calculateDimensions: true) {
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
    activeMenuTrail {
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
        file(style: "large", calculateDimensions: true) {
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
  }

  ${paragraphsFragment}
  ${heroFragment}
`;
