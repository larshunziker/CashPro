import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const GET_TRADING_IDEAS_PORTFOLIO = gql`
  query getTradingIdeasPortfolio(
    $publication: PublicationEnum!
    $pathname: String!
  ) @api(name: "graphql-service") {
    portfolio(
      publication: $publication
      limit: 0
      offset: 0
      portfolioKey: "xxx" # portfolioKey is not used when pathname is set (but it is required)
      pathname: $pathname
    ) {
      ... on Portfolio {
        id
        name
        defaultPortfolio
        currency
        portfolioKey
        portfolioSettings {
          id
          portfolioKey
          view
          grouping
          customView
          customOrder
        }
        calculatedFields {
          totalAccountPercent
          totalAccountPercentFees
          totalAccountPlusMinus
          totalAccountPlusMinusFees
          totalActualPrice
          totalPaidFees
          totalPaidPrice
          totalQuantity
          cash
          cashAccountTotal
          instruments {
            ... on Instrument {
              id
              type
              otherAsset
              instrumentKey
              name
              mName
              fullquoteUri
              quantity
              currency
              currentPrice
              paidPrice
              actualPrice
              accountPercent
              accountPlusMinus
              buyingDate
              paidAverage
              perfPercentage
              perfPercentage1w
              perfPercentage4w
              perfPercentage52w
              perfPercentageYTD
              paidAverageWithFeesOrigCurrency
              monitorFontIcon
              chanceFontIcon
              sensitivityFontIcon
              relativePerformance
              kgv
              lastDividend
              dividenYield
              actualPriceOrigCurrency
              accountPlusMinusOrigCurrency
              accountPercentOrigCurrency
              paidOrigCurrency
              market
              fees
              partInPercent
              maturity
              mCur
              isin
              mSymb
              mValor
              lval
              lvalDatetime
              iNetVperprV
              iNetVperprVPr
              bid
              ask
              high
              low
              mTrend
              bidVolume
              bidDatetime
              askVolume
              askDatetime
              open
              lvalVolume
              yldeq
              callbyissuer
              rlife
              interest
              yield
              cyield
              mdur
              pcalc
              perfPercentage12w
              perfPercentage26w
              hi52w
              lo52w
              dayBefore
              strike
              leadMan
              eusipaId
              alertsData {
                upper {
                  listingKey
                  alertKey
                  type
                  value
                  status
                }
                lower {
                  listingKey
                  alertKey
                  type
                  value
                  status
                }
              }
              transactions {
                ... on Transaction {
                  id
                  transactionKey
                  date
                  comment
                  type
                  account
                  quantity
                  rate
                  fees
                  price
                  actualPrice
                  accountPercent
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_TRADING_IDEAS_PAGE = gql`
  query TradingIdeasPage($publication: PublicationEnum, $path: String!)
  @api(name: cms) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        id
        canonical
        preferred
        statusCode
        object {
          ... on LandingPage {
            id
            nid
            gcid
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
            activeMenuTrail {
              edges {
                node {
                  label
                  link
                }
              }
            }
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
            body(processors: [TextSplit]) {
              ...ParagraphsFragment
            }
          }
        }
      }
    }
  }

  ${paragraphsFragment}
`;
