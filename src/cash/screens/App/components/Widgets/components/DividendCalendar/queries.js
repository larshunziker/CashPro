import { gql } from '@apollo/client';

export const GET_DIVIDEND_CALENDAR = gql`
  query GetDividendCalendar($limit: Float, $offset: Float)
  @api(name: "graphql-service") {
    integration {
      edi {
        dividendCalendar(limit: $limit, offset: $offset) {
          count
          data {
            ... on CalendarItem {
              isin
              exdt
              localcode
              paydt
              grossdividend
              instrumentKey
              logo
              years {
                ... on Year {
                  year
                  grossDividend
                }
              }
              tradeableData {
                listing {
                  links {
                    hrefBuy
                    hrefSell
                    hrefMobileSell
                    hrefMobileBuy
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_QUOTES_DIVIDEND_CALENDAR = gql`
  query GetQuotesDividendCalendarWithCredentials($listingKeys: String!)
  @api(name: "graphql-service") {
    quoteList(listingKeys: $listingKeys) {
      id
      quoteList {
        count
        edges {
          node {
            ... on Instrument {
              id
              isin
              mName
              title
              fullquoteUri
              instrumentKey
              yldeq
              lval
              mCur
            }
          }
        }
      }
    }
  }
`;
