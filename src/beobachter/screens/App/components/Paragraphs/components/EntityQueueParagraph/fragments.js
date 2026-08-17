/**
 *
 */

import { gql } from '@apollo/client';
import { pianoTemplateParagraphFragment } from '../PianoTemplateParagraph/fragments';
import { embedParagraphFragment } from '../EmbedParagraph/fragments';
import { inputFormParagraphFragment } from '../WebformParagraph/fragments';
import { teaserStageParagraphFragment } from '../TeaserStageParagraph/fragments';

export const entityQueueParagraphFragment = gql`
  fragment EntityQueueParagraphFragment on EntityQueueParagraph {
    anchorId
    title
    style
    landingPage {
      id
      title
      preferredUri
    }
    entityQueue {
      items {
        edges {
          node {
            ... on ExplainingArticle {
              id
              title
              shortTitle
              preferredUri
              changeDate: changedDate
              publicationDate
              hasVideo
              channel {
                id
                title
              }
              authors(first: 10) {
                edges {
                  node {
                    id
                    name
                    headline
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
            }
            ...ContentBoxFragment

            ... on NativeAdvertising {
              id
              gcid
              preferredUri
              title
              lead
              shortTitle
              hasVideo
              changeDate
              publicationDate
              trackingTeaserImpression
              trackingTeaserClick
              revisionDate
              subtypeValue: advertisingTypeValue
              advertisingTypeLabel
              restrictionStatus
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
              link {
                path
                label
              }
              authors(first: 10) {
                edges {
                  node {
                    id
                    name
                    headline
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
              sponsor {
                id
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
                logoStandalone {
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
              useAutoHyphens
            }

            ... on Video {
              id
              preferredUri
              shortTitle
              title
              lead
              brightcoveId
              publicationDate
              restrictionStatus
              changeDate
              caption
              credit
              teaserImage {
                id
                format
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

            ... on Article {
              id
              title
              shortTitle
              lead
              changeDate
              publicationDate
              revisionDate
              preferredUri
              subtypeValue: articleType
              hasVideo
              restrictionStatus
              useNativeAdvertising
              channel {
                id
                title
                landingPage {
                  id
                  sponsor {
                    id
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
                    logoStandalone {
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
              authors(first: 10) {
                edges {
                  node {
                    id
                    name
                    headline
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
          }
        }
      }
    }
    annexWidget {
      id
      ...EmbedParagraphFragment
      ...InputFormParagraphFragment
      ...PianoTemplateParagraphFragment
      ...ContentParagraphFragment
      ...TeaserStageParagraphFragment
    }
  }
  fragment ContentBoxFragment on ContentBox {
    id
    title
    contentSourceValue
    useNativeAdvertising
    items {
      edges {
        node {
          ... on Article {
            id
            restrictionStatus
            title
            preferredUri
            subtypeValue: articleType
            shortTitle
            useAutoHyphens
            badgeLabel
            badgeColor
            teaserImage {
              id
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
          }
          ... on NativeAdvertising {
            id
            restrictionStatus
            title
            preferredUri
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            shortTitle
            useAutoHyphens
            teaserImage {
              id
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
          }
        }
      }
    }
  }
  fragment ContentParagraphFragment on ContentParagraph {
    contentReference {
      ...ContentBoxFragment
    }
  }
  ${embedParagraphFragment}
  ${inputFormParagraphFragment}
  ${pianoTemplateParagraphFragment}
  ${teaserStageParagraphFragment}
`;
