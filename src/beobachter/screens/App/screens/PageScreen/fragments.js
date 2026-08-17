/**
 *
 */

import { gql } from '@apollo/client';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const pageScreenFragment = gql`
  fragment PageFragment on Page {
    id
    nid
    gcid
    title
    lead
    subtypeValue
    shortTitle
    preferredUri
    metaTitle
    metaOgTitle
    metaDescription
    metaOgDescription
    metaCanonicalUrl
    editContentUri
    editRelationUri
    cloneContentUri
    isRobotsIndexingEnabled
    restrictionStatus
    channel {
      id
      title
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
    createDate
    metaKeywords
    heroImageBody {
      ...ImageParagraphFragment
    }
    activeMenuTrail {
      count
      edges {
        node {
          label
          link
        }
      }
    }
    body {
      ...ParagraphsFragment
    }
  }

  ${paragraphsFragment}
  ${imageParagraphFragment}
`;
