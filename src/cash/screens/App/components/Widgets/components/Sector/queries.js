import { gql } from '@apollo/client';

export const GET_SECTOR_QUOTES = gql`
  query getSectorQuotes($publication: PublicationEnum!, $secId: String!)
  @api(name: "graphql-service") {
    getSectorQuotes(publication: $publication, secId: $secId) {
      id
      sectorQuotes {
        count
        edges {
          node {
            __typename
            ... on Instrument {
              id
              instrumentKey
              mName
              market
              country
              marketCapitalisation
              mCur
              fullquoteUri
            }
          }
        }
      }
    }
  }
`;
