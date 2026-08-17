/**
 * @file   Ranking List Paragraph Fragments
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-09-23
 *
 */

import { gql } from '@apollo/client';

export const rankingListParagraphFragment = gql`
  fragment RankingListParagraphFragment on RankingListParagraph {
    anchorId
    rankings {
      edges {
        node {
          id
          title
          rankingType
          preferredUri
          teaserImage {
            id
            image {
              id
              file(style: "large") {
                id
                alt
                relativeOriginPath
                focalPointX
                focalPointY
              }
            }
          }
        }
      }
    }
  }
`;
