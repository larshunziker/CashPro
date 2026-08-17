/**
 *
 */

import { gql } from '@apollo/client';
import { nativeAdvertisingFragment } from 'NativeAdvertising/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const sponsorFragment = gql`
  fragment SponsorFragment on Sponsor {
    id
    nid
    gcid
    title
    description
    preferredUri
    publication
    editContentUri
    editRelationUri
    cloneContentUri
    metaCanonicalUrl
    activeMenuTrail {
      count
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
        file(style: "16x9_560") {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    body(processors: [TextSplit]) {
      ...ParagraphsFragment
    }

    nativeAdvertising(limit: 5) {
      edges {
        node {
          ... on NativeAdvertising {
            ...NativeAdvertisingFragment
          }
        }
      }
    }
  }

  ${nativeAdvertisingFragment}
`;
