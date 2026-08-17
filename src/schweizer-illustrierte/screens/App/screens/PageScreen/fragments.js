import { gql } from '@apollo/client';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const pageScreenFragment = gql`
  fragment PageFragment on Page {
    id
    nid
    gcid
    title
    editContentUri
    editRelationUri
    cloneContentUri
    lead
    shortTitle
    subtypeValue
    preferredUri
    metaTitle
    metaOgTitle
    metaDescription
    metaOgDescription
    metaCanonicalUrl
    isRobotsIndexingEnabled
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
          id
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
