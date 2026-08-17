import { gql } from '@apollo/client';

export const teaserStageParagraphFragment = gql`
  fragment TeaserStageParagraphFragment on TeaserStageParagraph {
    anchorId
    id
    style
    termReference {
      ... on Channel {
        id
        title
        landingPage {
          id
          preferredUri
        }
      }
      ... on Keyword {
        id
        label
        preferredUri
      }
    }
    title
    entities(
      filter: [
        Article
        ExplainingArticle
        LandingPage
        Page
        NativeAdvertising
        Video
        Teaser
      ]
      additionalPublications: [GM, HZ, BEO]
    ) {
      count
      edges {
        node {
          ... on Article {
            id
            authorPrefix
            authors {
              edges {
                node {
                  id
                  name
                }
              }
            }
            title
            shortTitle
            lead
            changeDate
            publicationDate
            showUpdated
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            subtypeValue: articleType
            hasVideo
            restrictionStatus
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
          ... on ExplainingArticle {
            id
            title
            shortTitle
            publicationDate
            preferredUri(additionalPublications: [GM, HZ, BEO])
            changeDate: changedDate
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
          ... on LandingPage {
            id
            title
            lead
            changeDate: changedDate
            hasVideo
            restrictionStatus
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publicationDate
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
            authorPrefix
            authors {
              edges {
                node {
                  id
                  name
                }
              }
            }
            title
            shortTitle
            lead
            hasVideo
            publicationDate
            trackingTeaserImpression
            trackingTeaserClick
            subtypeValue: advertisingTypeValue
            restrictionStatus
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
            link {
              path
              label
            }
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
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
            sponsor {
              id
              title
            }
            useAutoHyphens
          }
          ... on Page {
            id
            title
            lead
            changeDate: changedDate
            hasVideo
            restrictionStatus
            preferredUri(additionalPublications: [GM, HZ, BEO])
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
            preferredUri(additionalPublications: [GM, HZ, BEO])
            publication(additionalPublications: [GM, HZ, BEO])
            title
            brightcoveId
            publicationDate
            changeDate
            caption
            credit
            lead
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
          ... on Teaser {
            id
            link {
              path
            }
            trackingEnabled
            trackingTeaserImpression
            trackingTeaserClick
            title
            shortTitle
            lead
            teaserImage {
              caption
              image {
                id
                file(style: "large") {
                  id
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
`;
