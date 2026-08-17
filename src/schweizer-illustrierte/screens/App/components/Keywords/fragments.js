/**
 * @file   keywords graphql fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-06-21
 *
 */

import { gql } from '@apollo/client';

export const keywordsFragment = gql`
  fragment KeywordsFragment on KeywordConnection {
    edges {
      node {
        id
        tid
        label
        preferredUri
      }
    }
  }
`;
