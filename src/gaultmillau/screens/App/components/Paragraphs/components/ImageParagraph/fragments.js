/**
 * @file   imageParagraph graphql fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-10-17
 *
 */

import { gql } from '@apollo/client';

export const imageParagraphFragment = gql`
  fragment ImageParagraphFragment on ImageParagraph {
    id
    anchorId
    title
    caption
    suppressSource
    link {
      path
    }
    image {
      id
      showOriginal
      file(style: "inline_image_1200", calculateDimensions: true) {
        id
        alt
        relativeOriginPath
        focalPointX
        focalPointY
        width
        height
        origin
      }
    }
  }
`;
