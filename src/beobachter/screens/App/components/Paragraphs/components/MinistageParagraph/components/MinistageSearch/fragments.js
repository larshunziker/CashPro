import { gql } from '@apollo/client';

export const ministageSearchFragment = gql`
  fragment MinistageSearchFragment on MinistageSearch {
    headline
    subhead
    lead
    sampleQuestions
    searchTypeValue
    searchTypeLabel
    image {
      id
      relativeOriginPath
      focalPointX
      focalPointY
    }
  }
`;
