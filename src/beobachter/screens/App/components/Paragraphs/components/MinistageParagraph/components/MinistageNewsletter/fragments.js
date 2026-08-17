/**
 *
 */

import { gql } from '@apollo/client';

export const ministageNewsletterFragment = gql`
  fragment MinistageNewsletterFragment on MinistageNewsletter {
    headline
    subhead
    lead
    type
    mailchimpList
    mailchimpInterest
    image {
      id
      relativeOriginPath
      focalPointX
      focalPointY
    }
  }
`;
