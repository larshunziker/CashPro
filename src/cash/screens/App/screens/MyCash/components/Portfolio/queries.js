import { gql } from '@apollo/client';

export const GET_PORTFOLIOS = gql`
  query portfoliosWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
  ) @api(name: "graphql-service") {
    portfolios(publication: $publication, limit: $limit, offset: $offset) {
      count
      items {
        ... on Portfolio {
          id
          portfolioKey
          name
          currency
          instrumentCount
          defaultPortfolio
          portfolioSettings {
            id
            portfolioKey
            view
            grouping
            customView
            customOrder
          }
        }
      }
    }
  }
`;

export const GET_PORTFOLIO_BY_KEY = gql`
  query portfolioWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
    $portfolioKey: String!
    $withTransaction: Boolean!
  ) @api(name: "graphql-service") {
    portfolio(
      publication: $publication
      limit: $limit
      offset: $offset
      portfolioKey: $portfolioKey
    ) {
      ... on Portfolio {
        id
        name
        defaultPortfolio
        currency
        portfolioKey
        instrumentCount
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
          totalQuantity
          cash
          cashAccountTotal
          instruments {
            ... on Instrument {
              id
              type
              otherAsset
              instrumentKey
              mShortName
              name
              mName
              fullquoteUri
              quantity
              isMarketOpen
              currency
              currentPrice
              paidPrice
              actualPrice
              accountPercent
              accountPlusMinus
              buyingDate @include(if: $withTransaction)
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
              marketDescription
              fees
              partInPercent
              lastDividendDatetime
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
              pricingQuotationId
              pyClose
              perfPercentage3Y
              highDate
              lowDate
              perf1w
              perf4w
              perf12w
              perf26w
              perf52w
              hi52wDatetime
              lo52wDatetime
              yHi
              yLo
              yHiDatetime
              yLoDatetime
              totvol
              tottur
              avVol12w
              vol
              offvol
              pmAvVol
              tur
              offtur
              scGrouped
            }
          }
        }
      }
    }
  }
`;

export const GET_PORTFOLIO_ALERTS_BY_KEY = gql`
  query portfolioAlertsWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
    $portfolioKey: String!
  ) @api(name: "graphql-service") {
    portfolio(
      publication: $publication
      limit: $limit
      offset: $offset
      portfolioKey: $portfolioKey
    ) {
      ... on Portfolio {
        id
        calculatedFields {
          instruments {
            ... on Instrument {
              id
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
            }
          }
        }
      }
    }
  }
`;

export const DELETE_INSTRUMENT = gql`
  mutation DeleteInstrumentWithCredentials(
    $portfolioKey: String!
    $instrumentKey: String!
    $isOtherAsset: Boolean
  ) {
    deleteInstrument(
      portfolioKey: $portfolioKey
      instrumentKey: $instrumentKey
      isOtherAsset: $isOtherAsset
    ) {
      message
      error
    }
  }
`;

export const ADD_PORTFOLIO = gql`
  mutation AddPortfolioWithCredentials(
    $name: String!
    $currency: String!
    $defaultPortfolio: Boolean!
  ) {
    addPortfolio(
      name: $name
      currency: $currency
      defaultPortfolio: $defaultPortfolio
    ) {
      portfolioKey
      name
      currency
      defaultPortfolio
      error
    }
  }
`;

export const EDIT_PORTFOLIO = gql`
  mutation EditPortfolioWithCredentials(
    $portfolioKey: String!
    $name: String!
    $defaultPortfolio: Boolean!
  ) {
    editPortfolio(
      portfolioKey: $portfolioKey
      name: $name
      defaultPortfolio: $defaultPortfolio
    ) {
      portfolioKey
      name
      currency
      defaultPortfolio
      error
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolioWithCredentials($portfolioKey: String!) {
    deletePortfolio(portfolioKey: $portfolioKey) {
      message
      error
    }
  }
`;
