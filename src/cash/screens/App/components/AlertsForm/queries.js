import { gql } from '@apollo/client';
import { entityQueueParagraphFragment } from '../Paragraphs/components/EntityQueueParagraph/fragments';

export const ADD_ALERT = gql`
  mutation SubmitAlertWithCredentials(
    $listingKey: String!
    $type: String!
    $value: String!
    $expiration: String!
    $useProfileMobile: Boolean!
    $useProfileEmail: Boolean!
    $comment: String!
  ) {
    addAlert(
      listingKey: $listingKey
      type: $type
      value: $value
      expiration: $expiration
      useProfileMobile: $useProfileMobile
      useProfileEmail: $useProfileEmail
      comment: $comment
    ) {
      status
      message
      error
    }
  }
`;

export const EDIT_ALERT = gql`
  mutation updateAlertWithCredentials(
    $alertKey: String!
    $listingKey: String!
    $type: String!
    $value: String!
    $expiration: String!
    $useProfileMobile: Boolean!
    $useProfileEmail: Boolean!
    $comment: String!
  ) {
    updateAlert(
      alertKey: $alertKey
      listingKey: $listingKey
      type: $type
      value: $value
      expiration: $expiration
      useProfileMobile: $useProfileMobile
      useProfileEmail: $useProfileEmail
      comment: $comment
    ) {
      status
      message
      error
    }
  }
`;

export const GET_FULLQUOTE_ALERTS_PAGE = gql`
  query getFullquoteAlertsRouteByPath(
    $fullquoteSubtype: String!
    $fullquoteSubPage: String!
  ) @api(name: cms) {
    environment(publication: CASH) {
      routeByPathSubPage: routeByPath(path: $fullquoteSubPage) {
        id
        canonical
        preferred
        statusCode
        object {
          ... on LandingPage {
            id
            nid
            title
            preferredUri
            seoTitle
            metaTitle
            metaOgTitle
            metaDescription
            metaOgDescription
            canonicalUri
            editContentUri
            editRelationUri
            cloneContentUri
            shortTitle
            subtypeValue
            channel {
              id
              title
              suppressAds
            }
            publication
            restrictionStatus
            sponsor {
              id
              title
            }
            body(processors: [TextSplit], limit: 1) {
              ...EntityQueueParagraphFragment
            }
          }
        }
      }
      routeByPath(path: $fullquoteSubtype) {
        id
        canonical
        preferred
        statusCode
        object {
          ... on LandingPage {
            id
            nid
            title
            preferredUri
            seoTitle
            metaTitle
            metaOgTitle
            metaDescription
            metaOgDescription
            canonicalUri
            editContentUri
            editRelationUri
            cloneContentUri
            shortTitle
            subtypeValue
            channel {
              id
              title
              suppressAds
            }
            publication
            restrictionStatus
            sponsor {
              id
              title
            }
            body(processors: [TextSplit], limit: 1) {
              ...EntityQueueParagraphFragment
            }
          }
        }
      }
    }
  }

  ${entityQueueParagraphFragment}
`;

export const GET_ALERT_BY_ALERTKEY = gql`
  query getAlertByAlertKeyWithCredentials($alertKey: String!)
  @api(name: "graphql-service") {
    getAlertByAlertKey(alertKey: $alertKey) {
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
          iNetVperprV
          iNetVperprVPr
        }
      }
    }
  }
`;
