import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const landingPageFragment = gql`
  fragment LandingPageFragment on LandingPage {
    id
    nid
    gcid
    paragraphsSubsetSize
    title
    metaTitle
    metaDescription
    metaOgTitle
    metaOgDescription
    metaCanonicalUrl
    editContentUri
    editRelationUri
    cloneContentUri
    lead
    preferredUri
    activeMenuTrail {
      edges {
        node {
          id
          label
          link
        }
      }
    }
    channel {
      id
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
    }
    teaserImage {
      id
      image {
        id
        file(style: "16x9_1130") {
          id
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    grid(limit: $landingPageGridSize, offset: $landingPageGridOffset) {
      count
      edges {
        node {
          ... on LandingPage {
            id
            title
            lead
            shortTitle
            preferredUri
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
            channel {
              id
              sponsor {
                id
                title
                colorCode
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
              }
              channelType
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
            }
            useAutoHyphens
          }
          ... on Topic {
            id
            gcid
            preferredUri
            title
            lead: description
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
          }
        }
      }
    }
    body {
      ...ParagraphsFragment
    }
  }

  ${paragraphsFragment}
`;
