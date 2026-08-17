import { gql } from '@apollo/client';

export const organizationFragment = gql`
  fragment OrganizationFragment on Organization {
    nid
    gcid
    id
    title
    publication
    commercialSector {
      title
      branch(limit: 1) {
        edges {
          node {
            nid
            title
            preferredUri
          }
        }
      }
    }
    foundationDate
    city
    legalForm
    description
    metaTitle
    metaDescription
    preferredUri
    metaCanonicalUrl
    editContentUri
    editRelationUri
    canonicalUri
    metaOgTitle
    metaOgDescription
    moneyhousePreferredUri
    activeMenuTrail {
      edges {
        node {
          label
          link
        }
      }
    }
    organizationPositions(limit: 10) {
      edges {
        node {
          organization {
            title
            preferredUri
          }
          position
          person {
            id
            title
            createDate
            hasArticles
            preferredUri
            teaserImage {
              id
              image {
                id
                file {
                  id
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
    organizationArticles(
      offset: $organizationOffset
      limit: $organizationLimit
      sort: $organizationSortBy
      sortOrder: $organizationSortOrder
    ) {
      count
      edges {
        node {
          id
          title
          publication
          lead
          shortTitle
          changeDate
          publicationDate
          preferredUri
          subtypeValue: articleType
          hasVideo
          restrictionStatus
          teaserImage {
            id
            image {
              id
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
        }
      }
    }
  }
`;
