import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const sponsorFragment = gql`
  fragment SponsorFragment on Sponsor {
    id
    title
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
  }

  ${paragraphsFragment}
`;
