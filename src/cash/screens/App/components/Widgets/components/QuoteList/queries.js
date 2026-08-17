import { gql } from '@apollo/client';

export const GET_QUOTES_TABLE_DATA = gql`
  query GetQuotesTableDataWithCredentials(
    $listingKeys: String!
    $constituents: Boolean
    $limit: Int
    $offset: Int
    $sortBy: String
    $direction: String
  ) @api(name: "graphql-service") {
    quoteList(
      listingKeys: $listingKeys
      constituents: $constituents
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      direction: $direction
    ) {
      id
      quoteList {
        count
        edges {
          node {
            ... on Instrument {
              id
              scGrouped
              mValor
              isin
              isMarketOpen
              instrumentKey
              listingId: instrumentKey
              type: scGrouped
              name: mName
              mName
              lval
              fullquoteUri
              dayBefore
              dayBeforeDate
              iNetVperprVPr
              iNetVperprV
              monitorFontIcon
              chanceFontIcon
              sensitivityFontIcon
              relativePerformance
              market
              marketId
              mCur
              lvalDatetime
              kgv
              lastDividend
              dividenYield
              paidAverage
              perfPercentage
              perfPercentage1w
              perfPercentage4w
              perfPercentage52w
              perfPercentageYTD
              perfPercentage3Y
              bidVolume
              bid
              ask
              askVolume
              high
              low
              highDate
              lowDate
              hi52w
              hi52wDatetime
              lo52w
              lo52wDatetime
              vol
              offvol
              totvol
              tottur
              pmAvVol
            }
          }
        }
      }
    }
  }
`;
