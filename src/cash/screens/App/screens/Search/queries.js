import { gql } from '@apollo/client';

export const GET_CMS_SEARCH_PAGE_ALL = gql`
  query SearchCmsContent($query: String!) @api(name: cms) {
    environment(publication: CASH) {
      globalSearch(
        search: $query
        limit: 20
        content_types: [Article, NativeAdvertising]
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              shortTitle
              title
              publicationDate
              preferredUri
              useAutoHyphens
            }
            ... on NativeAdvertising {
              id
              shortTitle
              title
              publicationDate
              advertisingType
              preferredUri
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;

export const GET_SEARCH_PAGE_ALL = gql`
  query SearchWithCredentialsExternalContent($query: String!, $limit: Int)
  @api(name: "graphql-service") {
    wikifolio: integrations(
      publication: CASH
      type: "wikifolio-search"
      query: $query
      limit: 5
    ) {
      count
      items {
        ... on WikiFolio {
          traderName
          fullquoteLink
          shortDescription
          currency
          isin
        }
      }
    }

    newEmission: integrations(
      publication: CASH
      type: "newEmission-search"
      query: $query
      limit: 5
    ) {
      count
      items {
        ... on NewEmission {
          title
          issuerShort
          issuerName
          class2NameD
          attributeName
          currencyTradingbasedShort
          isin
          termsheet
          fullquotePath
          subscriptionEndDate
          name
          mName
          description
        }
      }
    }

    textSearch(publication: CASH, search: $query, limit: $limit) {
      index {
        count
        items {
          ... on Index {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            valor
            link
            listingId
          }
        }
      }
      equity {
        count
        items {
          ... on Equity {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            valor
            link
            listingId
          }
        }
      }
      fund {
        count
        items {
          ... on Fund {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            valor
            link
            listingId
          }
        }
      }
      derivative {
        count
        items {
          ... on Derivative {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            symbol
            link
            listingId
            termsheet
          }
        }
      }
      cryptoCurrency {
        count
        items {
          ... on CryptoCurrency {
            link
            name
            mName
            valor
            marketId
            type
            currency
            price
            priceTimestamp
            market
            marketDescription
            listingId
          }
        }
      }
      diverse {
        count
        items {
          ... on Diverse {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            valor
            link
            listingId
          }
        }
      }
      bond {
        count
        items {
          ... on Bond {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            valor
            link
            listingId
          }
        }
      }
    }
  }
`;
