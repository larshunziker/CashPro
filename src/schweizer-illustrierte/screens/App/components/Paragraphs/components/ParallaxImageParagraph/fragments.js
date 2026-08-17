/**
 * @file    Parallax image paragraph fragments
 * @author  Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date    2019-01-25
 *
 */

import { gql } from '@apollo/client';

export const parallaxImageParagraphFragment = gql`
  fragment ParallaxImageParagraphFragment on ParallaxImageParagraph {
    id
    suppressSource
    image {
      id
      credit
      file(style: "large") {
        id
        alt
        relativeOriginPath
        focalPointX
        focalPointY
      }
    }
  }
`;
