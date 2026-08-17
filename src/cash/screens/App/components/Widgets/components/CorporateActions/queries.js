import { gql } from '@apollo/client';

export const GET_CORPORATE_ACTIONS = gql`
  query GetCorporateActions(
    $operationalMic: String!
    $localCode: String!
    $isin: String!
    $eventCD: [String!]
    $fromDate: String!
    $toDate: String!
  ) @api(name: "graphql-service") {
    integration {
      id
      edi {
        corporateAction(
          operationalMic: $operationalMic
          localCode: $localCode
          isin: $isin
          eventCD: $eventCD
          fromDate: $fromDate
          toDate: $toDate
        ) {
          jsondata {
            eventid
            exdt
            paydt
            grossdividend
            declarationdt
            ratecurencd
            meetingdt
            eventsubtypecd
            eventcd
            evtchangedt
            effectivedt
            cashback
            ntschangedt
          }
        }
      }
    }
  }
`;
