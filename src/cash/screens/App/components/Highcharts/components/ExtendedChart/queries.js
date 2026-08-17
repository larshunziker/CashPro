import { gql } from '@apollo/client';

export const GET_FULLQUOTE_PAGE_EXTENDED = gql`
  query getFullquotePageExtended($listingId: String, $path: String)
  @api(name: "graphql-service") {
    getFullquotePage(publication: CASH, listingId: $listingId, path: $path) {
      title
      listingId
      mSymb
      mName
      mCur
      canonicalUrl
      mValor
      tradeable
      hrefBuy
      hrefBuyMobile
      hrefSell
      hrefSellMobile
      currentPrice
      nc2Norm
      nc2PrNorm
      lval
      iNetVperprV
      iNetVperprVPr
    }
  }
`;
