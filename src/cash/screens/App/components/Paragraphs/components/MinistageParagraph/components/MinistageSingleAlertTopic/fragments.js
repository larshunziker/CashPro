import { gql } from '@apollo/client';

export const ministageSingleAlertTopicFragment = gql`
  fragment MinistageSingleAlertTopicFragment on MinistageSingleAlertTopic {
    headline
    keyword {
      id: tid
      label
    }
    person {
      id: nid
      label: title
      preferredUri
    }
    organization {
      id: nid
      label: title
      preferredUri
    }
    media {
      file(style: "default") {
        id
        relativeOriginPath
        focalPointX
        focalPointY
      }
    }
  }
`;
