import { gql } from '@apollo/client';

export const contentStageParagraphFragment = gql`
  fragment ContentStageParagraphFragment on ContentStageParagraph {
    anchorId
    contentReference {
      ... on Dossier {
        id
        preferredUri
        title
        lead
      }
    }
    entityQueue {
      items {
        edges {
          node {
            ... on Dossier {
              id
              preferredUri
              title
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
              lead
              shortTitle
              changeDate
              publicationDate
              trackingTeaserImpression
              trackingTeaserClick
              preferredUri
              subtypeValue: advertisingTypeValue
              advertisingTypeLabel
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
              sponsor {
                id
                title
                preferredUri
                teaserImage {
                  id
                  title
                  image {
                    id
                    file(style: "scaleh_120") {
                      id
                      alt
                      relativeOriginPath
                      focalPointX
                      focalPointY
                    }
                  }
                }
              }
              hasVideo
              teaserImage {
                id
                caption
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
            ... on Article {
              id
              title
              lead
              restrictionStatus
              shortTitle
              changeDate
              publicationDate
              preferredUri
              publication
              subtypeValue: articleType
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
              channel {
                id
                title
              }
              hasVideo
              teaserImage {
                id
                caption
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
    }
  }
`;
