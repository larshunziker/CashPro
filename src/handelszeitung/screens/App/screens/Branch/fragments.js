import { gql } from '@apollo/client';

export const branchFragment = gql`
  fragment BranchFragment on Branch {
    nid
    id
    gcid
    title
    description
    editContentUri
    editRelationUri
    cloneContentUri
    metaTitle
    metaOgTitle
    metaDescription
    metaOgDescription
    metaCanonicalUrl
    canonicalUri
    publication
    preferredUri
    activeMenuTrail {
      edges {
        node {
          label
          link
        }
      }
    }
    relatedOrganizations(
      offset: 0
      limit: 6
      dateRangeStart: "-1200 days"
      dateRangeEnd: "now"
    ) {
      count
      edges {
        node {
          id
          title
          preferredUri
        }
      }
    }
    relatedPersons(
      offset: 0
      limit: 6
      dateRangeStart: "-30 days"
      dateRangeEnd: "now"
    ) {
      count
      edges {
        node {
          id
          title
          createDate
          changeDate: changedDate
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
    nativeAdvertisings {
      count
      edges {
        node {
          id
          preferredUri
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
          title
          publication
          lead
          shortTitle
          createDate
          changeDate
          showUpdated
          teaserImage {
            id
            caption
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
      }
    }
    relatedArticles(limit: $branchPageSize, offset: $branchOffset) {
      count
      edges {
        node {
          ... on Article {
            id
            title
            publication
            restrictionStatus
            lead
            shortTitle
            createDate
            changeDate
            publicationDate
            showUpdated
            preferredUri
            subtypeValue: articleType
            hasVideo
            teaserImage {
              id
              caption
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
            channel {
              id
              title
            }
            authorPrefix
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
            relatedPersons {
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
            useAutoHyphens
          }
          ... on NativeAdvertising {
            id
            gcid
            title
            shortTitle
            lead
            preferredUri
            createDate
            changeDate
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
  }
`;
