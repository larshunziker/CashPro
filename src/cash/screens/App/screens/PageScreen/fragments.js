import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const pageScreenFragment = gql`
  fragment PageScreenFragment on Page {
    nid
    gcid
    id
    title
    lead
    subtypeValue
    shortTitle
    metaTitle
    metaOgTitle
    metaDescription
    metaOgDescription
    metaCanonicalUrl
    canonicalUri
    editContentUri
    editRelationUri
    cloneContentUri
    publication
    preferredUri
    restrictionStatus
    isRobotsIndexingEnabled
    channel {
      id
      suppressAds
      title
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
      caption
      image {
        id
        credit
        file(style: "16x9_560", calculateDimensions: true) {
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
    body {
      ...ParagraphsFragment
    }
  }

  ${paragraphsFragment}
`;
