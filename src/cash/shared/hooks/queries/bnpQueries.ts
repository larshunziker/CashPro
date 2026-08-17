import { gql } from '@apollo/client';

export const GET_BNP_FULLQUOTE_SERVICE_PAGE = gql`
  query getBNPFullquotePage($path: String) @api(name: "graphql-service") {
    getFullquotePage(publication: CASH, path: $path) {
      id
      title
      subtitle
      mIsin
      mMarketId
      mCurrencyId
      mName
      scGrouped
      mValor
      componentStrike_1Price
      componentStrike_2Price
      componentInitialFixingCurrencyShort
      ratio
      class2Strike1Alias
      class2Strike2Alias
      numberOfUnderlyings
      currencyTradingbasedShort
    }
  }
`;

export const GET_BNP_DERIVATIVES = gql`
  query GetBNPDerivative($isin: String!) @api(name: "graphql-service") {
    integration {
      bnp {
        derivate(isin: $isin) {
          bid
          ask
          bidQuantity
          askQuantity
          currentLeverage
          dailyPerformancePercentage
          reference
          __typename
        }
      }
    }
  }
`;
