import { gql } from '@apollo/client';

export const GET_CMS_SEARCH_PAGE_CATEGORY = gql`
  query SearchCategoryCms(
    $query: String!
    $limit: Int
    $offset: Int
    $sort: SearchOrderByField
  ) @api(name: cms) {
    environment(publication: CASH) {
      globalSearch(
        search: $query
        limit: $limit
        offset: $offset
        sort: $sort
        content_types: [Article]
        article_type: "news"
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              gcid
              publication
              preferredUri
              title
              shortTitle
              publicationDate
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
export const GET_SEARCH_PAGE_CATEGORY = gql`
  query SearchCategoryWithCredentialsExternal(
    $query: String!
    $category: TextSearchCategory!
    $limit: Int
    $offset: Int
  ) @api(name: "graphql-service") {
    wikifolio: integrations(
      publication: CASH
      type: "wikifolio-search"
      query: $query
      limit: $limit
      offset: $offset
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
      limit: $limit
      offset: $offset
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

    textSearchAll: textSearch(publication: CASH, search: $query) {
      index {
        count
      }
      equity {
        count
      }
      fund {
        count
      }
      derivative {
        count
      }
      diverse {
        count
      }
      bond {
        count
      }
      cryptoCurrency {
        count
      }
    }

    textSearch(
      publication: CASH
      search: $query
      limit: $limit
      offset: $offset
      category: $category
    ) {
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
      cryptoCurrency {
        count
        items {
          ... on CryptoCurrency {
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
