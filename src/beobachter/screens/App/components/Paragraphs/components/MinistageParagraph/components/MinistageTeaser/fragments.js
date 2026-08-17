/**
 *
 */

import { gql } from '@apollo/client';

export default gql`
  fragment MinistageTeaserFragment on MinistageTeaser {
    headline
    subhead
    lead
    image {
      id
      alt
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
