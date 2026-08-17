import { gql } from '@apollo/client';

export const ministageTeaserFragment = gql`
  fragment MinistageTeaserFragment on MinistageTeaser {
    headline
    subhead
    lead
    image(style: "large") {
      id
      width
      height
      relativeOriginPath
      focalPointX
      focalPointY
    }
    link {
      label
      path
      routed
    }
  }
`;
