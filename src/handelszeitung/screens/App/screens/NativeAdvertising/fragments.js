/**
 * @file   native advertising graphql fragments
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-11-15
 *
 */

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
    cloneContentUri
    restrictionStatus
    authorPrefix
    source
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
            authorPrefix
            changeDate
            publicationDate
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
            relatedPersons(limit: 2) {
              edges {
                node {
                  title
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
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            trackingTeaserClick
            trackingTeaserImpression
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
            relatedPersons(limit: 2) {
              edges {
                node {
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
        link {
          path
        }
        id
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
