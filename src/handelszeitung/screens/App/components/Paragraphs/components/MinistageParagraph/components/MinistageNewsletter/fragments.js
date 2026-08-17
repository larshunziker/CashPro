import { gql } from '@apollo/client';

export const ministageNewsletterFragment = gql`
  fragment MinistageNewsletterFragment on MinistageNewsletter {
    headline
    subhead
    lead
    type
    mailchimpList
    mailchimpInterest
    mailchimpAccountId
    image(style: "teaser_1_1") {
      id
      width
      height
      relativeOriginPath
      focalPointX
      focalPointY
    }
  }
`;
