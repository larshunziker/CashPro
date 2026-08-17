import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const sponsorFragment = gql`
  fragment SponsorFragment on Sponsor {
    id
    title
    gcid
    metaTitle
    metaDescription
    metaCanonicalUrl
    metaOgTitle
    metaOgDescription
    description
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
    teaserImage {
      id
      title
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
    body(processors: [TextSplit]) {
      ...ParagraphsFragment
    }

    nativeAdvertising(
      offset: $sponsorOffset
      limit: $sponsorLimit
      sort: $sponsorSortBy
      sortOrder: $sponsorSortOrder
      additionalPublications: []
    ) {
      count
      edges {
        node {
          ... on NativeAdvertising {
            id
            gcid
            title
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            trackingTeaserClick
            trackingTeaserImpression
            trackingDetailImpression
            shortTitle
            preferredUri
            changeDate
            publicationDate(additionalPublications: $additionalPublications)
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
              teaserImage {
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
            teaserImage {
              id
              title
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
            useAutoHyphens
          }
        }
      }
    }
  }
`;
