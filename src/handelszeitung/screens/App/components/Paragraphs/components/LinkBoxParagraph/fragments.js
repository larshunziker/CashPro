/**
 * @file   linkbox paragraph fragments
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-05-13 11:16:49
 *
 */

import { gql } from '@apollo/client';

export const linkBoxParagraphFragment = gql`
  fragment LinkBoxParagraphFragment on LinkBoxParagraph {
    anchorId
    title
    links(limit: 100) {
      edges {
        node {
          label
          path
          routed
        }
      }
    }
  }
`;
