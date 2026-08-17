import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const pageScreenFragment = gql`
  fragment PageScreenFragment on Page {
    nid
    id
    title
    lead
    metaTitle
    metaOgTitle
    editRelationUri
    cloneContentUri
    editContentUri
    metaDescription
    metaOgDescription
    metaCanonicalUrl
    pageType
    isRobotsIndexingEnabled
    teaserImage {
      id
      caption
      image {
        id
        file(style: "16x9_560") {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    body {
      ...ParagraphsFragment
    }
  }
  ${paragraphsFragment}
`;
