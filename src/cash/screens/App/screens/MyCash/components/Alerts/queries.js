import { gql } from '@apollo/client';

export const GET_ALERTS_LIST_EXTERNAL = gql`
  query getAlertsListExternalWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
    $cacheBustor: String!
  ) @api(name: "graphql-service") {
    getAlertsList(
      publication: $publication
      limit: $limit
      offset: $offset
      cacheBustor: $cacheBustor
    ) {
      count
      items {
        ... on AlertListItem {
          alertKey
          listingKey
          type
          value
          quote
          field
          expiration
          comment
          brokenTime
          useProfileEmail
          useProfileMobile
          status
          fullquote {
            scGrouped
            title
            fullquoteUri
            mValor
            listingId
          }
        }
      }
    }
  }
`;

export const DELETE_ALERTS = gql`
  mutation DeleteAlertWithCredentials($alertKey: String!) {
    deleteAlerts(alertKeys: $alertKey) {
      status
      message
      error
    }
  }
`;
