//
import { gql } from '@apollo/client';

export const ministageSingleAlertTopicFragment = gql`
  fragment MinistageSingleAlertTopicFragment on MinistageSingleAlertTopic {
    headline
    keyword {
      id: tid
      label
      preferredUri
    }
    media {
      file(style: "default") {
        id
        relativeOriginPath
      }
    }
  }
`;
