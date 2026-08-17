import { gql } from '@apollo/client';

export const legalAdviceChannelItemFragment = gql`
  fragment LegalAdviceChannelFragment on Channel {
    ...LegalAdviceChannelItemFragment
    parent {
      ...LegalAdviceChannelItemFragment
      parent {
        ...LegalAdviceChannelItemFragment
        parent {
          ...LegalAdviceChannelItemFragment
        }
      }
    }
  }

  fragment LegalAdviceChannelItemFragment on Channel {
    tid
    title
    preferredUri
    lead
    shortDescription
    weight
    id
    suppressAds
    __typename
    relatedBook {
      id
      title
      description
      link {
        label
        path
      }
      teaserImage {
        image {
          file {
            relativeOriginPath
            focalPointY
            focalPointX
            alt
          }
        }
      }
    }
  }
`;
