import { gql } from '@apollo/client';

export const GET_WATCHLISTS = gql`
  query watchlistsWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
  ) @api(name: "graphql-service") {
    watchlists(publication: $publication, limit: $limit, offset: $offset) {
      count
      items {
        ... on Watchlist {
          id
          watchlistKey
          name
          description
          standard
          listingCount
          watchlistSettings {
            id
            watchlistKey
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

export const GET_WATCHLIST_BY_KEY = gql`
  query watchlistWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
    $watchlistKey: String!
  ) @api(name: "graphql-service") {
    watchlist(
      publication: $publication
      limit: $limit
      offset: $offset
      watchlistKey: $watchlistKey
    ) {
      ... on Watchlist {
        id
        name
        standard
        description
        watchlistKey
        watchlistSettings {
          id
          watchlistKey
          view
          grouping
          customView
          customOrder
        }
        instruments {
          ... on Instrument {
            id
            name
            mName
            mShortName
            type: scGrouped
            scGrouped
            instrumentKey
            fullquoteUri
            currentPrice
            actualPrice
            accountPercent
            accountPlusMinus
            perfPercentage
            perfPercentage1w
            perfPercentage4w
            perfPercentage52w
            perfPercentageYTD
            monitorFontIcon
            chanceFontIcon
            sensitivityFontIcon
            relativePerformance
            kgv
            lastDividend
            dividenYield
            market
            marketDescription
            partInPercent
            # lastDividenDatetime
            maturity
            mCur
            isin
            mSymb
            mValor
            lval
            currentValue
            lvalDatetime
            iNetVperprV
            iNetVperprVPr
            isMarketOpen
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
          }
        }
      }
    }
  }
`;

export const GET_WATCHLIST_ALERTS_BY_KEY = gql`
  query watchlistAlertsWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
    $watchlistKey: String!
  ) @api(name: "graphql-service") {
    watchlist(
      publication: $publication
      limit: $limit
      offset: $offset
      watchlistKey: $watchlistKey
    ) {
      ... on Watchlist {
        id
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
`;

export const ADD_INSTRUMENT_TO_WATCHLIST = gql`
  mutation AddInstrumentToWatchlistWithCredentials(
    $watchlistKey: String!
    $instrumentKey: String!
  ) {
    addInstrumentToWatchlist(
      watchlistKey: $watchlistKey
      instrumentKey: $instrumentKey
    ) {
      instrumentKey
      error
    }
  }
`;

export const DELETE_INSTRUMENT_IN_WATCHLIST = gql`
  mutation DeleteInstrumentInWatchlistWithCredentials(
    $watchlistKey: String!
    $instrumentKey: String!
  ) {
    deleteInstrumentInWatchlist(
      watchlistKey: $watchlistKey
      instrumentKey: $instrumentKey
    ) {
      message
      error
    }
  }
`;

export const ADD_WATCHLIST = gql`
  mutation AddWatchlistWithCredentials(
    $name: String!
    $description: String!
    $standard: Boolean!
  ) {
    addWatchlist(name: $name, description: $description, standard: $standard) {
      watchlistKey
      name
      description
      standard
      error
    }
  }
`;

export const EDIT_WATCHLIST = gql`
  mutation EditWatchlistWithCredentials(
    $watchlistKey: String!
    $name: String!
    $description: String!
    $standard: Boolean!
  ) {
    editWatchlist(
      watchlistKey: $watchlistKey
      name: $name
      description: $description
      standard: $standard
    ) {
      watchlistKey
      name
      description
      standard
      error
    }
  }
`;

export const DELETE_WATCHLIST = gql`
  mutation DeleteWatchlistWithCredentials($watchlistKey: String!) {
    deleteWatchlist(watchlistKey: $watchlistKey) {
      message
      error
    }
  }
`;
