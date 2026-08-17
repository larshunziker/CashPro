import { gql } from '@apollo/client';

export const GET_QUOTE_ALTERNATIVE_MARKETS = gql`
  query GetQuoteAlternativeMarkets(
    $publication: PublicationEnum!
    $valor: String!
    $scGrouped: String!
  ) @api(name: "graphql-service") {
    getInstrumentsByValor(
      publication: $publication
      valor: $valor
      scGrouped: $scGrouped
    ) {
      items {
        ... on AlternativeMarketQuote {
          mCur
          lval
          mName
          market
          tur
          lvalDatetime
          iNetVperprVPr
          fullquoteUri
        }
      }
    }
  }
`;
