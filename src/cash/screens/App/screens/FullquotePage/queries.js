import { gql } from '@apollo/client';
import { paragraphsFragment } from '../../components/Paragraphs/fragments';

export const GET_FULLQUOTE_PAGE = gql`
  query getFullquoteRouteByPath(
    $fullquoteSubtype: String!
    $fullquoteSubPage: String!
  ) @api(name: cms) {
    environment(publication: CASH) {
      routeByPathSubPage: routeByPath(path: $fullquoteSubPage) {
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
      routeByPath(path: $fullquoteSubtype) {
        id
        canonical
        preferred
        statusCode
        object {
          ... on LandingPage {
            id
            nid
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

export const GET_FULLQUOTE_SERVICE_PAGE = gql`
  query getFullquotePage($path: String) @api(name: "graphql-service") {
    getFullquotePage(publication: CASH, path: $path) {
      title
      subtitle
      mSymb
      mIsin
      mMarketId
      mCurrencyId
      issuerName
      issuerShort
      listingId
      compfullname
      mCur
      mMarket
      mMarketDescription
      mName
      scGrouped
      sec
      secId
      canonicalUrl
      redirectUri
      mValor
      currentPrice # LVAL_NORM
      nc2Norm
      nc2PrNorm
      lval
      iNetVperprV
      iNetVperprVPr
      tradeType
      hrefBuy
      currencyTradingbasedShort
    }
  }
`;
